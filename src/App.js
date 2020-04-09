import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import { ErrorNotification, MessageNotification } from './components/Notification'


const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ notificationMessage, setNotificationMessage] = useState(null)

  // read directory from "database"
  const hook = () => {
    // console.log('effect')
    personService
      .getAll()
      .then(intialPersons => {
        // console.log('promise fulfilled')
        setPersons(intialPersons)
      })
  }
  useEffect(hook, [])
  // console.log('render', persons.length, 'persons')

  const [ newName, setNewName ] = useState({
    name: 'new person here',
    number: ''
  })

  let foundPerson = false

  const addName = (event) => {
    event.preventDefault()

    persons.forEach(p => {
      if (p.name === newName.name) {
        foundPerson = true
        // console.log('already exists, update or not')
        if (window.confirm(`${newName.name} is already in the phonebook, replace the old number with the new one?`)) {

          const replaceObject = {
            name: newName.name,
            number: newName.number,
            id: p.id,
          }

          personService
            .update(replaceObject)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id === replaceObject.id ? replaceObject : p))
              setNewName({ name:'', number:'' })
              console.log(returnedPerson)
            })
        }
      }
    })

    //find maximum index, otherwise inserts will fail if you delete someone from middle at some point
    let max = persons.reduce( (a, b) => Math.max(a.id, b.id) )

    if (!foundPerson) {
      const nameObject = {
        name: newName.name,
        number: newName.number,
        id: max + 1,
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName({ name:'', number:'' })
          setNotificationMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName({ ...newName, name: event.target.value })
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewName({ ...newName, number: event.target.value })
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setSearchFilter(event.target.value)
  }

  const deletePerson = ( person ) => {
    // console.log('in delete', person.id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteItem(person.id)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(
            `Information of '${person.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <MessageNotification message={notificationMessage} />
      <Filter value={searchFilter} handler={handleFilterChange} />
      <h3> Add a new</h3>
      <PersonForm
        newPerson={newName}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        formHandler={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={searchFilter} func={deletePerson}/>
    </div>
  )
}

export default App
