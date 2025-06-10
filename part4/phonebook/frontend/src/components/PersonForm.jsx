const PersonForm = ({ handleAddPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    // console.log('Rendering PersonForm')
    return (
        <form onSubmit={handleAddPerson}>
            <div>
                name: <input 
                    value={newName} 
                    onChange={handleNameChange}
                />
            </div>
                <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
                </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm