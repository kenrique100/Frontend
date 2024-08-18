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

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ExpensesChart = ({ expenseData }) => {
  var data = {
    labels: expenseData?.expenseDates,
    datasets: [
      {
        label: "Expenses",
        formatter: function (value, context) {
          return value || null;
        },
        data: expenseData?.expenseAmount,
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

  var expensesChartData = {
    labels: expenseData?.expensesCategories,
    datasets: [
      {
        label: "Expenses by Category",
        formatter: function (value, context) {
          return value || null;
        },
        data: expenseData?.purchaseAmounts,
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
        <div className="col-xl-6 col-lg-7">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {" "}
                Expenses by Dates: {expenseData.chartRangeTitle}
              </h6>
            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <Line data={data} height={300} options={options} />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Area Chart --> */}
        <div className="col-xl-6 col-lg-7">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {" "}
                Expense Chart by Category : {expenseData.chartRangeTitle}
              </h6>
            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <Doughnut
                  data={expensesChartData}
                  height={300}
                  options={options}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
