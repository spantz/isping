const SpeedTestRunner = require('speedtest-net');
const tokenRepository = require('./TokenRepository');
const Urls = require('./Urls');
const Messenger = require('./Messenger');
const Request = require('./Request');

class SpeedTest {
    constructor(config) {
        this.results = {
            timestamp: {
                start: process.hrtime()
            }
        };

        this.runner = SpeedTestRunner(config).on('data', data => {
            this.results.speed = {
                up: data.speeds.upload,
                down: data.speeds.download,
            };
            this.results.ping = data.server.ping;
            this.results.timestamp.end = process.hrtime();
        });
    }

    postResults() {
        let request = new Request('/tests', 'POST', this.results, {'Authorization': tokenRepository.getToken()});
        return request.execute();
    }
}

module.exports = SpeedTest;