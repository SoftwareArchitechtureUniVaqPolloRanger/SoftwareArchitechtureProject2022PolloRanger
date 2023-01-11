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
            return new Date(times.timestamp).getHours()
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
              backgroundColor: Object.values(CHART_COLORS)[index%6]
            }
          })
          setDataset(datasets)
        })
        .catch(err => alert("Failed to fetch the data"))
    } catch (error) {

    }
  }, [])
  return (<div>
    <Bar options={options} data={{ labels, datasets: dataset }} />
  </div>)
}