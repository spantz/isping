'use strict';

const tokenRepository = require('./../lib/TokenRepository');
const Urls = require('./../lib/Urls');
const Messenger = require('./../lib/Messenger');
const Request = require('./../lib/Request');

const args = require('minimist')(process.argv.slice(2));

const token = args.token;
if (typeof token === 'undefined' || token === '') {
    const parameterMessage = Messenger.colorize(`"--token"`, Messenger.getColors().CYAN);
    Messenger.warning(`No device token defined. Please define your device token through the ${parameterMessage} argument.`);
    return;
}

try {
    tokenRepository.saveToken(token);
    Messenger.success('Successfully saved your new token. Try running a dry run to test your token.');
} catch (e) {
    Messenger.error('ERROR SAVING THE TOKEN');
    Messenger.error(e);
}