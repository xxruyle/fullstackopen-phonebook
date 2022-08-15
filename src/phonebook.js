import { useState, useEffect } from 'react'
import phoneNumbers from './services/phoneNumbers'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [peopleToShow, setPeopleToShow] = useState('')


  const getPeople = () => {
    phoneNumbers.getAll().then(returnedPeople => {
        setPersons(returnedPeople)
    })
  }
  useEffect(getPeople, [])


  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleToShowChange = (event) => {
    event.preventDefault()
    setPeopleToShow(event.target.value)
    console.log(peopleToShow)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber, 
        id: persons.length, 
    }

    phoneNumbers
        .addPerson(personObject).then(returnedPerson => 
        {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
        })
  }

  // Filtering search
  let filteredObjects = []
  for (const [key, value] of Object.entries(persons)) {
    if (value.name.toLowerCase().includes(peopleToShow.toLowerCase()) && !(value.name in filteredObjects)) {
        filteredObjects.push(value.id)
    }
  }

  console.log(filteredObjects)
  
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
            Filter: <input value={peopleToShow} onChange={handleToShowChange}/>
        </div>
      <h2>Add Person</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
            {peopleToShow === '' ? persons.map(person =>  <li key={person.id}>{person.name}: {person.number}</li>) : 
            filteredObjects.map(filtered => <li key={filtered}>{persons[filtered].name}: {persons[filtered].number}</li>)}  
        </ul>
    </div>
  )
}

export default App