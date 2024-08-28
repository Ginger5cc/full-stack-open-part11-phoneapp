import { useState, useEffect } from 'react'
import Persons from './components/showFiltered'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notifications'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('XXX-XXXXX')
  const [filter, setFilter] = useState('')
  const [updateMessage, setUpdateMessage] = useState(null)
  
  
  useEffect( () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

 


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification updateMessage={updateMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new number</h3>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setUpdateMessage={setUpdateMessage}
      />
      <h3>All Numbers</h3>
      <Persons input={filter} persons={persons} setPersons={setPersons} setUpdateMessage={setUpdateMessage}/>
    </div>
  )
}

export default App