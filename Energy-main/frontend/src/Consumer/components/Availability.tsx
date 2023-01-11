import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CHART_COLORS } from '../../utils/colors';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '650px' }}>
          <Pie data={data} options={{
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
      </div>
    </>
  )
}