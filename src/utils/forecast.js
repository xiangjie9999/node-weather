const request = require('request')



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2030e31b5f015e01f7ec0a7be6da1b1b/'+ latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            var time = new Date(body.currently.time * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

            callback(undefined, body.daily.data[0].summary + ' It is currently ' 
            + body.currently.temperature + ' degrees Celcius out. There is ' 
            + body.currently.precipProbability + '% chance of rain.'
            + 'Current time is ' + time)
        }
    })
}

module.exports = forecast