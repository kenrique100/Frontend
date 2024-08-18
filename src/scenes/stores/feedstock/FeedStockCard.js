export const FeedStockCard = ({ taskMenuData }) => {
  //const { data } = stockData;

  //console.log(stockData);
  const totalTasks = taskMenuData.totalTasks.length;
  const assignedTasks = taskMenuData.assignedTasks.length;
  const completedTasks = taskMenuData.completedTasks.length;
  const pendingTasks = totalTasks - completedTasks;
  //console.log(sum);
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
                  Total Feed Stock Value
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {totalTasks}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-water fa-2x text-gray-300"></i>
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
                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                  Assigned
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {assignedTasks}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-fish fa-2x text-gray-300"></i>
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
                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                  Completed
                </div>
                <div className="row no-gutters align-items-center">
                  <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {completedTasks}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-angry fa-2x text-gray-300 "></i>
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
                  Pending
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {pendingTasks}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-fish fa-2x text-gray-300 "></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
