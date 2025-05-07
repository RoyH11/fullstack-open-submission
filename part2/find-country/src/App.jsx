import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'
import CountryList from './components/CountryList'

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [allCountryNames, setAllCountryNames] = useState([])
  const [countries, setCountries] = useState([])

  // fetch all countries on initial render, only the country names
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common)
        setAllCountryNames(countryNames)
        console.log('Initial all country names fetched:', countryNames)
      })
  }, [])

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
      return
    } 
    
    // Filter 
    const filteredCountries = allCountryNames.filter(countryName => 
      countryName.toLowerCase().includes(newCountry.trim().toLowerCase())
    )
    console.log('Filtered countries:', filteredCountries)

    setCountries(filteredCountries)
    
  },[allCountryNames, newCountry])

  const handleNewCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <FindCountry newCountry={newCountry} handleNewCountryChange={handleNewCountryChange} />
      <CountryList countryNames={countries} />
    </div>
  )
}

export default App
