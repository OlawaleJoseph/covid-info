import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import fetchGraphData from '../utils/graphUtil';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};
function Graph({ caseType, country }) {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchdata = async() => {
      const url = country === 'global' ? "https://disease.sh/v3/covid-19/historical/all?lastdays=30" : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`
      const data = await fetch(url)
      const jsonData = await data.json()
      await setGraphData(fetchGraphData(jsonData, caseType));
    }
    fetchdata();
  }, [caseType, country])
  return (
    <div className="graph">

      <Line
        data={{
          datasets: [
            {
              data: graphData,
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034"
            }
          ]
        }}
        options= {options}
      />
    </div>
  )
}

export default Graph
