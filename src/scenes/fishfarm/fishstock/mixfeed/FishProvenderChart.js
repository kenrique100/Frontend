
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';

import { Line } from 'react-chartjs-2';
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const FishProvenderChart = ({ mixedFeedChartData }) => {
  const { stockId } = useParams();
  const {fishPondName} = useParams();
  const {fishSpecy} = useParams();
  var data = {
    labels: mixedFeedChartData?.labels,
    datasets: [{
      label: 'Qty Prepared(grams)',
      formatter: function (value, context) { return value || null; },
      data: mixedFeedChartData?.qtyPrepared,
      fill: false,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 1
    },
    {
      label: 'Cost-CFA',
      formatter: function (value, context) { return value || null; },
      data: mixedFeedChartData?.provenderCost,
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 1
    }
    ]
  };
  // End sales and expense chart data

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    skipNull: true,
    scales: {

    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }
  return (
    <div>
      <div className="row">

        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-7">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div
              className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary"> Provender Usage for Stock ID {stockId}. Breed: {fishSpecy} in {fishPondName}</h6>
              <h6 className="m-0 font-weight-bold text-secondary">Total Qty Prepared(Kgs) : {mixedFeedChartData?.totalQtyPrepared/1000}</h6>
              <h6 className="m-0 font-weight-bold text-secondary">Total Cost-CFA : {mixedFeedChartData?.totalCost}</h6>
              <h6 className="m-0 font-weight-bold text-secondary">Total Qty Consummed(Kgs) : {mixedFeedChartData?.totalQtyConsummed/1000}</h6>

            </div>

            {/* <!-- Card Body --> */}
            <div className="card-body">
              <div className="chart-area">
                <Line

                  data={data}
                  height={300}
                  options={options}

                />
              </div>
            </div>
          </div>
        </div>

      </div>







    </div>
  )
}

