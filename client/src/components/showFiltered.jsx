import ShowName from './showName'

const Persons = (props) => {
    const filteredData = props.persons.filter(person => {
      if (props.input === '') {return person}
      else if (person.name.toLowerCase().includes(props.input.toLowerCase()))
        {return person}
      }
    )

    return (
        filteredData.map(person => <ShowName key={person.id} person={person} persons={props.persons} setPersons={props.setPersons} setUpdateMessage={props.setUpdateMessage} setErrorMessage={props.setErrorMessage}/>)
    )
    
  }

export default Persons