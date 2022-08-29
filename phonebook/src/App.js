import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      num: '040-1234567'
    },
    {
      name: 'Thisother Guy',
      num: '040-1234568'
    }
  ])

  const [newName, setNewName] = useState('name')
  const [newNum, setNewNum] = useState('1234')


  const addContact = (event) => {
    event.preventDefault()

    const obj = {
      name: newName,
      num: newNum
    }

    if (!persons.find(per => per.name === obj.name)) {

      if (!persons.find(per => per.num === obj.num)) {
        setPersons(persons.concat(obj))
        setNewNum('')
        setNewName('')
      } else (
        alert(`The number: ${obj.num} is already added to the phonebook.`)
      )

    } else (
      alert(`The name: ${obj.name} is already added to the phonebook.`)
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <Numbers persons={persons} />

    </div>
  )
}

export default App
