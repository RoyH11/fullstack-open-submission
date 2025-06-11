// index.js
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
