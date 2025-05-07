import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebookService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: 'good' })

  // Fetch initial data
  useEffect(() => {
    console.log('effect')
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const filteredPersons = filter
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons
  

  // Add a new person 
  const handleAddPerson = (event) => {
    event.preventDefault()

    // Check if the name is empty or contains only spaces
    const trimmedName = newName.trim()
    if (trimmedName === '') {
      alert('Name cannot be empty')
      return
    }

    // Check if the number is empty or contains only spaces
    const trimmedNumber = newNumber.trim()
    if (trimmedNumber === '') {
      alert('Number cannot be empty')
      return
    }

    const personObject = {
      name: trimmedName,
      number: trimmedNumber,
      id: String(persons.length + 1) // Simple ID generation
    }

    // Check if the name already exists in the phonebook
    const existingPerson = persons.find(person => person.name === trimmedName)

    // If the person already exists
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${trimmedName} is already added to phonebook, replace the old number with a new one?`
      )

      if (!confirmUpdate) return; 

      const updatedPerson = { ...existingPerson, number: trimmedNumber }
      
      phonebookService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          console.log('Person updated:', returnedPerson) // Log the returned person

          setPersons(persons.map(person => 
            person.id === existingPerson.id ? returnedPerson : person
          ))
          setNotification({ message: `Updated ${returnedPerson.name}'s number`, type: 'good' })
          setTimeout(() => {
            setNotification({ message: null, type: 'good' })
          }, 5000)

          setNewName('')
          setNewNumber('')
        })

    } else { // If the person does not exist, create a new entry
      phonebookService
      .create(personObject)
      .then(returnedPerson => {
        console.log('Person added:', returnedPerson) // Log the returned person

        setPersons(persons.concat(returnedPerson))
        setNotification({ message: `Added ${returnedPerson.name}`, type: 'good' })
        setTimeout(() => {
          setNotification({ message: null, type: 'good' })
        }, 5000)

        setNewName('')
        setNewNumber('')
      })
    }

  }

  // Delete button
  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(() => {
          console.log(
            `Information of '${personToDelete.name}' has already been removed from the server`
          )

          setPersons(persons.filter(person => person.id !== id))
          setNotification({
            message: `Information of '${personToDelete.name}' has already been removed from the server`, 
            type: 'error'
          })
          setTimeout(() => {
            setNotification({ message: null, type: 'good' })
          }, 5000)
        })
    }
  }

  // Handle input changes
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
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App