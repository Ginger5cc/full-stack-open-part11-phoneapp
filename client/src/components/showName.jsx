import personService from '../services/persons'

const ShowName = ({person, persons, setPersons, setUpdateMessage, setErrorMessage}) => {
  const delPersonOf = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const arr = persons.filter(n => n.id != id)
      personService
        .delP(id)
        .then(
          setPersons(arr)
          
        )
        .catch(error => {
          setUpdateMessage({
            "text" : `Information of ${name} has already been removed from server`,
            "type" : "error"
        })
          setTimeout(() => {setUpdateMessage(null)}, 5000)
        })
      setUpdateMessage({
          "text" : `Deleted ${name}`,
          "type" : "update"
      })
      setTimeout(() => {setUpdateMessage(null)}, 5000)  
    }
  }
    return (
      <ul>
      <li>{person.name} {person.number}</li> 
      <button onClick={() => delPersonOf(person.id, person.name)}>delete</button>
      </ul>
    )
  }

export default ShowName