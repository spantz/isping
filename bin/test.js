const SpeedTest = require('./../lib/SpeedTest.js');
const tokenRepository = require('./../lib/TokenRepository');
const Messenger = require('./../lib/Messenger');

if (!tokenRepository.tokenSaved()) {
    Messenger.warning('No token saved!');
    return;
}

Messenger.log('running test, please wait...');
let test = new SpeedTest();

test.runner.on('done', function(){
    test.postResults().then(() => {
        Messenger.success('Successful test! Results posted to API.');
    }).catch(response => {
        Messenger.error('Error in posting results to API!');
        Messenger.error(response.getError());
    });
});