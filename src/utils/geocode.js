const request = require('postman-request')

function geocode(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5uYW9zdHJvdnNrYSIsImEiOiJja3FxaThrcXkwcXZyMnVwYjVwcm1pbWs3In0.QipNC6BIAhRR7nn8Hj_Xhg&limit=1`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback(`Couldn't connect to geolocation api: ${error}`, undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to fetch geo coordinates for location', undefined)
        } else {
            const {
                center: coords,
                place_name: location
            } = body.features[0];
            callback(undefined, {longitude: coords[0], latitude: coords[1], location});
        }
    })
}

module.exports = geocode