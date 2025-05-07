const FindCountry = ({ newCountry, handleNewCountryChange }) => {
    return (
        <div>
            find countries <input 
            type="text"
            value={newCountry}
            onChange={handleNewCountryChange}
            // placeholder="Find a country"
        />
        </div>
        
    )
}

export default FindCountry