const request = require('request');

var geocodeAddress = (address, callback) => {

    const KEY = 'AIzaSyBsGVqUjGNOj_jNJCiEiVkQsj6VcUXgiXE';
    var encodedAddress = encodeURIComponent(address);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${KEY}`

    request({
        url: url,
        json: true,
    }, (error, response, body) => {
        //console.log(JSON.stringify(body, undefined, 2));
        if(error) {
            callback('Unable to connect to Google Servers');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if (body.status === 'OK') {
            callback(undefined, results = {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
}