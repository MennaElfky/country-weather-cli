const request = require("request")

const geocode = (countryName, callback) => {
    const mapboxToken = process.env.MAPBOX_TOKEN

   const geocodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(countryName) +
    ".json?access_token=" +
    mapboxToken +
    "&types=country"

    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback("Network error: Unable to connect to Geocoding API.", undefined)
        } else if (response.body.message) {
            callback("Geocoding API error: " + response.body.message, undefined)
        } else if (!response.body.features || response.body.features.length === 0) {
            callback("Country not found. Please enter a valid country name.", undefined)
        } else {
            const longitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const locationName = response.body.features[0].place_name

            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: locationName
            })
        }
    })
}

module.exports = geocode