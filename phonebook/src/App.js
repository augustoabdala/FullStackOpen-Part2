import { useState, useEffect } from 'react'
import axios from 'axios'

import Numbers from './components/Numbers'
import Form from './components/Form'
import Filter from './components/Filter'

import phoneServices from './services/phones'

const App = () => {
  const [persons, setPersons] = useState([[], []])
  const [newName, setNewName] = useState('name')
  const [newNum, setNewNum] = useState('1234')

  useEffect(() => {
    phoneServices   
      .getAll()
      .then(initialPersons => {
        setPersons([initialPersons, initialPersons])
      })
  }, [])

  function addContact(event) {
    event.preventDefault()

    const obj = {
      name: newName,
      num: newNum
    }

    if (!persons[0].find(per => per.name === obj.name)) {

      if (!persons[0].find(per => per.num === obj.num)) {

        const newArray = [persons[0].concat(obj), persons[1].concat(obj)]

        phoneServices
          .create(obj)
          .then(newObject => {
            console.log(newObject)
            setPersons(newArray)
            setNewNum('')
            setNewName('')
          })



      } else
        (
          alert(`The number: ${obj.num} is already added to the phonebook.`)
        )

    } else
      (
        alert(`The name: ${obj.name} is already added to the phonebook.`)
      )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {

    const query = event.target.value;

    if (query === '') {
      const notFiltered = persons[0]
      setPersons([notFiltered, notFiltered])
    } else {

      var cleanList = persons[0]
      var updatedList = persons[0]

      updatedList = updatedList.filter(
        (item) => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        }
      )

      setPersons([cleanList, updatedList]);
    }

  };

  return (

    <div>
      <h2>Phonebook</h2>

      <Filter handle={handleFilterChange} />

      <h2>Add a new</h2>

      <Form addContact={addContact} handleNameChange={handleNameChange}
        handleNumChange={handleNumChange} newNum={newNum} newName={newName} />

      <Numbers search={persons[1]} />

    </div>
  )
}

export default App
