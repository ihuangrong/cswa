var fs = require('fs')
var mocha = require('mocha')

module.exports = JSONReporter

function JSONReporter(runner, options) {
    mocha.reporters.Base.call(this, runner)
    let results = null;

    if(options && options.reporterOptions && options.reporterOptions.mochaFile) {
        if(fs.existsSync(options.reporterOptions.mochaFile)) {
            results = JSON.parse(fs.readFileSync(options.reporterOptions.mochaFile, 'utf8'));
        } else {
            results = {}
        }
    }

    runner.on('pass', function(test){
        if(!results[test.parent.title]) {
            results[test.parent.title] = {}
        }
        results[test.parent.title][test.title] = {
            'state': test.state
        }
    });

    runner.on('fail', function(test, err){
        if(!results[test.parent.title]) {
            results[test.parent.title] = {}
        }
        results[test.parent.title][test.title] = {
            'state': test.state,
            'error': err.message
        }
    });

    runner.on('end', function(){
        if(options && options.reporterOptions && options.reporterOptions.mochaFile) {
            fs.writeFileSync(options.reporterOptions.mochaFile, JSON.stringify(results))
        }
    });
}
