'use strict';

const apiService = require('./../lib/APIService');
const Messenger = require('./../lib/Messenger');
const Response = require('./../lib/Response');

apiService.executeDryRun()
    .then(() => Messenger.success(`Dry run successful! You're ready to start logging internet speeds.`))
    .catch((response) => {
        Messenger.error('DRY RUN FAILED!');
        if (response instanceof Response) {
            Messenger.error(response.getError());
            Messenger.log(response.getBody());
        }
    });