'use strict';

const tokenRepository = require('./../lib/TokenRepository');
const fs = require('fs');
const Urls = require('./../lib/Urls');
const Messenger = require('./../lib/Messenger');
const Request = require('./../lib/Request');

const args = require('minimist')(process.argv.slice(2));

const token = args.token;
if (typeof token === 'undefined' || token === '') {
    const parameterMessage = Messenger.colorize(`"--token"`, Messenger.getColors().CYAN);
    Messenger.warning(`No user token defined. Please define your user token through the ${parameterMessage} argument.`);
    return;
}

let request = new Request(Urls.constructRegisterPath(token), 'POST');

if (args.hasOwnProperty('name')) {
    request.setParams({
        name: args.name
    });
}

request.execute().then(response => {
    const authToken = response.getBody().token;

    try {
        tokenRepository.saveToken(authToken);
    } catch (e) {
        Messenger.error('Unable to save token to file: ' + e.message);
        Messenger.error(e);
        return;
    }

    Messenger.success('Success! Try the dry run script to ensure your token works.');
    Messenger.success(`The command will be "${Messenger.colorize('npm run dry-run', Messenger.getColors().CYAN)}"`);
}).catch(response => {
    Messenger.error('FAILURE');
    Messenger.error(response.getBody());
});