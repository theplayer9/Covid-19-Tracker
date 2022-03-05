import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([
    "usa",
    "india",
    "australia",
    "japan",
  ]);

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="avs">
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
            ))}

            {/* hard coded */}
            {/* <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">2</MenuItem>
            <MenuItem value="worldwide">3</MenuItem>
            <MenuItem value="worldwide">4</MenuItem> */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
