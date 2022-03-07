import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table"
import {sortData} from './util'



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])

  //  For default result on screen
  useEffect(() => {
    const url = "https://disease.sh/v3/covid-19/all";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data); //this will store all the data of that country.
      });
  }, []);

  // https://disease.sh/v3/covid-19/countries

  //useEffect---> Once the app component loads on the screen, then the useEffect function is executed. It will execute for the very first time when the component is rendered first time and also every time whenever the dependencies are changed.

  // For whenever we click on some country

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States
            value: country.countryInfo.iso2, //US
          }));
          const sortdata= sortData(data)
          setCountries(countries); // this will return an object containing name and value of every country.
          setTableData(sortdata) //this will be the list of countries containing all the data that will be fetched from the api
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("country code id: ", countryCode);
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}
    `;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data); //this will store all the data of that country.
      });

    // https://disease.sh/v3/covid-19/countries
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
          <InfoBox
            title="Corona Virus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.todayRecovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <div>
          <Map />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <h2>Live cases by country.... </h2>
          <Table countries={tableData} />
          <h2>Worldwide new cases </h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
