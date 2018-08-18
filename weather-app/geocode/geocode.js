const request = require('request');

var geocodeAddress = (address) => {

    const KEY = 'AIzaSyBsGVqUjGNOj_jNJCiEiVkQsj6VcUXgiXE';
    var encodedAddress = encodeURIComponent(address);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${KEY}`

    request({
        url: url,
        json: true,
    }, (error, response, body) => {
        //console.log(JSON.stringify(body, undefined, 2));
        if(error) {
            console.log('Unable to connect to Google Servers');
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Unable to find that address');
        } else if (body.status === 'OK') {
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        }
    });
};

module.exports = {
    geocodeAddress
}