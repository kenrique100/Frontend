import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const UpdateFeedStockCharts = ({ feedStockCharts }) => {
  var data = {
    labels: feedStockCharts?.labels,
    datasets: [
      {
        label: "Broiler",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.broilerFeedUsed,
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Fish",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.fishFeedUsed,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Duck & Local Fowl",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.duckAndFowlFeedUsed,
        fill: false,

        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Pigs",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.pigFeedUsed,
        fill: false,

        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Rabbits",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.rabbitFeedUsed,
        fill: false,

        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Others",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.otherFeedUsed,
        fill: false,

        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    skipNull: true,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };
  return (
    <div>
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-7">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {" "}
                FeedStock : Usage by Animal Group{" "}
              </h6>
            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <Bar data={data} height={300} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
