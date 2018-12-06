import json
import os
import requests

from csv import DictReader, DictWriter
from io import StringIO
from shutil import rmtree, move
from subprocess import run, Popen
from time import sleep
from zipfile import ZipFile

def get_rooms():
    response = requests.get('http://localhost:6543/marking/rooms')
    return response.json()


def clear_rooms():
    rooms = get_rooms()
    for room in rooms['data']:
        requests.request('DELETE', 'http://localhost:6543/marking/rooms/%s' % room['id'])


def create_update_room():
    room = {'data': {'type': 'rooms',
                     'attributes': {'name': 'Test Room',
                                    'address': 'Somewhere',
                                    'capacity': 50,
                                    'features': 'projector,blackboard'}}}
    requests.post('http://localhost:6543/marking/rooms', json=room)

def create_delete_room():
    room = {'data': {'type': 'rooms',
                     'attributes': {'name': 'Pointless Room',
                                    'address': 'Nowhere',
                                    'capacity': 0,
                                    'features': ''}}}
    requests.post('http://localhost:6543/marking/rooms', json=room)

with ZipFile('week04.zip') as in_zip:
    with in_zip.open('Liste.csv') as in_f:
        header = []
        body = []
        in_body = False
        for line in in_f.readlines():
            line = line.decode('utf-8')
            if line.startswith('--ID'):
                in_body = True
            if in_body:
                body.append(line)
            else:
                header.append(line)
        output = StringIO()
        output.write(''.join(header))
        body = DictReader(StringIO(''.join(body)), delimiter=';')
    results_output = StringIO()
    results = DictWriter(results_output, fieldnames=body.fieldnames, delimiter=';')
    marked_list = []
    if os.path.exists('submission'):
        rmtree('submission')
    with ZipFile('week04_marked.zip', 'w') as out_zip:
        results.writeheader()
        skip = 0
        for line in body:
            if skip > 0:
                skip = skip -1
                continue
            line['STATUS'] = 3
            line['POINTS'] = 0
            if 'Aufgabe_1/%s/repository.txt' % line['--ID'] in in_zip.namelist():
                clone_url = in_zip.read('Aufgabe_1/%s/repository.txt' % line['--ID']).decode('utf-8').strip()
                completed = run(['git', 'clone', clone_url, 'submission/%s' % line['--ID']])
                if True or completed.returncode == 0:
                    run(['npm', 'install'], cwd='submission/%s/week04' % line['--ID'])
                    # Overwrite the config
                    with open('submission/%s/week04/app/adapters/application.js' % line['--ID'], 'w') as out_f:
                        out_f.write('''import DS from 'ember-data';

                        export default DS.JSONAPIAdapter.extend({
                            host: 'http://localhost:6543',
                            namespace: 'marking'
                        });''')
                    # Setup the logging
                    with open('submission/%s/week04/cypress.json' % line['--ID'], 'w') as out_f:
                        out_f.write('''{
                            "video": false,
                            "screenshot": false,
                            "reporter": "../../json-reporter.js",
                            "reporterOptions": {
                                "mochaFile": "test-result.json"
                            }
                        }''')
                    # Check Cypress installed
                    try:
                        run(['cypress'], cwd='submission/%s/week04' % line['--ID'])
                    except:
                        run(['npm', 'install', 'cypress'], cwd='submission/%s/week04' % line['--ID'])
                    run(['npm', 'install', '--save-dev', 'foundation-sites@6.4.3'], cwd='submission/%s/week04' % line['--ID']) # Force this as sometimes it fails mysteriously
                    try:
                        server = Popen(['ember', 'serve'], cwd='submission/%s/week04' % line['--ID'])
                        sleep(10)
                        points = 0
                        # Task 1
                        clear_rooms()
                        run(['cypress', 'run', '-s', 'cypress/integration/task01.spec.js'], cwd='submission/%s/week04' % line['--ID'])
                        rooms = get_rooms()
                        if len(rooms['data']) == 1:
                            points = points + 1
                        # Task 2
                        clear_rooms()
                        run(['cypress', 'run', '-s', 'cypress/integration/task02.spec.js'], cwd='submission/%s/week04' % line['--ID'])
                        rooms = get_rooms()
                        if len(rooms['data']) > 0:
                            points = points + 1
                        # Task 3
                        clear_rooms()
                        run(['cypress', 'run', '-s', 'cypress/integration/task03.spec.js'], cwd='submission/%s/week04' % line['--ID'])
                        rooms = get_rooms()
                        if len(rooms['data']) > 0:
                            points = points + 1
                        # Task 4
                        clear_rooms()
                        create_update_room()
                        run(['cypress', 'run', '-s', 'cypress/integration/task04.spec.js'], cwd='submission/%s/week04' % line['--ID'])
                        rooms = get_rooms()
                        if len(rooms['data']) == 1 and (rooms['data'][0]['attributes']['name'] != 'Test Room' or rooms['data'][0]['attributes']['address'] != 'Somewhere' or rooms['data'][0]['attributes']['capacity'] != 50 or rooms['data'][0]['attributes']['features'] != 'projector,blackboard'):
                            points = points + 1
                        # Task 5
                        clear_rooms()
                        create_delete_room()
                        run(['cypress', 'run', '-s', 'cypress/integration/task05.spec.js'], cwd='submission/%s/week04' % line['--ID'])
                        rooms = get_rooms()
                        if len(rooms['data']) == 0:
                            points = points + 1
                        line['STATUS'] = 3
                        line['POINTS'] = points
                    finally:
                        server.terminate()
            results.writerow(line)
            #break
        for filename in in_zip.namelist():
            if filename != 'Liste.csv':
                out_zip.writestr(filename, in_zip.read(filename))
        output.write(results_output.getvalue())
        out_zip.writestr('Liste.csv', output.getvalue())
