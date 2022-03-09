import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});
  // https://disease.sh/v3/covid-19/historical/all?lastdays=120

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    // data[casesType].forEach((date) = >
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date]
      //To make code more dynamic we are using -> data[casesType] ---> this means that inside of data there is a property/key/object caseType(and caseType is given the default value of 'cases' in the argument because API is returning that value), and we are accessing that value. This can also be written as data.cases but the drawback with this is that we have to change it's value everywhere it's defined.
    };
    return chartData;
  };
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((response) => response.json())
      .then((data) => {
        // console.log("line graph data",data)
        let chartData = buildChartData(data, 'cases');
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h2>I'm the player</h2>
      <Line
        data={{
          datasets: [
            {
              borderColor: "#CC1034",
              backgroundColor: "rgba(204,16,52)",
              data: data,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}

export default LineGraph;
