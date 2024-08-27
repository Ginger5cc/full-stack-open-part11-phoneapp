require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./server/models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :response-time[4] :body'))
app.use(cors())


morgan.token('body', req => {
  return JSON.stringify(req.body)
})



app.get('/', (request, response) => {
  response.send('<h1>Fucking Hello World!</h1>')
})


app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    const content = `
    <p>Phonebook has ${count} info for people</p>
    <p>${new Date()}</p>`
    response.send(content)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(ppl => {
    response.json(ppl)
  })
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  console.log(person)

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})