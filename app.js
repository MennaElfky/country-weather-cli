
require("dotenv").config()

const readline = require("readline")
const geocode = require("./data1/geocode")
const forecast = require("./data1/forecast")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter the name of a country: ", (countryName) => {
    if (!countryName.trim()) {
        console.log("Error: Country name cannot be empty.")
        rl.close()
        return
    }

    geocode(countryName, (geoError, geoData) => {
        if (geoError) {
            console.log("Error:", geoError)
            rl.close()
            return
        }

        forecast(geoData.latitude, geoData.longitude, (weatherError, weatherData) => {
            if (weatherError) {
                console.log("Error:", weatherError)
                rl.close()
                return
            }

            console.log("\nWeather Information")
            console.log("-------------------")
            console.log("Location:", geoData.location)
            console.log("Latitude:", geoData.latitude)
            console.log("Longitude:", geoData.longitude)
            console.log("Temperature:", weatherData.temperature + "°C")

            rl.close()
        })
    })
})