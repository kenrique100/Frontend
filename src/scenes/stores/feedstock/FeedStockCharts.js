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

export const FeedStockCharts = ({ feedStockCharts }) => {
  var data = {
    labels: feedStockCharts?.labels,
    datasets: [
      {
        label: "Initial(kg)",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.qtyInStock,
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Kg Used",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.qtyUsed,
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
      },
      {
        label: "Remaining(kg)",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.qtyRemaining,
        fill: false,

        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };
  // End sales and expense chart data
  //Begin invest chart data
  var usageData = {
    labels: feedStockCharts?.labels,
    datasets: [
      {
        label: "Qty Used",
        formatter: function (value, context) {
          return value || null;
        },
        data: feedStockCharts?.qtyUsed,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
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
        <div className="col-xl-6 col-lg-7">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {" "}
                FeedStock : Till Date{" "}
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
        {/* <!-- Area Chart --> */}
        <div className="col-xl-6 col-lg-7">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {" "}
                FeedStock Qty Used (kg) : Till date{" "}
              </h6>
            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <Doughnut data={usageData} height={300} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
