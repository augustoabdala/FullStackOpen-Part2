import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Thisother Guy'}
  ]) 

  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <Numbers persons={persons}/>

    </div>
  )
}

export default App
