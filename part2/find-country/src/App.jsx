import { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountry from './components/FindCountry'
import CountriesList from './components/CountriesList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [newCountry, setNewCountry] = useState('')
  const [allCountryNames, setAllCountryNames] = useState([])
  const [countries, setCountries] = useState([])
  const [singleCountryDetails, setSingleCountryDetails] = useState(null)

  // Iitial effect to fetch all country names
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countryNames = response.data.map(country => country.name.common)
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


  const fetchCountryDetails = (countryName) => {
    // Fetch single country details
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
      .then(response => {
        setSingleCountryDetails(response.data)
        console.log('Single country details fetched:', response.data)
      })
      .catch(error => {
        console.error('Error fetching single country details:', error)
      })
  }

  // Handle input change
  const handleNewCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <FindCountry newCountry={newCountry} handleNewCountryChange={handleNewCountryChange} />
      <CountriesList countryNames={countries} handleShowCountry={handleShowCountry} />
      <CountryDetails countryDetails={singleCountryDetails} />
    </div>
  )
}

export default App
