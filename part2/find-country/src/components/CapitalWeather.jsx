const CapitalWeather = ({ countryDetails, weatherData }) => {
    if (!countryDetails || !weatherData) {
        return null
    }

    const capital = countryDetails.capital[0]
    const temperature = weatherData.main.temp - 273.15 // Convert from Kelvin to Celsius
    const windSpeed = weatherData.wind.speed // Wind speed in m/s
    const weatherIcon = 'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png' // Weather icon URL
    console.log('Weather icon URL:', weatherIcon)

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>Temperature {temperature?.toFixed(2)} &deg;C</div>
            <img src={weatherIcon} alt="Weather icon" />
            <div>Wind {windSpeed} m/s</div>
        </div>
    )
}

export default CapitalWeather