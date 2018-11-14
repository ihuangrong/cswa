import json
import os

from csv import DictReader, DictWriter
from io import StringIO
from shutil import rmtree
from subprocess import run, Popen
from zipfile import ZipFile

with ZipFile('week01.zip') as in_zip:
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
    with ZipFile('week01_marked.zip', 'w') as out_zip:
        results.writeheader()
        for line in body:
            line['STATUS'] = 3
            line['POINTS'] = 0
            if 'Aufgabe_1/%s/repository.txt' % line['--ID'] in in_zip.namelist():
                clone_url = in_zip.read('Aufgabe_1/%s/repository.txt' % line['--ID']).decode('utf-8').strip()
                completed = run(['git', 'clone', clone_url, 'submission'])
                if completed.returncode == 0:
                    run(['npm', 'install'], cwd='submission/week01')
                    server = Popen(['http-server', '-c-1', 'src'], cwd='submission/week01')
                    run(['cypress', 'run'], cwd='../week01')
                    server.terminate()
                    rmtree('submission')
                    if os.path.exists('../week01/test-result.json'):
                        with open('../week01/test-result.json') as test_results_f:
                            test_results = json.load(test_results_f)
                            points = 0
                            for task, tests in test_results.items():
                                all_passed = True
                                all_failed = True
                                for test in tests.values():
                                    if test['state'] == 'passed':
                                        all_failed = False
                                    else:
                                        all_passed = False
                                if all_passed and not all_failed:
                                    points = points + 2
                                elif not all_passed and not all_failed:
                                    points = points + 1
                            line['POINTS'] = points
                            line['STATUS'] = 3
                            os.remove('../week01/test-result.json')
            results.writerow(line)
        for filename in in_zip.namelist():
            if filename != 'Liste.csv':
                out_zip.writestr(filename, in_zip.read(filename))
        output.write(results_output.getvalue())
        out_zip.writestr('Liste.csv', output.getvalue())
