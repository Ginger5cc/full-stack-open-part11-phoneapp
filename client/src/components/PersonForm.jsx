import axios from 'axios'
import personService from '../services/persons'

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setUpdateMessage}) => {
    const addName = (event) => {
        event.preventDefault()
        const arr = persons.find(person => JSON.stringify(newName.toLowerCase()) === JSON.stringify(person.name.toLowerCase()))

        if (typeof arr !== 'undefined')
          { if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            const changedPerson = {...arr, number: newNumber}
            personService
              .update(changedPerson.id, changedPerson)
              .then(response => {setPersons(persons.map(n => n.id !== changedPerson.id ? n : response.data))
              }) 
              .catch(error => {
                // this is the way to access the error message
                console.log(error.response.data.error)
                setUpdateMessage({
                  "text" : `SHOW ERROR ${error.response.data.error}`,
                  "type" : "error"
                })    
              })
              
            setUpdateMessage({
              "text" : `Updated ${changedPerson.name} Phone Number to ${changedPerson.number}`,
              "type" : "update"
            })
            setTimeout(() => {setUpdateMessage(null)}, 5000)
          } else {console.log('do not want to change number')}
          } else {
            const nameObject = {
              name: newName,
              number: newNumber
            }
            personService
              .create(nameObject)
              .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                // this is the way to access the error message
                console.log(error.response.data.error)
                setUpdateMessage({
                  "text" : `SHOW ERROR ${error.response.data.error}`,
                  "type" : "error"
                })    
              })
            setUpdateMessage({
              "text" : `Added ${newName}`,
              "type" : "update"
            })

            setTimeout(() => {setUpdateMessage(null)}, 5000)
          }        
      }

    

    return (
        <form>
        <div>
          name: 
          <input
            value={newName}
            onChange={(event) => {setNewName(event.target.value)}}
          />
        </div>
        <div>
          number: 
          <input
            value={newNumber}
            onChange={(event) => {setNewNumber(event.target.value)}}
          />
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm