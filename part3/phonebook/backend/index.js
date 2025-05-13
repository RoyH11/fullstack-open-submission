// Import express and create an Express application
const express = require('express')
const app = express()
app.use(express.json())

// Middleware morgan for logging HTTP requests
const morgan = require('morgan')
// Custom token for morgan to log the body of POST requests
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
}) 
const format = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(format))

// import cors for Cross-Origin Resource Sharing
const cors = require('cors')
app.use(cors())

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

// basic route to check if the server is running
app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
}) 

// Get all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
}) 

// Get a person by ID
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id) 

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// Get info about the phonebook
app.get('/info', (request, response) => {
    const date = new Date()
    const info = `<p>Phonebook has info for ${persons.length} people</p>`
    const dateInfo = `<p>${date}</p>`
    response.send(info + dateInfo)
})

// Delete a person
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
}) 

// ID generation function
const generateId = () => {
    return Math.floor(Math.random() * 10000).toString()
}
// Add a new person
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    if (persons.some(p => p.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
}) 

// unknown endpoint handler
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001 // Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})