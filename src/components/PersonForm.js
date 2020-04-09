import React from 'react'

const PersonForm = (props) => {

  const person = props.newPerson
  const handleNameChange = props.nameHandler
  const handleNumberChange = props.numberHandler
  const addName= props.formHandler

  return (
    <form onSubmit={addName}>
      <div>
      name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
      number:
        <input
          value={person.number}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm