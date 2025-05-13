const Persons = ({ filteredPersons, handleDeletePerson }) => {
    // console.log('Rendering Persons component with filteredPersons:', filteredPersons)
    return (
        <div>
            {filteredPersons.map((person) => (
                <div key={person.id}>
                    {person.name}{' '}
                    {person.number}{' '}
                    <button onClick={() => handleDeletePerson(person.id)}>
                        delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Persons