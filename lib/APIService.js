'use strict';

const Messenger = require('./Messenger');
const tokenRepository = require('./TokenRepository');
const SpeedTest = require('./SpeedTest');
const Urls = require('./Urls');
const Request = require('./Request');

class APIService {
    executeDryRun() {
        if (!tokenRepository.tokenSaved()) {
            Messenger.warning('No token saved locally! Did you register your device?');
            return Promise.reject();
        }

        const request = new Request(Urls.getDryRunPath(), 'GET', null, {'Authorization' : tokenRepository.getToken()});
        //TODO handle result here? or let it be handled by child object?
        //I'd say let child handle it
        return request.execute()
            .then(response => {
                if (response.isOK()) {
                    return response;
                } else {
                    return Promise.reject(response);
                }
            });
    }

    registerNewDevice(token, name) {
        if (typeof token !== 'string' || token === '') {
            Messenger.error('token passed into registerNewDevice not set properly.');
            return Promise.reject();
        }

        let request = new Request(Urls.getRegisterPath(), 'POST', null, {'Authorization' : token});

        if (typeof name === 'string' && name !== '') {
            request.setParams({
                name: name
            });
        }

        return request.execute().then(response => {
            if (!response.isOK()) {
                return Promise.reject(response);
            }

            const authToken = response.getBody().token;

            try {
                tokenRepository.saveToken(authToken);
            } catch (e) {
                Messenger.error('Unexpected error when trying to save token');
                Messenger.error(e);
                return Promise.reject(e);
            }

            return Promise.resolve(response);
        });
    }

    runTest() {
        return new Promise((resolve, reject) => {
            let test = new SpeedTest();

            test.runner.on('done', function(){
                test.postResults().then(response => {
                    return response.isOK() ? resolve(response) : reject(response);
                });
            });
        });
    }
}

module.exports = new APIService();