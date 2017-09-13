'use strict';

const apiService = require('./../lib/APIService');
const Messenger = require('./../lib/Messenger');
const Response = require('./../lib/Response');

const args = require('minimist')(process.argv.slice(2));

const token = args.token;
if (typeof token === 'undefined' || token === '') {
    const parameterMessage = Messenger.colorize(`"--token"`, Messenger.getColors().CYAN);
    Messenger.warning(`No user token defined. Please define your user token through the ${parameterMessage} argument.`);
    return;
}

apiService.registerNewDevice(token, args.name)
    .then(() => {
        Messenger.success('Success! Try the dry run script to ensure your token works.');
        Messenger.success(`The command will be "${Messenger.colorize('npm run dry-run', Messenger.getColors().CYAN)}"`);
    }).catch(response => {
        if (response instanceof Response) {
            Messenger.error('API error prevented registration from occurring.');
            Messenger.error(response.getBody());
        } else {
            Messenger.error('Unknown error occurred with registration.');
            Messenger.error(response);
        }
    });