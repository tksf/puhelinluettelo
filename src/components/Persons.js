import React from 'react'

const personsToShow = (persons, searchFilter) => {
  // return persons
  if (searchFilter === '') {
    return persons
  } else {
    return persons.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
  }
}


const Persons = (props) => {
  const persons = props.persons
  const filter = props.filter
  const func = props.func

  return (
    <ul>
      {personsToShow(persons, filter).map((person, i) =>
        <li key={i}>
          {person.name} : {person.number}
          <button onClick={() => func(person)}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons

