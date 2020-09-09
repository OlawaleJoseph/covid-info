import React, { useState, useEffect } from 'react';
import { 
          FormControl,
          MenuItem,
          Select
          } from '@material-ui/core';
import StatBox from './components/StatBox'
import { formatNumber } from './utils/helper'
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("global");
  const [countryInfo, setCountryInfo] = useState({})
  
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('https://disease.sh/v3/covid-19/all')
      const response = await res.json()
      setCountryInfo(response)
    }
    fetchData();
  }, [])

  useEffect(() => {
const getCountries = async () => {
 const response = await (await fetch('https://disease.sh/v3/covid-19/countries'))
 const res = await response.json()
 const countries = res.map((country) => ({
   name: country.country,
   value: country.countryInfo.iso2
  }));
 setCountries(countries);
}
getCountries()
  }, [])

  const onCountryChange =  async (e) => {
     let countryCode = e.target.value

    const url = countryCode === 'global' ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const res = await fetch(url)

    const response = await res.json()

    setCountry(countryCode)
    setCountryInfo(response)
  
  }
  return (
    <div className="app">
      <div className="app__header  ">
        <h1> Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
        <Select 
          variant="outlined"
          value={country}
          onChange={onCountryChange}
        >
          <MenuItem value="global">Global</MenuItem>
          {
            countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      </div>
      <div className="app__stats">
        <StatBox title='Confirmed' cases={formatNumber(countryInfo.todayCases)} total={formatNumber(countryInfo.cases)} />
        <StatBox title='Recovered' cases={formatNumber(countryInfo.todayRecovered)} total={formatNumber(countryInfo.recovered)} />
        <StatBox title='Deaths' cases={formatNumber(countryInfo.todayDeaths)} total={formatNumber(countryInfo.deaths)} />
      </div>
    </div>
  );
}

export default App;
