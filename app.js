const SpeedTest = require('speedtest-net');

async function runSpeedTest(){
    let result = await new Promise(resolve => {
        SpeedTest({maxTime: 1000}).on('done', data => {
            console.log(data);
            resolve(data);
        });
    });
}

runSpeedTest();

