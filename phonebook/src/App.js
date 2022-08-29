import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Thisother Guy' }
  ])

  const [newName, setNewName] = useState('Type here')

  const addName = (event) => {
    event.preventDefault()

    const nameObj = {
      name: newName
    }

    if (!persons.find(per => per.name === nameObj.name)) {
      setPersons(persons.concat(nameObj))
      setNewName('')
    }else(
      alert(`${nameObj.name} is already added to the phonebook.`)
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
