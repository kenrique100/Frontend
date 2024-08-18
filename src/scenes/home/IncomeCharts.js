import React, { useState, useEffect } from "react";
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

import { Line, Pie } from "react-chartjs-2";
import { HomeDetailCard } from "./HomeDetailCard";
import { ExpensesChart } from "./ExpensesCharts";
import { FarmApi } from "../../components/misc/FarmApi";
import { IncomeTable } from "./IncomeTable";
import { ExpenseTable } from "./ExpenseTable";
import { SpinnerLoading } from "../../components/utilities/SpinnerLoading";
import { InvestCharts } from "./InvestCharts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const IncomeCharts = () => {
  const [chart, setChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // default to show one month data
  const chartRange = 1;

  useEffect(() => {
    getTransactionData(chartRange);
    setIsLoading(false);
  }, []);
  const getTransactionData = (chartRange) => {
    const user = JSON.parse(localStorage.getItem("user"));
    FarmApi.getTransactionsData(user, chartRange)

      .then((response) => {
        setChart(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setHttpError(err.message + " : Contact Support or Try again later ! ");
      });
  };

  // function to reduce array of values
  function getSum(total, num) {
    return total + Math.round(num);
  }
  // get new data based on option selected
  const onChange = (e) => {
    const { value } = e.target;
    getTransactionData(value);
  };
  const defaultOptions = {
    significantDigits: 2,
    thousandsSeparator: ",",
    decimalSeparator: ".",
    symbol: "CFA",
  };

  const currencyFormatter = (value, options) => {
    if (typeof value !== "number") value = 0.0;
    options = { ...defaultOptions, ...options };
    value = value.toFixed(options.significantDigits);

    const [currency] = value.split(".");
    return `${options.symbol} ${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
    )}`;
  };
  const incomeDates = chart?.incomes?.map((x) => x.dateSold);
  const incomeAmount = chart?.incomes?.map((x) => x.amountSold);
  const paymentReceived = chart?.incomes?.map((x) => x.amountReceived);
  const paymentDue = chart?.incomes?.map((x) => x.dueBalance);
  const incomeCategories = chart?.incomeCategories?.map((x) => x);
  const salesAmounts = chart?.incomeAmounts?.map((x) => x);
  // data for income table
  const incomeTableData = chart?.incomes?.map((x) => x);

  //totals income table
  const totalAmount = currencyFormatter(chart?.incomes?.map((x) => x.amountSold).reduce(getSum, 0));
  const totalReceived = currencyFormatter(chart?.incomes?.map((x) => x.amountReceived).reduce(getSum, 0));
  const totalDue = currencyFormatter(chart?.incomes?.map((x) => x.dueBalance).reduce(getSum, 0));

  //totals expense table
  const expensesTotal = currencyFormatter(chart?.expenses?.map((x) => x.expenseAmount).reduce(getSum, 0));
  const expensesPaid = currencyFormatter(chart?.expenses?.map((x) => x.amountPaid).reduce(getSum, 0));
  const expensesDue = currencyFormatter(chart?.expenses?.map((x) => x.dueBalance).reduce(getSum, 0));


  // data for expense charts
  const chartRangeTitle = chart?.chartTitle;
  const expenseDates = chart?.expenses?.map((x) => x.expenseDate);
  const expenseAmount = chart?.expenses?.map((x) => x.expenseAmount);
  const expensesCategories = chart?.expensesCategories?.map((x) => x);

  const purchaseAmounts = chart?.expensesAmount?.map((x) => x);

  // data for expense charts
  const expenseData = {
    expenseDates,
    expenseAmount,
    expensesCategories,
    purchaseAmounts,
    chartRangeTitle,
  };
  // data for expense table
  const expenseTableData = chart?.expenses?.map((x) => x);

  // data for the dashboard card
  const investmentAmount = chart?.invest?.map((x) => x.amountDisbursed);
  const totalExpenses = chart.expenseAmount;
  const totalIncome = chart.incomeAmount;
  const investment = investmentAmount?.reduce(getSum, 0);
  const cardData = { totalIncome, totalExpenses, investment };
  //invest chart data
  const investmentDates = chart?.invest?.map((x) => x.date);
  const investmentCategories = chart?.investCategories?.map((x) => x);
  const investAmounts = chart?.investAmounts?.map((x) => x);
  const investData = {
    investmentAmount,
    investmentDates,
    investmentCategories,
    investAmounts,
    chartRangeTitle,
  };

  // Begin Sales and Expenses chart data
  var data = {
    labels: incomeDates,
    datasets: [
      {
        label: "Income",
        formatter: function (value, context) {
          return value || null;
        },
        data: incomeAmount,
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
      {
        label: "Received",
        formatter: function (value, context) {
          return value || null;
        },
        data: paymentReceived,
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
      {
        label: "Due",
        formatter: function (value, context) {
          return value || null;
        },
        data: paymentDue,
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

  var incomeChartData = {
    labels: incomeCategories,
    datasets: [
      {
        label: "Sales by Category",
        formatter: function (value, context) {
          return value || null;
        },
        data: salesAmounts,
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
  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        {httpError && (
          <h5 className=" text-danger  d-flex justify-content-center">
            {" "}
            {httpError}{" "}
          </h5>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h1 className="h3 mb-2 text-gray-800">
            {chartRangeTitle} Financial Status{" "}
          </h1>
        </div>
        <div className="col-md-6 text-right">
          <div className="d-inline-flex p-2 ">
            <select
              class="form-control pull-right"
              id="filter"
              onChange={onChange}
            >
              <option value="1">This Month</option>
              <option value="2">Last 2 Month</option>
              <option value="3">Last 3 Months</option>
              <option value="6">Last 6 Months</option>
              <option value="12">Last 12 Months</option>
              <option value="24">Last 24 Months</option>
            </select>
          </div>
        </div>
      </div>
      <HomeDetailCard cardData={cardData} />
      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-6 col-lg-7">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                {" "}
                Income by Dates: {chartRangeTitle}{" "}
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
                Income by Category: {chartRangeTitle}
              </h6>
            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <Pie data={incomeChartData} height={300} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExpensesChart expenseData={expenseData} />

      <InvestCharts investData={investData} />
      <p>
        <button
          className="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target="#expenseReport"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Expense Report
        </button>
      </p>
      <div className="collapse show" id="expenseReport">
        {/* <!-- DataTables --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Expense Report{" "}
            </h6>
            <div
          className=" py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-secondary">Expected Expenses : {expensesTotal}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Expenses Paid : {expensesPaid}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Expenses Due : {expensesDue}</h6>
        </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <ExpenseTable expenseTableData={expenseTableData} />
            </div>
          </div>
        </div>
      </div>
      <p>
        <button
          className="btn btn-primary"
          type="button"
          data-toggle="collapse"
          data-target="#incomeReport"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Income Report
        </button>
      </p>
      <div className="collapse show" id="incomeReport">
        {/* <!-- DataTables --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Income Report{" "}
            </h6>
            <div
          className=" py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-secondary">Expected Income : {totalAmount}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Total Received : {totalReceived}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Total Due : {totalDue}</h6>
        </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <IncomeTable incomeTableData={incomeTableData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
