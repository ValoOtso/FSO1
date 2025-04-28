import { use, useEffect, useState } from 'react'

import './index.css'

import personService from './services/persons'

const Persons = (props) => {
  return (
      <li>{props.name} {props.number} <button onClick={props.deletePerson}>delete</button></li>
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

const Notification = ({message}) => {
  if (message === null){
    return null
  }

  return (<div className='notification'>{message}</div>)
}

const ErrorNotification = ({errorMessage}) => {
  if (errorMessage === null){
    return null
  }

  return (<div className='error'>{errorMessage}</div>)
}

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWith, setFilterWith] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }
    )
  }

  useEffect(hook, [])

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
      const confirm = window.confirm(`${newName} is alredy added to phonebook. Do you want to replace the old number with a new one? `)
      if (confirm) {
        const personToChange = persons.find(p => p.name === newName)
        const newObject = {
          id: personToChange.id,
          name: personToChange.name,
          number: newNumber
        }
        personService
        .changeNumber(personToChange.id, newObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personToChange.id ? person : returnedPerson))
          setMessage(
            `${personToChange.name}'s number changed`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${personToChange.name} has alredy been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }else(
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(
          `${returnedPerson.name} added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        const em = error.response.data.error
        setErrorMessage(
          em
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    )
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    const confirm = window.confirm(`Do you really want to delete person ${personToDelete.name}`)

    if (confirm){
      personService
      .deletePerson(id)
      .then(responseData => {
        setPersons(persons.filter(person => person.id !== id))
      })
      setMessage(`${personToDelete.name} deleted`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
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
      <Notification message = {message}/>
      <ErrorNotification errorMessage={errorMessage}/>
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
      <ul>
      {namesToShow.map((person) => 
      <Persons 
      key = {person.id}
      name = {person.name}
      number = {person.number} 
      deletePerson = {() => deletePerson(person.id)}/>
      )}
      </ul>
    </div>
  )
}

export default App