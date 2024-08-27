const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length===4) {
  console.log('give number as argument')
  process.exit(1)
}

const password = process.argv[2]
const inputName = process.argv[3]
const inputNumber = process.argv[4]


const url =
  `mongodb+srv://ginger5cc:${password}@cluster0.hg5k8yq.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length ===5){
  const person = new Person({
    name: inputName,
    number: inputNumber,
  })
  person.save().then(result => {
    console.log('added', inputName, inputNumber, 'to phonebook')
    console.log(result)
    mongoose.connection.close()
  })
}

if (process.argv.length===3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}


