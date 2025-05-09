import { useState, useEffect } from 'react'

import FindCountry from './components/FindCountry'
import CountriesList from './components/CountriesList'
import CountryDetails from './components/CountryDetails'
import CapitalWeather from './components/CapitalWeather'

import countryServices from './services/countryServices'
import weatherServices from './services/weatherServices'

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [allCountryNames, setAllCountryNames] = useState([])
  const [countries, setCountries] = useState([])
  const [singleCountryDetails, setSingleCountryDetails] = useState(null)
  const [singleCountryWeather, setSingleCountryWeather] = useState(null)

  // Iitial effect to fetch all country names
  useEffect(() => {
    countryServices
      .getAllCountries()
      .then(allCountriesData => {
        const countryNames = allCountriesData.map(countryData => countryData.name.common)
        setAllCountryNames(countryNames)
        console.log('Initial all country names fetched:', countryNames)
      })
  }, [])



  // Effect for input changes
  useEffect(() => {
    // wait for allCountryNames 
    if (allCountryNames.length === 0) {
      console.log('No country names available yet.')
      return
    }

    console.log('effect run, newCountry:', newCountry)

    // Nothing to filter
    if (newCountry.trim() === '') {
      setCountries([])
      setSingleCountryDetails(null)
      return
    } 
    
    // Filter 
    const filteredCountries = allCountryNames.filter(countryName => 
      countryName.toLowerCase().includes(newCountry.trim().toLowerCase())
    )
    console.log('Filtered countries:', filteredCountries)

    if (filteredCountries.length === 1) { 
      // Found 1 country
      const countryName = filteredCountries[0]
      console.log('Single country found:', countryName)
      
      fetchCountryDetails(countryName)
      setCountries([countryName])
    } else {
      // More than one country found
      setSingleCountryDetails(null)
      setCountries(filteredCountries)
    }
    
  },[allCountryNames, newCountry])

  // Effect for fetching weather data
  useEffect(() => {
    if (!singleCountryDetails) {
      console.log('No single country details available yet.')
      setSingleCountryWeather(null)
      return
    }

    const [latitude, longitude] = singleCountryDetails?.capitalInfo?.latlng || []

    if (!latitude || !longitude) {
      console.log('No latitude or longitude available for weather data.')
      setSingleCountryWeather(null)
      return
    }
    console.log('Fetching weather data for:', singleCountryDetails.name.common)

    weatherServices
      .getCapitalWeather(latitude, longitude)
      .then(weatherData => {
        setSingleCountryWeather(weatherData)
        console.log('Weather data fetched:', weatherData)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
  }, [singleCountryDetails])


  const fetchCountryDetails = (countryName) => {
    // Fetch single country details
    countryServices
      .getCountryDetails(countryName)
      .then(countryData => {
        setSingleCountryDetails(countryData)
        console.log('Single country details fetched:', countryData)
      })
      .catch(error => {
        console.error('Error fetching single country details:', error)
      })
  }

  // Handle input change
  const handleNewCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  const handleShowCountry = (countryName) => {
    // Do Not update the input field
    fetchCountryDetails(countryName)
    console.log('Show country button clicked:', countryName)
  }

  return (
    <div>
      <FindCountry newCountry={newCountry} handleNewCountryChange={handleNewCountryChange} />
      <CountriesList countryNames={countries} handleShowCountry={handleShowCountry} />
      <CountryDetails countryDetails={singleCountryDetails} />
      <CapitalWeather countryDetails={singleCountryDetails} weatherData={singleCountryWeather} />
    </div>
  )
}

export default App
