import { useState, useEffect } from 'react'
import axios from 'axios'

import Numbers from './components/Numbers'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([[], []])
  const [newName, setNewName] = useState('name')
  const [newNum, setNewNum] = useState('1234')

  useEffect(() => {
    axios
      .get('http://localhost:3001/phones')
      .then(response => {
        setPersons([response.data, response.data])
      })
  }, [])

  function addContact(event) {
    event.preventDefault()

    const obj = {
      id: persons[0].length + 1,
      name: newName,
      num: newNum
    }

    if (!persons[0].find(per => per.name === obj.name)) {

      if (!persons[0].find(per => per.num === obj.num)) {

        const newArray = [persons[0].concat(obj), persons[1].concat(obj)]

        axios
          .post('http://localhost:3001/phones', obj)
          .then(response => {
            console.log(response)
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
