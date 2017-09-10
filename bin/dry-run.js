'use strict';

const Urls = require('./../lib/Urls');
const request = require('request');
const tokenRepository = require('./../lib/TokenRepository');
const Messenger = require('./../lib/Messenger');

if (!tokenRepository.tokenSaved()) {
    Messenger.warning('No token saved locally! Did you register your device?');
    return;
}

const url = Urls.constructDryRunUrl(tokenRepository.getToken());
request(url, (error, response, body) => {
    if (response.statusCode !== 200) {
        Messenger.error('DRY RUN FAILED!');
        Messenger.error(error);
        Messenger.log(body);
        return;
    }

    Messenger.success(`Dry run successful! You're ready to start logging internet speeds.`);
});
