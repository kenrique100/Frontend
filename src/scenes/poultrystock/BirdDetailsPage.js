import { BirdFeedingTable } from "./BirdFeedingTable";


export const BirdDetailsPage = () => {
  return (
    <div>
      {/* <!-- Page Heading --> */}
      <h2 className="h3 mb-2 text-gray-800">Flock Detail Report</h2>
      <div className="container-fluid">
        <BirdFeedingTable />
       
        
      </div>
    </div>
  );
};
