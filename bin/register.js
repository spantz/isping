'use strict';

const request = require('request');
const tokenRepository = require('./../lib/TokenRepository');
const fs = require('fs');
const Urls = require('./../lib/Urls');
const Messenger = require('./../lib/Messenger');

const args = require('minimist')(process.argv.slice(2));

const token = args.token;
if (typeof token === 'undefined' || token === '') {
    const parameterMessage = Messenger.colorize(`"--token"`, Messenger.getColors().CYAN);
    Messenger.warning(`No user token defined. Please define your user token through the ${parameterMessage} argument.`);
    return;
}

request({
    uri: Urls.constructRegisterUrl(token),
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}, (error, response, body) => {
    if (response.statusCode !== 200) {
        Messenger.error('FAILURE');
        Messenger.error(body);
        return;
    }

    const authToken = JSON.parse(body).token;

    Messenger.log(JSON.parse(body).token);

    try {
        tokenRepository.saveToken(authToken);
    } catch (e) {
        Messenger.error('Unable to save token to file: ' + e.message);
        Messenger.error(e);
        return;
    }

    Messenger.success('Success! Try the dry run script to ensure your token works.');
});