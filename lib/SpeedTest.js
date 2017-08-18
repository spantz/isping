const SpeedTestRunner = require('speedtest-net');
const tokenRepository = require('./TokenRepository');
const request = require('request');
const Urls = require('./Urls');

class SpeedTest {
  constructor(config) {
    this.results = {
      timestamp: {
        start: process.hrtime()
      }
    }
    this.runner = SpeedTestRunner(config).on('data', data => {
      this.results.speed = {
        up: data.speeds.upload,
        down: data.speeds.download,
      };
      this.results.ping = data.bestPing
      this.results.timestamp.end = process.hrtime();
    });
  }

  postResults() {
    this.results.auth_token = tokenRepository.getToken();
    request({
      url: Urls.constructTestUrl(),
      //url: "http://192.168.0.112:8000/api/tests",
      method: "POST",
      json: true,
      body: this.results
    }, (err, res, body) => {
      console.log(err, res, body)
    } )
  }
}

module.exports = SpeedTest
