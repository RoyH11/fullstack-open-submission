const CountryList = ({ countryNames }) => {

    if (countryNames.length === 0 || countryNames.length === 1) {
        return null
    }

    if (countryNames.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    return (
        <div>
            {countryNames.map((countryName, index) => (
                <div key={index}>{countryName}</div>
            ))}
        </div>
    )
}

export default CountryList