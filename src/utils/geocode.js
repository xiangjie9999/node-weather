const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieGlhbmdqaWU5OTk5IiwiYSI6ImNqdnVwa2Y1dTE0NTg0OWw5aHQ2MzQyMDgifQ.e-fGvsran28TjKHpw6np4A&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location service.', undefined)
        } else if (!body.features[0]){
            callback('No location found.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode