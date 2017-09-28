'use strict';

const tokenRepository = require('./../lib/TokenRepository');
const Urls = require('./../lib/Urls');
const Messenger = require('./../lib/Messenger');
const Request = require('./../lib/Request');
const Response = require('./../lib/Response');
const apiService = require('./../lib/APIService');

const args = require('minimist')(process.argv.slice(2));

const token = args.token;
if (typeof token === 'undefined' || token === '') {
    const parameterMessage = Messenger.colorize(`"--token"`, Messenger.getColors().CYAN);
    Messenger.warning(`No device token defined. Please define your device token through the ${parameterMessage} argument.`);
    return;
}

try {
    Messenger.log('Testing new token with dry run...');
    return apiService.executeDryRun(token)
        .then(() => {
            tokenRepository.saveToken(token);
            Messenger.success(`Your new token is successfully saved! You're ready to do some testing.`);
        }).catch(e => {
            Messenger.error('Error migrating over to the new token.');
            if (e instanceof Response) {
                Messenger.error(e.getBody());
            } else {
                Messenger.error(e);
            }
            Messenger.error('Please check your token and try again.');
        });
} catch (e) {
    Messenger.error('ERROR SAVING THE TOKEN');
    Messenger.error(e);
}