require('dotenv').config()
const express = require('express')
const Person = require('./models/person') // Import the Person model

const app = express()

let persons = []

// Middleware morgan for logging HTTP requests
const morgan = require('morgan')
const { default: mongoose } = require('mongoose')
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
}) 
const format = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(format))
app.use(express.static('dist'))
app.use(express.json())


// basic route to check if the server is running
app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
}) 

// Get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
}) 

// Get a person by ID
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

// Get info about the phonebook
app.get('/info', (request, response) => {
    const date = new Date()
    Person.countDocuments({}).then(count => {
        response.send(`
            <div>
                <p>Phonebook has info for ${count} people</p>
                <p>${date}</p>
            </div>
        `)
    })
})

// Delete a person
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    if (!mongoose.isValidObjectId(id)) {
        return response.status(400).send({ error: 'invalid id for MongoDB' })
    }
    Person.findByIdAndDelete(id).then(result => {
        if (result) {
            response.status(204).end()
        } else {
            response.status(404).send({ error: 'person not found' })
        }
    }).catch(error => {
        console.error(error)
        response.status(500).send({ error: 'internal server error' })
    })
}) 


// Add a new person
app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    // Check if the name already exists
    Person.findOne({ name: body.name }).then(existingPerson => {
        if (existingPerson) {
            return response.status(400).json({ error: 'person alrady exists in phonebook' })
        }

        const person = new Person({
            name: body.name,
            number: body.number,
        })

        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    })
}) 

// unknown endpoint handler
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})