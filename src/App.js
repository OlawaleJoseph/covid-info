import React, { useState, useEffect } from 'react';
import { 
          FormControl,
          FormControlLabel,
          RadioGroup,
          Radio,
          MenuItem,
          Select,
          Card,
          CardContent
          } from '@material-ui/core';
import StatBox from './components/StatBox';
import Table from './components/Table';
import { formatNumber } from './utils/helper'
import './App.css';
import Graph from './components/Graph';
import Map from './components/Map';
import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("global");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  
  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch('https://disease.sh/v3/covid-19/all')
      const response = await res.json()
      setCountryInfo(response)
    }
    fetchData();
  }, []);

  useEffect(() => {
  const getCountries = async () => {
    const response = await (await fetch('https://disease.sh/v3/covid-19/countries'))
    const res = await response.json()
    const countries = res.map((country) => ({
      name: country.country,
      value: country.countryInfo.iso2
      }));
    setCountries(countries);
    setMapCountries(res);
    setTableData(res.sort((a, b) =>  b.cases - a.cases));
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
    if (countryCode !== 'worldwide') setMapCenter([response.countryInfo.lat, response.countryInfo.long])
    setMapZoom(4)
  }
  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
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
          <StatBox
            caseType={`${caseType}`}
            yellow={true}
            active={caseType === 'cases'}
            title='Confirmed'
            cases={formatNumber(countryInfo.todayCases)}
            total={formatNumber(countryInfo.cases)}
            onClick={() => setCaseType('cases')}
          />
          <StatBox
            caseType={caseType}
            green={true}
            active={caseType === 'recovered'}
            title='Recovered'
            cases={formatNumber(countryInfo.todayRecovered)}
            total={formatNumber(countryInfo.recovered)}
            onClick={() => setCaseType('recovered')} 
          />
          <StatBox
            caseType={caseType}
            active={caseType === 'deaths'}
            title='Deaths'
            cases={formatNumber(countryInfo.todayDeaths)}
            total={formatNumber(countryInfo.deaths)}
            onClick={() => setCaseType('deaths')}
          />
        </div>
        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} caseType={caseType} />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Cases By Country</h3>
            <Table countries={tableData} /> 

            <div className="graph">
              <h3>Last 30 Days Cases</h3>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={caseType} onChange={(e) => setCaseType(e.target.value)} row>
                  <FormControlLabel value="cases" control={<Radio />} label="Confirmed" />
                  <FormControlLabel value="recovered" control={<Radio />} label="Recovered" />
                  <FormControlLabel value="deaths" control={<Radio />} label="Deaths" />
                </RadioGroup>
              </FormControl>
              <Graph caseType={caseType}
                    country={country}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
