import { useState, useEffect } from 'react'

import Numbers from './components/Numbers'
import Form from './components/Form'
import Filter from './components/Filter'

import Notification from './notifications/Notification'

import phoneServices from './services/phones'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([[], []])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState(null)


  const reloadDb = () => {
    phoneServices
      .getAll()
      .then(initialPersons => {
        setPersons([initialPersons, initialPersons])
      })
  }

  useEffect(() => {
    reloadDb()
  }, [])

  function addContact(event) {

    event.preventDefault()

    const obj = {
      name: newName,
      number: newNum,
    }

    if (!persons[0].find(per => per.name === obj.name)) {

      if (!persons[0].find(per => per.number === obj.number)) {

        phoneServices
          .create(obj)
          .then((data) => {
            setPersons([persons[0].concat(data), persons[1].concat(data)])
            setNewNum('')
            setNewName('')
            setMessage(`Added: ${data.name}`)
            setStyle('success')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })

      } else
        (
          alert(`The number: ${obj.number} is already added to the phonebook.`)
        )

    } else if (window.confirm(`${obj.name} is already added to the phonebook,
    replace the old number with a new one? `)) {

      let phone = persons[0].find(per => per.name === obj.name)
      
      phoneServices
        .update(phone.id, obj)
        .then(
          () => {
            reloadDb()
            setMessage(`Updated: ${phone.name}`)
            setStyle('success')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        .catch(error => {
          reloadDb()
          setMessage(`Information of ${phone.name} has already been removed from server`)
          setStyle('error')
          console.log(error.message)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const delNum = (per) => {
    if (window.confirm(`Delete: ${per.name}?`)) {
      phoneServices
        .deleteNum(per.id)
        .then(() => {
          reloadDb()
          setMessage(`Deleted: ${per.name}`)
          setStyle('deleted')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          reloadDb()
          setMessage(`Information of ${per.name} has already been removed from server`)
          setStyle('error')
          console.log(error.message)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
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

      <Notification message={message} style={style} />

      <Filter handle={handleFilterChange} />

      <h2>Add a new</h2>

      <Form addContact={addContact} handleNameChange={handleNameChange}
        handleNumChange={handleNumChange} newNum={newNum} newName={newName} />

      <Numbers search={persons[1]} delNum={delNum} />

    </div>
  )
}

export default App
