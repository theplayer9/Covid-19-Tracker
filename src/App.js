import { Card, CardContent, FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  // https://disease.sh/v3/covid-19/countries

  //useEffect---> Once the app component loads on the screen, then the useEffect function is executed. It will execute for the very first time when the component is rendered first time and also every time whenever the dependencies are changed.
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States
            value: country.countryInfo.iso2, //US
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    console.log("country code id: ", countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ); //this is the ES6 syntax.
              })}

              {/* {countries.map(country =>( 
                <MenuItem value={country}>{country}</MenuItem>
              ) //this is also the ES6 syntax. Both works fine.
            )} */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Corona Virus Cases" cases={12432} total={444} />
          <InfoBox title="Recovered" cases={2344} total={555} />
          <InfoBox title="Deaths" cases={1} total={666} />
        </div>

        <div>
          <Map></Map>
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h2>Live cases by country </h2>
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
