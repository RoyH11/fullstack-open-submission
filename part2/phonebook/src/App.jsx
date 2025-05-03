import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const filteredPersons = filter
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  const addPerson = (event) => {
    event.preventDefault()

    // Check if the name is empty or contains only spaces
    const trimmedName = newName.trim()
    if (trimmedName === '') {
      alert('Name cannot be empty')
      return
    }

    // Check if the name already exists in the phonebook
    const personExists = persons.some(person => person.name === trimmedName)
    if (personExists) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    // Check if the number is empty or contains only spaces
    const trimmedNumber = newNumber.trim()
    if (trimmedNumber === '') {
      alert('Number cannot be empty')
      return
    }

    // Check if the number contains only digits and dashes
    if (!/^[0-9-]+$/.test(trimmedNumber)) {
      alert('Number can only contain digits and dashes')
      return
    }

    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
      id: persons.length + 1 // Simple ID generation
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

    console.log(`Added ${trimmedName} with number ${trimmedNumber} to phonebook`)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App