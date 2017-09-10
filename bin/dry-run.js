'use strict';

const Urls = require('./../lib/Urls');
const tokenRepository = require('./../lib/TokenRepository');
const Messenger = require('./../lib/Messenger');
const Request = require('./../lib/Request');

if (!tokenRepository.tokenSaved()) {
    Messenger.warning('No token saved locally! Did you register your device?');
    return;
}

function errorCallback(response) {
    Messenger.error('DRY RUN FAILED!');
    Messenger.error(response.getError());
    Messenger.log(response.getBody());
}

const url = Urls.constructDryRunPath(tokenRepository.getToken());
const request = new Request(url);
request.execute().then(response => {
    if (!response.isOK()) {
        errorCallback(response);
        return;
    }

    Messenger.success(`Dry run successful! You're ready to start logging internet speeds.`);
}).catch(errorCallback);
