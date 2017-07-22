const SpeedTest = require('./../lib/SpeedTest.js');

let test = new SpeedTest();

test.runner.on('done', function(){
    test.postResults();
});