const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const weatherApiKey = process.env.WEATHER_API_KEY

    const weatherUrl =
        "https://api.weatherapi.com/v1/current.json?key=" +
        weatherApiKey +
        "&q=" +
        latitude +
        "," +
        longitude

    request({ url: weatherUrl, json: true }, (error, response) => {
        if (error) {
            callback("Network error: Unable to connect to Weather API.", undefined)
        } else if (response.body.error) {
            callback("Weather API error: " + response.body.error.message, undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temp_c
            })
        }
    })
}

module.exports = forecast