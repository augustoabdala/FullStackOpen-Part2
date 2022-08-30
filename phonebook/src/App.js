import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      num: '040-1234567'
    },
    {
      id: 2,
      name: 'Thisother Guy',
      num: '040-1234568'
    }
  ])

  const [shown, setShown] = useState(persons)

  const [newName, setNewName] = useState('name')
  const [newNum, setNewNum] = useState('1234')

  const addContact = (event) => {
    event.preventDefault()

    const obj = {
      id: persons.length + 1,
      name: newName,
      num: newNum
    }

    if (!persons.find(per => per.name === obj.name)) {

      if (!persons.find(per => per.num === obj.num)) {
        setPersons(persons.concat(obj))
        setNewNum('')
        setNewName('')
        setShown(persons)
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

  const handleFilterChange = (event) => {

    const query = event.target.value;

    if (query === '') {
      setShown(persons)
    } else {

      var updatedList = [...persons];

      updatedList = updatedList.filter(
        (item) => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        }
      )
      setShown(updatedList);
    }

  };



  return (


    <div>
      <h2>Phonebook</h2>

      <div>
        filter: <input onChange={handleFilterChange} />
      </div>

      <h2>Add a new</h2>

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

      <Numbers search={shown} />

    </div>
  )
}

export default App
