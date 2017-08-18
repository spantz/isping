'use strict';

const request = require('request');
const tokenRepository = require('./../lib/TokenRepository');
const fs = require('fs');
const Urls = require('./../lib/Urls');

const args = require('minimist')(process.argv.slice(2));

const token = args.token;
if (typeof token === 'undefined' || token === '') {
    //TODO define outputter to output messages
    console.error('No user token defined. Please define your user token through the "--token" argument.');
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
        console.error('FAILURE');
        console.error(body);
        return;
    }

    const authToken = JSON.parse(body).token;

    console.log(JSON.parse(body).token);

    try {
        tokenRepository.saveToken(authToken);
    } catch (e) {
        console.error('Unable to save token to file: ' + e.message);
        console.error(e);
        return;
    }

    console.log('Success! Try the dry run script to ensure your token works.');
});