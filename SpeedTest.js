const SpeedTestRunner = require('speedtest-net');
const request = require('request');
class SpeedTest {
  constructor(config) {
    this.results = {
      timestamp: {
        start: process.hrtime()
      }
    }
    this.runner = SpeedTestRunner(config).on('done', data => {
      this.results.speed = {
        up: data.uploadSpeed,
        down: data.downloadSpeed
      };
      this.results.ping = data.bestPing
      this.results.timestamp.end = process.hrtime();
    });
  }

  postResults() {
    request({
      url: "http://192.168.1.103:8000/api/tests",
      method: "POST",
      json: true,
      body: this.results
    }, (err, res, body) => {
      console.log(err, res, body)
    } )
  }
}

module.exports = SpeedTest
