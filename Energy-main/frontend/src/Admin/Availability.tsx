import { Bar } from "react-chartjs-2";

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

const availabilityLabels = ["Marine", "Solar", "Gerthermal", "Fossil Fuel"];

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

export function Availability() {
  return (
    <>
      <h2>Availability: 18 MW</h2>
      <Bar options={options} data={availability} />
    </>
  );
}
