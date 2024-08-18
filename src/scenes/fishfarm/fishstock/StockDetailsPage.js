import { useParams } from "react-router-dom";
import { SamplingTable } from "./SamplingTable";
import { FishFeedingTable } from "./fishFeed/FishFeedingTable";
import { StockDetailCard } from "./StockDetailCard";

export const StockDetailsPage = () => {
  const { stockId } = useParams();
  const { pondUsed } = useParams();
  const { stockRemaining } = useParams();
  const stockDetails = { stockId, pondUsed, stockRemaining };
  return (
    <div>
      {/* <!-- Page Heading --> */}
      <h4 className="h4 mb-2 text-gray-800">
        {" "}
        Detail Report : fishstock ID # {stockId}{" "}
      </h4>
      <StockDetailCard stockData={stockDetails} />

      <div className="container-fluid">
        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#sampleReport"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Sample Report
          </button>
        </p>
        <div className="collapse " id="sampleReport">
          {/* <!-- DataTables --> */}
          <div className="card  mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Fish Sample Report{" "}
              </h6>
            </div>
            <SamplingTable />
            
          </div>
        </div>

        <FishFeedingTable />
      </div>
    </div>
  );
};
