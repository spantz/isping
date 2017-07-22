'use strict';

const request = require('request');
const fs = require('fs');
const baseDir = __dirname;

const args = require('minimist')(process.argv.slice(2));

const token = args.token;
if (typeof token === 'undefined' || token === '') {
    //TODO define outputter to output messages
    console.error('No user token defined. Please define your user token through the "--token" argument.');
    return;
}

const baseUrl = 'http://speed.app';

request({
    uri: `${baseUrl}/api/registerDevice/${token}`,
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
        fs.writeFileSync(`${baseDir}/.token`, JSON.stringify({token: authToken}));
    } catch (e) {
        console.error('Unable to save token to file: ' + e.message);
        console.error(e);
        return;
    }

    console.log('Success! Try the dry run script to ensure your token works.');
});