const request = require('request');

var getWeather = (latitude, longitude, callback) => {
    const DARKSKY_KEY = '9d03d6ea5a01200453fe44a889e8228a';
    var url = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${latitude},${longitude}`;
    request({
        url: url,
        json: true,
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            //console.log(JSON.stringify(body.currently.temperature, undefined, 2));
            callback(undefined, {
                temperature: body.currently.temperature, 
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            //console.log(response.body.error);
            callback(response.body.error);
        }
    });
}

module.exports = {
    getWeather
};