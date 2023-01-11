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
  return (
    <>
      <h2>User Consumption: 20 MW</h2>
      <Bar options={options} data={consumption} />
    </>
  );
}
