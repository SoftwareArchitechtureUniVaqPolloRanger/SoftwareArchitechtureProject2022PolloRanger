import React, { useState, useEffect } from 'react'
import { Bar } from "react-chartjs-2";
import axios from 'axios'
import { CHART_COLORS } from '../utils/colors';

export const options = {
  responsive: true,
  tension: 0.35,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
    },
  },
};

const consumptionLabels = ["Residential Areas", "Offices", "Industries"];

const consumption = {
  labels: consumptionLabels,
  datasets: [
    {
      label: "Users",
      data: consumptionLabels.map(() => Math.random() * 1000),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

export function UserConsumption() {
  const [labels, setLabels] = useState([]);
  const [totalValue, setTotalValue] = useState("");
  const [datasets, setDatasets] = useState([]);
  useEffect(() => {
    //@ts-ignore
    const usage = [];
    
    Promise.all([
      axios.get(`http://localhost:4000/smart-grid/user-consumption/home-consumption/timestamp/2023-01-11T01:00:00Z`),
      axios.get(`http://localhost:4000/smart-grid/user-consumption/office-consumption/timestamp/2023-01-11T01:00:00Z`),
      axios.get(`http://localhost:4000/smart-grid/user-consumption/office-consumption/timestamp/2023-01-11T01:00:00Z`)
    ]).then(responses => {
      responses.forEach((resp, index) => {
        usage.push(resp.data.totalUnits)
      });
      //@ts-ignore
      setTotalValue(usage.reduce((acc, val) => acc+val, 0))
            // @ts-ignore

      setDatasets([{
        label: 'Users',
        // @ts-ignore
        data: usage,
        backgroundColor: CHART_COLORS.blue
      }])
    })
    
  }, [])


  return (
    <>
      <h2>User Consumption: {totalValue} kW</h2>
      <Bar options={options} data={{ labels: consumptionLabels, datasets: datasets }} />
    </>
  );
}
