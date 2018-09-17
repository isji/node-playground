const yargs = require('yargs');
const axios = require('axios');

const argv =  yargs
    .options({
        a: {
            demand: true, 
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true   
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
const KEY = 'AIzaSyBsGVqUjGNOj_jNJCiEiVkQsj6VcUXgiXE';
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${KEY}`

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    console.log('Location: ' + response.data.results[0].formatted_address);

    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
 
    const DARKSKY_KEY = '9d03d6ea5a01200453fe44a889e8228a';
    var weatherUrl = `https://api.darksky.net/forecast/${DARKSKY_KEY}/${latitude},${longitude}`;


    return axios.get(weatherUrl);
}).then((response) => {
    console.log(response.data.currently);
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. If feels like ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});



