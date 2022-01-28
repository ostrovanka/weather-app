const request = require('postman-request')

function weather(longitude, latitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=8237561fb9686952f495a43cd2426bb6&query=${longitude},${latitude}&units=m`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(`Couldn't connect to weather api: ${error}`)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current);
        }
    })
}

module.exports = weather