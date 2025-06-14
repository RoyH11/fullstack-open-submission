const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to ', url)
mongoose
  .connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function(v) {
        // regex: 2 or 3 digits, dash, at least 1 digit
        return /^(\d{2,3}-\d+)$/.test(v)
      },
      message: props =>
        `${props.value} is not a valid phone number! It should be in the format 'XX-XXXXX' or 'XXX-XXXX'`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)