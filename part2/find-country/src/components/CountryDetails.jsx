const CountryDetails = ({ countryDetails }) => {
    if (!countryDetails) {
        return null
    }

    const name = countryDetails.name.common
    const capital = countryDetails.capital[0]
    const area = countryDetails.area
    const languages = countryDetails.languages
    const flag = countryDetails.flags.svg

    const languagesList = Object.values(languages).map((language, index) => (
        <li key={index}>{language}</li>
    ))

    return (
        <div>
            <h2>{name}</h2>
            <div>Capital: {capital}</div>
            <div>Area: {area} km<sup>2</sup></div>
            <h3>Languages:</h3>
            <ul>{languagesList}</ul>
            <img src={flag} alt={`Flag of ${name}`} width="200" />
        </div>
    )
}

export default CountryDetails