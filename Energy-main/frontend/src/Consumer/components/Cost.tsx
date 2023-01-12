import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Grid } from '@mui/material';
import axios from 'axios'
import { withTheme } from '@emotion/react';
import { CHART_COLORS } from '../../utils/colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
export const options = {
  responsive: true,
  tension: 0.35,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
    },
  },
};

// const labels = ['01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM'];

// const total = {
//   labels,
//   datasets: [
//     {
//       label: 'Total price/unit',
//       data: labels.map(() => Math.random() * 1000),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'white',
//     }]
// }

// const marine = {
//   labels,
//   datasets: [{
//     label: 'Marine',
//     data: labels.map(() => Math.random() * 1000),
//     borderColor: '#BCAAA4',
//     backgroundColor: 'white',
//   }]
// }

// const geothermal = {
//   labels,
//   datasets: [{
//     label: 'Geothermal',
//     data: labels.map(() => Math.random() * 1000),
//     borderColor: '#CE93D8',
//     backgroundColor: 'white',
//   }]
// };

// const solar = {
//   labels,
//   datasets: [{
//     label: 'Solar',
//     data: labels.map(() => Math.random() * 1000),
//     borderColor: '#80CBC4',
//     backgroundColor: 'white',
//   }]
// }

// const fossilFuels = {
//   labels,
//   datasets: [{
//     label: 'Fossil Fuels',
//     data: labels.map(() => Math.random() * 1000),
//     borderColor: '#EF5350',
//     backgroundColor: 'white',
//   },
//   ],
// };

// const billLabels = ['01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM'];

// export const billData = {
//   labels,
//   datasets: [
//     {
//       label: 'Calculated Cost',
//       data: billLabels.map(() => Math.random() * 1000),
//       backgroundColor: 'rgb(53, 162, 235)',
//     }
//   ],
// };


export function Cost() {
  //@ts-ignore
  const [dataset, setDataset] = useState<{
    label: string, data: any,
    backgroundColor: string
  }[]>([])
  const [solar, setSolar] = useState<{
    label: string, data: any,
    borderColor: string,
    backgroundColor: string
  }[]>([])
  const [labels, setLabels] = useState([])
  const [totalPrice, setTotalPrice] = useState<{
    label: string, data: any,
    borderColor: string,
    backgroundColor: string
  }[]>([])
  const [marine, setMarine] = useState<{
    label: string, data: any,
    borderColor: string,
    backgroundColor: string
  }[]>([])
  const [geothermal, setGeothermal] = useState<{
    label: string, data: any,
    borderColor: string,
    backgroundColor: string
  }[]>([])
  const [fossilfuel, setFossilFuel] = useState<{
    label: string, data: any,
    borderColor: string,
    backgroundColor: string
  }[]>([])

  useEffect(() => {
    //@ts-ignore
    const priceData = [], timeData = [], solarData = [], totalData = [], marinedata= [], geothermal=[], fossilFuel=[]

    try {
      const userType = JSON.parse(localStorage.getItem('authInfo') || '{}').consumerType

      axios.get(`http://localhost:4000/smart-grid/user-consumption/${userType}-consumption`)
        .then((res) => {
          //@ts-ignore
          // console.log(res.data)
          //@ts-ignore
          res.data.forEach((response) => {
            timeData.push({ time: response.timestamp, totalUnits: response.totalUnits });
          })
          //@ts-ignore
          const timeStamps = res.data.map((times) => {
            const timeData = new Date(times.timestamp).getHours()
            const day = timeData >= 12 ? 'pm' : 'am'
            return timeData + day
          })
          setLabels(timeStamps);
        }).catch(err => alert("Failed to fetch the data"))
      //@ts-ignore
      //@ts-ignore
      axios.get(`http://localhost:3001/power-plant/`).then((res) => {
        //@ts-ignore
        res?.data?.forEach((response, ind) => {
          //@ts-ignore
          priceData.push(`${((response?.hydro?.cost + response?.solar?.cost + response?.geothermal?.cost + response?.fossilFuel?.cost) * timeData?.[ind]?.totalUnits)}`)
          solarData.push(response?.solar?.cost);
          totalData.push((response?.hydro?.cost + response?.solar?.cost + response?.geothermal?.cost + response?.fossilFuel?.cost))
          marinedata.push(response?.hydro?.cost);
          geothermal.push(response?.geothermal?.cost);
          fossilFuel.push(response?.fossilFuel?.cost);
        })
      }).catch(error => console.error(error))
      //@ts-ignore  
    } catch (error) {
      console.error(error)
    }
    //@ts-ignore
    const db = [
      {
        label: 'Calculated Cost',
        //@ts-ignore

        data: priceData,
        //@ts-ignore

        backgroundColor: 'rgb(53, 162, 235)',
      }
    ];

    //@ts-ignore
    setDataset(db)
    setSolar([
      {
        label: "Cost of solar energy per hour",
        //@ts-ignore
        data: solarData,
        borderColor: '#EF5350',
        backgroundColor: "white"
      }
    ])
    setTotalPrice([
      {
        label: "Cost of Overall Energy Produced Per Hour",
        //@ts-ignore
        data: totalData,
        borderColor: '#BCAAA4',
        backgroundColor: CHART_COLORS.blue
      }
    ])
    setMarine([
      {
      label: "Cost of Marine Energy Produced Per Hour",
      //@ts-ignore
      data: marinedata,
      borderColor: "#CE93D8",
      backgroundColor: "white",
      }
    ])
    setGeothermal([
      {
        label: "Cost of geothermal energy produced per hour",
        //@ts-ignore
        data: geothermal,
        backgroundColor: "white",
        borderColor: "#BCAAA4",
      }
    ])
    setFossilFuel([
      {
        label: "Cost of fossil fuel energy produced per hour",
        //@ts-ignore
        data: fossilFuel,
        backgroundColor: "white",
        borderColor:"#80CBC4",
      }
    ])
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <h2 className="d-flex justify-content-center align-items-center">Cost of Units Consumed Per hour</h2>
        <Bar options={options} data={{ labels, datasets: dataset }} />
      </Grid>
      <Grid item xs={6}>
        <h2 className="d-flex justify-content-center align-items-center">Cost of Overall Energy Production</h2>
        <Bar options={options} data={{ labels, datasets: totalPrice }} />
      </Grid>
      <Grid item xs={6}>
      <h2 className="d-flex justify-content-center align-items-center">Cost of Marine Energy Produced per Hour</h2>

        <Line options={options} data={{labels, datasets:marine}} />
      </Grid>
      <Grid item xs={6}>
      <h2 className="d-flex justify-content-center align-items-center">Cost of Geothermal energy Produced Per Hour</h2>

        <Line options={options} data={{labels, datasets:geothermal}} />
      </Grid>
      <Grid item xs={6}>
        <h2 className="d-flex justify-content-center align-items-center">Cost of Solar Energy Per Hour</h2>
        <Line options={options} data={{ labels, datasets: solar }} />
      </Grid><Grid item xs={6}>
      <h2 className="d-flex justify-content-center align-items-center">Cost of Fossil fuel  Energy Per Hour</h2>

        <Line options={options} data={{labels, datasets: fossilfuel}} />
      </Grid>
    </Grid>
  )
}