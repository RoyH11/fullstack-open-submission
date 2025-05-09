const CountriesList = ({ countryNames, handleShowCountry }) => {

    if (countryNames.length === 0 || countryNames.length === 1) {
        return null
    }

    if (countryNames.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    return (
        <div>
            {countryNames.map((countryName, index) => (
                <div key={index}>
                    {countryName} <button onClick={() => handleShowCountry(countryName)}>Show</button>
                </div>
            ))}
        </div>
    )
}

export default CountriesList