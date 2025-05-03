const Persons = ({ filteredPersons }) => {
    console.log('Rendering Persons component with filteredPersons:', filteredPersons)
    return (
        <div>
            {filteredPersons.map((person) => (
                <div key={person.id}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    )
}

export default Persons