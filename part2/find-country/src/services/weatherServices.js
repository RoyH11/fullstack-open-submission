import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getCapitalWeather = (lat, lon) => {
    return axios
        .get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.data)
}

export default {
    getCapitalWeather,
}