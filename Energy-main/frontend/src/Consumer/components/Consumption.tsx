import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Weather} from './Weather'

import { Bar } from 'react-chartjs-2';
import { CHART_COLORS } from '../../utils/colors';
import axios from 'axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      }
    },
    y: {
      stacked: true,
      grid: {
        display: false
      }
    }
  }
};

const labels = ['01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Lights',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: CHART_COLORS.blue,
    },
    {
      label: 'Heating',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: CHART_COLORS.red,
    },
    {
      label: 'Water Heating',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: CHART_COLORS.orange,
    },
    {
      label: 'Appliances',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: CHART_COLORS.green,
    },
  ],
};

interface Resp {
  appliancesUsage: {
    [key: string]: number
  };
  timestamp: string;
  totalUnits: number
}


export function Consumption() {
  const [dataset, setDataset] = useState<{
    label: string, data: any,
    backgroundColor: string
  }[]>([])
  const [labels, setLabels] = useState([])
  useEffect(() => {
    try {
      const userType = JSON.parse(localStorage.getItem('authInfo') || '{}').consumerType
      axios.get(`http://localhost:4000/smart-grid/user-consumption/${userType}-consumption`)
        .then((res) => {
          console.log(res.data)
          const timeStamps = res.data.map((times: Resp) => {
            const timeData = new Date(times.timestamp).getHours()
            const day = timeData >= 12 ? 'pm' : 'am'
            return timeData + day
          })
          setLabels(timeStamps)
          const formattedData: { [key: string]: number[] } = {};
          //@ts-ignore
          res.data.forEach((row: Resp) => {
            Object.entries(row.appliancesUsage).forEach(([key, value]) => {
              if (!formattedData[key]) {
                formattedData[key] = []
              }
              formattedData[key].push(value)
            })
          });

          const datasets = Object.entries(formattedData).map(([key, value], index) => {
            return {
              label: key,
              data: value,
              backgroundColor: Object.values(CHART_COLORS)[index % 6]
            }
          })
          setDataset(datasets)
        })
        .catch(err => {
          console.error(err)

        })
    } catch (error) {

    }
  }, [])
  return (<div>
    <h2 className='d-flex justify-content-center align-items-center'>Consumption Data of whole day. </h2>
    <Bar options={options} data={{ labels, datasets: dataset }} />
    <h2 className='m-4 d-lex align-items-center justify-conten-center'>Weather Forecast</h2>
    <Weather />
  </div>)
}