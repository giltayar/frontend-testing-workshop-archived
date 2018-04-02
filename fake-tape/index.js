const express = require('express')
const cors = require('cors')

const app = express()

let tape = []

app.use(cors())
app.get('/tape', (req, res) => res.json(tape))
app.put('/tape', express.json(), (req, res) => {
  tape = req.body

  res.send('')
})
