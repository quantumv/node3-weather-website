const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=26ff7bcaa41c940c16d8959e6a1acf69&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.err) {
            callback('Unable to connect to location, try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + '. There is a ' + body.current.precip + '% chance of rain. ' + ' Humidity meter read for the day is, ' + body.current.humidity + '. Expect ' + body.current.cloudcover + '% chance of overcast skys.')
        }
    })
}

module.exports = forecast