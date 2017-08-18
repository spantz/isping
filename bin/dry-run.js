'use strict';

const Urls = require('./../lib/Urls');
const request = require('request');
const tokenRepository = require('./../lib/TokenRepository');

if (!tokenRepository.tokenSaved()) {
    console.error('No token saved locally! Did you register your device?');
    return;
}

const url = Urls.constructDryRunUrl(tokenRepository.getToken());
request(url, (error, response, body) => {
    if (response.statusCode !== 200) {
        console.error('DRY RUN FAILED!');
        console.error(error);
        console.log(body);
        return;
    }

    console.log(`Dry run successful! You're ready to start logging internet speeds.`);
});
