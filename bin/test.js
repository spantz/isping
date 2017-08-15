const SpeedTest = require('./../lib/SpeedTest.js');
const tokenRepository = require('./../lib/TokenRepository');

if (!tokenRepository.tokenSaved()) {
    console.error('No token saved!');
    return;
}

console.log('running test, please wait...');
let test = new SpeedTest();

test.runner.on('done', function(){
    test.postResults();
});