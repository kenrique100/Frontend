import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import AddFeedingDialog from "./AddFeedingDialog";
import { FishApi } from "../../../../components/misc/FishApi";
import { SpinnerLoading } from "../../../../components/utilities/SpinnerLoading";
import { FeedingLineChart } from "./FeedingLineChart";
import { FishProvenderTable } from "../mixfeed/FishProvenderTable";
const initialValue = {
  feedingId: "",
  feedingDate: "",
  feedOut: "",
  qtyFed: "",
  fishInPond: "",
  pelletSize: "",
  reduced: "",
  mortality: "",
  provenderId: "",
  feedingNotes: "",
};
export const FishFeedingTable = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const { stockId } = useParams();
  const { fishPondName } = useParams();
  const { fishSpecy } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getFeeding();
    setIsLoading(false);
  }, []);
  const getFeeding = () => {
    FishApi.getFeedingDataByStock(user, stockId)

      .then((response) => {
        setRowData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setHttpError(
          err.response.data.status +
          " : " +
          err.response.data.message +
          " Refresh Page to try again or contact support !  "
        );
      });
  };

  const feedingDate = rowData?.map((x) => x.feedingDate);
  const avgFishSize = rowData?.map((x) => x.avgFishSize);
  const dailyRation = rowData?.map((x) => x.qtyFed);
  const fishFed = rowData?.map((x) => x.fishInPond);
  const totalQtyFed = rowData?.map((x) => x.qtyFed).reduce(getSum, 0);
  const totalSold = rowData?.map((x) => x.reduced).reduce(getSum, 0);
  const totalDead = rowData?.map((x) => x.mortality).reduce(getSum, 0);
  const fishReduced = rowData?.map((x) => x.reduced);
  const deadFish = rowData?.map((x) => x.mortality);
  const feedingChartData = {
    feedingDate, avgFishSize, dailyRation, fishFed, fishReduced,
    deadFish
  };

  // function to reduce array of values
  function getSum(total, num) {
    return total + Math.round(num);
  }
  //Page refresh
  const refresh = () => window.location.reload(true);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "feedingId", hide: true },
    { field: "provenderId" },
    { field: "feedingDate" },
    { headerName: "Qty Fed(grams)", field: "qtyFed", tooltipField: "feedingDate" },
    { headerName: "Stock", field: "fishInPond" },
    { field: "reduced" },
    { field: "mortality" },
    { field: "pelletSize" },
    { field: "feedingNotes", tooltipField: "feedingNotes" },
    {
      headerName: "Actions",
      field: "feedingId",
      filter: false,
      cellRenderer: (params) => (
        <div>
          <Tooltip title="Update">
            <Button
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleUpdate(params.data)}
            ></Button>
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={() => handleDelete(params.value)}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ]);
  const handleFormSubmit = () => {
    if (formData.feedingId) {
      //updating a feeding record
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        FishApi.updateFeeding(user, formData.feedingId, formData)
          .then(() => {
            //console.log(response.data)
            handleClose();
            getFeeding();
            refresh();
          })
          .catch((err) => {
            setIsLoading(false);
            setHttpError(
              err.response.data.status +
              " : " +
              err.response.data.message +
              " Refresh Page to try again or contact support !  "
            );
          });
    } else {
      // adding new feeding
      FishApi.createFeeding(user, stockId, formData)
        .then(() => {
          handleClose();
          getFeeding();
          refresh();
        })
        //.then(chart => setChart(chart))
        .catch((err) => {
          setIsLoading(false);
          setHttpError(
            err.response.data.status +
            " : " +
            err.response.data.message +
            " Refresh Page to try again or contact support !  "
          );
        });
    }
  };
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  //deleting a feeding record
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this record ?",
      id
    );
    if (confirm) {
      FishApi.deleteFeeding(user, id)
        .then(() => {
          getFeeding();
          refresh();
        })
        .catch((err) => {
          setIsLoading(false);
          setHttpError(
            err.response.data.status +
            " : " +
            err.response.data.message +
            " Refresh Page to try again or contact support !  "
          );
        });
    }
  };
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    floatingFilter: true,
    filter: true,
    flex: 1,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => { }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
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
      <FeedingLineChart feedingChartData={feedingChartData} />
      {/* Example using Grid's API */}
      <div className="card shadow mb-4">
        <div
          className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">  Feeding Reports for Stock ID {stockId} . Breed: {fishSpecy} in {fishPondName}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Total Qty Fed (kgs) : {totalQtyFed / 1000}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Total Reduced/Sold : {totalSold}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Mortality(total) : {totalDead}</h6>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              startIcon={<AddOutlinedIcon />}
            >
              Add Feeding Record
            </Button>

            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
            <div
              className="ag-theme-alpine"
              style={{ width: "100%", height: 500 }}
            >
              <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection="multiple" // Options - allows click selection of rows
                enableBrowserTooltips={true}
                pagination={true}
                onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              />
            </div>
          </div>
          <Button
            align="right"
            variant="outlined"
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={buttonListener}
          >
            Export
          </Button>
        </div>
      </div>

      <AddFeedingDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
      <FishProvenderTable />
    </div>
  );
};
