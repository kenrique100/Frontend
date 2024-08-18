export const HomeDetailCard = ({ cardData }) => {
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

  const balance = currencyFormatter(
    cardData.totalIncome - cardData.totalExpenses
  );
  const investment = currencyFormatter(cardData.investment);
  return (
    <div className="row">
      {/* <!-- Content Row --> */}
      {/* <!-- Earnings (Monthly) Card Example --> */}
      <div className="col-xl-3 col-md-6 mb-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Total Income
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {currencyFormatter(cardData.totalIncome)}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-bell fa-2x text-gray-300"></i>
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
                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                  Total Expenses
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {currencyFormatter(cardData.totalExpenses)}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-bell-slash fa-2x text-gray-300"></i>
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
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  Net Balance
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {balance}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-balance-scale fa-2x text-gray-300 "></i>
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
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                  Investment since June 2023
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {investment}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-archway fa-2x text-gray-300 "></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
