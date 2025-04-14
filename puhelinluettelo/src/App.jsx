import { use, useState } from 'react'

const Persons = (props) => {
  return (
    <ul>
      {props.namesToShow.map((person, index) => <li key={index}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      name: <input 
      value={props.newName}
      onChange={props.handleNameChange}
      />
      number: <input
      value={props.newNumber}
      onChange={props.handleNumberChange}
      />
      <button type="submit">add</button>
      </form>
    )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.filterWith}
      onChange={props.handleFilterChange}
      />
    </div>
  )
  
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWith, setFilterWith] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNameChange = (event)=> {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event)=> {
    setNewNumber(event.target.value)
  }

  const addPerson = (event)=> {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).indexOf(newName) != -1){
      alert(`${newName} is alredy added to phonebook`)
    }else(setPersons(persons.concat(personObject)))
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilterWith(event.target.value)
  };
  
  const namesToShow = filterWith
  ? persons.filter(person => person.name.toLowerCase().includes(filterWith.toLowerCase()))
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWith = {filterWith}
        handleFilterChange = {handleFilterChange}
      />
      <h2>Add new: </h2>
      <PersonForm addPerson = {addPerson}
      newName = {newName}
      newNumber = {newNumber}
      handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons namesToShow = {namesToShow} />
    </div>
  )

}

export default App