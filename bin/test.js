const Messenger = require('./../lib/Messenger');
const apiService = require('./../lib/APIService');
const Response = require('./../lib/Response');

return apiService.runTest()
    .then(() => Messenger.success('Test successful! Recorded to API.'))
    .catch(response => {
        if (response instanceof Response) {
            Messenger.error('API error wnile recording test.');
            Messenger.error(response.getBody());
        } else {
            Messenger.error('Unknown error recording test.');
            Messenger.error(response);
        }
    });