import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardChart = ({ sadCategories }) => {
  const data = {
    labels: ["Normal", "Mild", "Moderate", "Severe"],
    datasets: [
      {
        data: [
          sadCategories.normal,
          sadCategories.mild,
          sadCategories.moderate,
          sadCategories.severe,
        ],
        backgroundColor: [
          "rgba(99, 237, 229, 0.6)",
          "rgba(122, 155, 240, 0.6)",
          "rgba(43, 151, 251, 0.6)",
          "rgba(66, 139, 163, 0.6)",
        ],
        borderColor: [
          "rgba(99, 237, 229, 3)",
          "rgba(122, 155, 240, 3)",
          "rgba(43, 151, 251, 3)",
          "rgba(66, 139, 163, 3)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div
      className="chart-container"
      style={{ height: "300px", width: "300px" }}
    >
      <Doughnut data={data} />
    </div>
  );
};

export default DashboardChart;
