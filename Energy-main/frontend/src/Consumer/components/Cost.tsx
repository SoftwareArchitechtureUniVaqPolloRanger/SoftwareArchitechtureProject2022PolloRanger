import React from 'react';
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

const labels = ['01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM'];

const total = {
  labels,
  datasets: [
    {
      label: 'Total price/unit',
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'white',
    }]
}

const marine = {
  labels,
  datasets: [{
    label: 'Marine',
    data: labels.map(() => Math.random() * 1000),
    borderColor: '#BCAAA4',
    backgroundColor: 'white',
  }]
}

const geothermal = {
  labels,
  datasets: [{
    label: 'Geothermal',
    data: labels.map(() => Math.random() * 1000),
    borderColor: '#CE93D8',
    backgroundColor: 'white',
  }]
};

const solar = {
  labels,
  datasets: [{
    label: 'Solar',
    data: labels.map(() => Math.random() * 1000),
    borderColor: '#80CBC4',
    backgroundColor: 'white',
  }]
}

const fossilFuels = {
  labels,
  datasets: [{
    label: 'Fossil Fuels',
    data: labels.map(() => Math.random() * 1000),
    borderColor: '#EF5350',
    backgroundColor: 'white',
  },
  ],
};

const billLabels = ['01 AM', '02 AM', '03 AM', '04 AM', '05 AM', '06 AM', '07 AM', '08 AM', '09 AM', '10 AM', '11 AM'];

export const billData = {
  labels,
  datasets: [
    {
      label: 'Calculated Cost',
      data: billLabels.map(() => Math.random() * 1000),
      backgroundColor: 'rgb(53, 162, 235)',
    }
  ],
};


export function Cost() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
       <Bar options={options} data={billData} />
      </Grid>
      <Grid item xs={6}>
        <Line options={options} data={total} />
      </Grid>
      <Grid item xs={6}>
        <Line options={options} data={marine} />
      </Grid>
      <Grid item xs={6}>
        <Line options={options} data={geothermal} />
      </Grid>
      <Grid item xs={6}>
        <Line options={options} data={solar} />
      </Grid>
      <Grid item xs={6}>
        <Line options={options} data={fossilFuels} />
      </Grid>
    </Grid>
  )
}