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
import Table from "./Table";
import { prettyPrintStat, sortData } from "./util";
import Graph from "./Graph";
import { Line } from "react-chartjs-2";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80745, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
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
          const sortdata = sortData(data);
          setMapCountries(data); // this will store the all the data
          setCountries(countries); // this will return an object containing name and value of every country.
          setTableData(sortdata); //this will be the list of countries containing all the data that will be fetched from the api in sorted form
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log("country code id: ", countryCode);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
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

              {/* {countries.map(country) =>( 
                <MenuItem value={country}>{country}</MenuItem>
              ) //this is also the ES6 syntax. Both works fine.
            )} */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Corona Virus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.todayRecovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        <div>
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <div>
            <h2>Live cases by country.... </h2>
            <Table countries={tableData} />
            <h2>Worldwide new {casesType} </h2>
            <Graph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
