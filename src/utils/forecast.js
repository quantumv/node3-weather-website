const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=26ff7bcaa41c940c16d8959e6a1acf69&query=' + latitude + ',' + longitude + '&units=f'
// Before // request({ url: url, json: true }, (err, response) => {
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined)
// Before // } else if (response.body.err) {
        } else if (body.err) {
            callback('Unable to connect to location, try another search.', undefined)
        } else {
            //  callback(undefined, response.body.current.weather_descriptions[0] + '. It is currenlty ' + response.body.current.temperature + ' degress out. It feels like ' + response.body.current.feelslike + '. There is a ' + response.body.current.precip + '% chance of rain.')
            callback(undefined, body.current.weather_descriptions[0] + '. It is currenlty ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + '. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast