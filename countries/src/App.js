import Display from "./components/Display";
import Form from "./components/Form";

import { useState, useEffect } from 'react'

import serviceCountry from "./services/countriesServices";



function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    serviceCountry
      .getAll()
      .then(initCountries => {
        setCountries(initCountries)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <Form search={search} handleSearch={handleSearch}/>
      <Display countries={countries} />
    </div>
  );
}

export default App;
