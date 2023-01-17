import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import axios from 'axios'
import { setDatasets } from 'react-chartjs-2/dist/utils';

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

const availabilityLabels = ["Marine", "Solar", "Geothermal", "Fossil Fuel"];

const availability = {
  labels: availabilityLabels,
  datasets: [
    {
      label: "Energy resources",
      data: availabilityLabels.map(() => Math.random() * 1000),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

export function Availability({geoThermal, fossilFuel}: {geoThermal: boolean, fossilFuel: boolean}) {
  const [energyData, setEnergyData] = useState([]);
  const [totalEnergyData, setTotalEnergyData] = useState("")
  useEffect(() => {
    //@ts-ignore
    let dataArr = []
    axios.get(`http://localhost:3001/power-plant/timestamp/2023-01-11T01:00:00Z`).then(response => {
      dataArr = [response?.data?.hydro?.power, response?.data?.solar?.power, response?.data?.geothermal?.power, response?.data?.fossilFuel?.power]

      setEnergyData([
        //@ts-ignore
        {
          label: "Energy resources",
          //@ts-ignore
          data: dataArr,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235)",
        }
      ])
      const energyData = dataArr.reduce((acc, val) => acc + val, 0)
      //@ts-ignore
      //@ts-ignore
      setTotalEnergyData(`${energyData} kW`);

    })
    //@ts-ignore
  }, [geoThermal, fossilFuel])

  return (
    <>
      <h2>Availability: {totalEnergyData}</h2>
      <Bar options={options} data={{ labels: availabilityLabels, datasets: energyData }} />
    </>
  );
}
