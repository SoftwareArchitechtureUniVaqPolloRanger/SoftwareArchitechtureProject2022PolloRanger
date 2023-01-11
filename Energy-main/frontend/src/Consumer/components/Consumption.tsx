import React from 'react';
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


export function Consumption() {
  return (<div>
    <Bar options={options} data={data} />
  </div>)
}