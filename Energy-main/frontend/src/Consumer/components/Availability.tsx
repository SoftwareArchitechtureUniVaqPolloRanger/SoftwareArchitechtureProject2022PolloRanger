import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CHART_COLORS } from '../../utils/colors';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
import { Grid } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
  labels: ['Fossil Fuels: 12 MW', 'Marine: 19 MW', 'Geothermal: 3 MW', 'Solar: 5 MW', 'Total: 39MW'],
  datasets: [
    {
      label: '',
      data: [12, 19, 3, 5],
      backgroundColor: Object.values(CHART_COLORS),
    }
  ]
};

export function App() {

}
export function Availability() {
  const [totalSupply, setTotalSupply] = useState("");
  const [labels, setLabels] = useState([])
  const [datasets, setDatasets] = useState([]);
  useEffect(() => {
    //@ts-ignore 
    axios.get(`http://localhost:4002/power-supplier/power-distribution`).then(response => {
      //@ts-ignore
      const consumer = JSON.parse(localStorage.getItem('authInfo')).consumerType
      //@ts-ignore
      response.data.forEach(res => {
        //@ts-ignore
        if (consumer === "home") {
          setTotalSupply(res?.residentialAreaSupply)
        }
        else if (consumer === "office") {
          setTotalSupply(res?.officeSupply)
        }
        else {
          setTotalSupply(res?.industrialSupply)
        }
      })
    })
    //@ts-ignore
    const labelsArr = []
    axios.get(`http://localhost:3001/power-plant/timestamp/2023-01-11T01:00:00Z`).then(response => {

      //@ts-ignore
      const responseData = response?.data
      labelsArr.push(`${responseData?.fossilFuel?.power}`)
      labelsArr.push(`${responseData?.solar?.power}`)
      labelsArr.push(`${responseData?.hydro?.power}`)
      labelsArr.push(`${responseData?.geothermal?.power}`)
      const labellings = []
      //@ts-ignore
      console.log(labelsArr, labelsArr.length);
      //@ts-ignore
      labellings.push(`Fossil Fuel: ${labelsArr[0]} MW`)
      //@ts-ignore
      labellings.push(`Solar: ${labelsArr[1]} MW`)
      //@ts-ignore
      labellings.push(`Marine:${labelsArr[2]} MW`)
      //@ts-ignore
      labellings.push(`Geothermal:${labelsArr[3]} MW`)
      //@ts-ignore
      setLabels(labellings);
      setDatasets([
        //@ts-ignore
  
        {
          label: '',
          //@ts-ignore
          data: labelsArr,
          backgroundColor: Object.values(CHART_COLORS),
        }
  
      ])

    }).catch(err => console.error(err))
    //@ts-ignore
    
  }, [])
  return (
    <>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1 className="d-flex justify-content-center align-items-center">Total Power Received during this hour</h1>
          <h1 className="d-flex justify-content-center align-items-center">{totalSupply}KW</h1>
        </Grid>
        <Grid item xs={6}>
          <div style={{ width: '650px' }}>
            <Pie data={{ labels, datasets }} options={{
              plugins: {
                legend: {
                  position: 'right' as const,
                },
                title: {
                  display: false,
                },
                datalabels: {
                  formatter: (value: number, context) => {
                    let total = 1;
                    context.chart.data.datasets?.[0]?.data.forEach((value) => {
                      if (typeof value === 'number') {
                        total += value;
                      }
                    });
                    const percentage = (value / total) * 100;
                    return `${percentage.toFixed(2)}%`
                  },
                  color: 'white'
                }
              },
            }}
              plugins={[ChartDataLabels]}
            />
          </div>
        </Grid>
      </Grid>
    </>
  )
}