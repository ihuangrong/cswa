import json

from csv import DictReader, DictWriter
from io import StringIO
from os import path, remove
from shutil import rmtree
from subprocess import run, Popen
from zipfile import ZipFile

if path.exists('submission'):
    rmtree('submission')

with ZipFile('week01.zip', 'r') as archive:
    lines = []
    comment = True
    '''for line in .split('\n'):
        if comment:
            if ';' in line:
                comment = False
                if line.startswith('--'):
                    lines.append(line[2:])
                else:
                    lines.append(line)
        else:
            if line.startswith('--'):
                lines.append(line[2:])
            else:
                lines.append(line)
    reader = DictReader(StringIO('\n'.join(lines)), delimiter=';')'''
    body = archive.read('Liste.csv').decode('utf-8')
    head = body[:body.find('--ID;') + 2]
    body = body[body.find('--ID;') + 2:]
    reader = DictReader(StringIO(body), delimiter=';')
    body = StringIO()
    writer = DictWriter(body, reader.fieldnames, delimiter=';')
    writer.writeheader()
    entries = []
    for entry in reader:
        for filename in archive.namelist():
            if filename == 'Aufgabe_1/%s/repository.txt' % entry['ID']:
                url = archive.read(filename).decode('utf-8').strip()
                # Clone the submission
                run(['git', 'clone', url, 'submission'])
                if path.exists('submission'):
                    # Clear previous test results
                    if path.exists('../exercise/week01/test-result.json'):
                        remove('../exercise/week01/test-result.json')
                    # Install NPM dependencies
                    run(['npm', 'install'], cwd='submission/week01')
                    # Run the web server
                    server = Popen(['http-server', 'src'], cwd='submission/week01')
                    try:
                        # Run the integration tests
                        run(['cypress', 'run'], cwd='../exercise/week01/')
                    finally:
                        server.terminate()
                    # Pull the test results
                    with open('../exercise/week01/test-result.json') as results_f:
                        results = json.load(results_f)
                    # Calculate points. 2 - all correct, 1 - partial correct, 0 - nothing correct
                    points = 0
                    for task, tests in results.items():
                        all_passed = True
                        all_failed = True
                        for test, results in tests.items():
                            if results['state'] == 'failed':
                                all_passed = False
                            elif results['state'] == 'passed':
                                all_failed = False
                        if all_passed:
                            points = points + 2
                        elif not all_passed and not all_failed:
                            points = points + 1
                    entry['POINTS'] = points
                    entry['STATUS'] = 3
                    writer.writerow(entry)
                    rmtree('submission')

    # Copy source files into target zip, using updated Liste.csv
    with ZipFile('week01-result.zip', 'w') as target_archive:
        target_archive.writestr('Liste.csv', '%s%s' % (head, body.getvalue()))
        for filename in archive.namelist():
            if filename != 'Liste.csv':
                target_archive.writestr(filename, archive.read(filename))
