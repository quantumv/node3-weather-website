const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicXVhbnR1bTIwMTkiLCJhIjoiY2s4emRjdjRsMWhxYjNtbGR1MThyY256aSJ9.LegH48stCsv4Gy0qfhf1fQ&limit=1'
// Before // request({ url: url, json: true }, (err, response) => {
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
// Before  // } else if (response.body.features.length === 0) {
        } else if (body.features.length === 0) {
            callback('Unable to connect to find location, try another search.', undefined)
        } else {
            callback(undefined, {
// Before       //  location: response.body.features[0].place_name,
                location: body.features[0].place_name,
                //  latitude: response.body.features[0].center[1],
                latitude: body.features[0].center[1],
                // longitude: response.body.features[0].center[0] 
                longitude: body.features[0].center[0] 
            })
        }
    })
}

module.exports = geocode