import { useParams } from "react-router-dom";
export const BirdStockDetailCard = (props) => {
  //const { data } = stockData;

  //console.log(stockData);
  const { flockId } = useParams();
  const { stockRemaining } = useParams();
  const { flockType } = useParams();
  const { nbrOfDays } = useParams();
  const { reduction } = useParams();
  const { mortality } = useParams();
  const { stockDate } = useParams();
  const { purpose } = useParams();
  //console.log(sum);fishSpecy
  return (
    <div className="row">
      {/* <!-- Content Row --> */}
      {/* <!-- Earnings (Monthly) Card Example --> */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Flock ID
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {flockId}
                </div>
              </div>
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Breed
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {flockType}
                </div>
              </div>

              <div className="col-auto">
                <i className="fas fa-barcode fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Earnings (Monthly) Card Example --> */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Stock Date
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {stockDate}
                </div>
              </div>
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  # In Stock
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {stockRemaining}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-dolly-flatbed fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Earnings (Monthly) Card Example --> */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-info shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                  Age(days)
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {nbrOfDays}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                  Purpose
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {purpose}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-clone fa-2x text-gray-300 "></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Pending Requests Card Example --> */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-warning shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Mortality
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {mortality}
                </div>
              </div>
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  # Sold
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {reduction}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-heart fa-2x text-gray-300 "></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
