const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please give password as an argument')
  process.exit(1)
}

const password = process.argv[2]

// optional arguments for name and number
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://royh11:${password}@cluster0.q2t72wy.mongodb.net/phonebookApp?
retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  // If only the password is provided, list all persons
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  // If name and number are provided, add a new person
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length > 5) {
  // If more than 3 arguments are provided, log an error message
  console.log('Too many arguments provided. Please provide only the password, name, and number.')
  mongoose.connection.close()
  process.exit(1)
}
