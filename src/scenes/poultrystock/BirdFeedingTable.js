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
import { PoultryApi } from "../../components/misc/PoultryApi";
import { SpinnerLoading } from "../../components/utilities/SpinnerLoading";
import { BirdFeedingLineChart } from "./BirdFeedingLineChart";
import AddBirdFeedingDialog from "./AddBirdFeedingDialog";
import { BirdProvenderTable } from "./mixfeed/BirdProvenderTable";
const initialValue = {
  birdfeedId: "",
  feedingDate: "",
  qtyFed: "",
  animalStock: "",
  provenderId: "",
  avgBirdSize: "",
  reduced: "",
  mortality: "",
  feedingNotes: ""
};
export const BirdFeedingTable = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const { flockId } = useParams();
  const { flockType } = useParams();
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
    PoultryApi.getFeedingDataByFlock(user, flockId)

      .then((response) => {
        setRowData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setHttpError(err.message + " : Contact Support or Try again later ! ");
      });
  };

  const feedingDate = rowData?.map((x) => x.feedingDate);
  const avgBirdSize = rowData?.map((x) => x.avgBirdSize);
  const dailyRation = rowData?.map((x) => x.qtyFed);
  const animalFed = rowData?.map((x) => x.animalStock);
  const totalQtyFed = rowData?.map((x) => x.qtyFed).reduce(getSum, 0);
  const totalSold = rowData?.map((x) => x.reduced).reduce(getSum, 0);
  const totalDead = rowData?.map((x) => x.mortality).reduce(getSum, 0);
  const animalReduced = rowData?.map((x) => x.reduced);
  const deadAnimal = rowData?.map((x) => x.mortality);
  const feedingChartData = {
    feedingDate, avgBirdSize, dailyRation, animalFed, animalReduced,
    deadAnimal
  };

  // function to reduce array of values
  function getSum(total, num) {
    return total + Math.round(num);
  }
  //Page refresh
  const refresh = () => window.location.reload(true);
  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "birdfeedId", hide: true },
    { field: "provenderId" },
    { field: "feedingDate" },
    { field: "qtyFed", tooltipField: "feedingDate" },
    { headerName: "Avg Size", field: "avgBirdSize" },
    { headerName: "Stock", field: "animalStock" },
    { field: "reduced" },
    { field: "mortality" },
    { field: "feedingNotes", tooltipField: "feedingNotes" },
    {
      headerName: "Actions",
      field: "birdfeedId",
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
    if (formData.birdfeedId) {
      //updating a feeding record
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        PoultryApi.updateFlockFeeding(user, formData.birdfeedId, formData)
          .then(() => {
            //console.log(response.data)
            handleClose();
            getFeeding();
            refresh()
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
      PoultryApi.createFlockFeeding(user, flockId, formData)
        .then(() => {
          handleClose();
          getFeeding();
          refresh()
        })
        //.then(chart => setChart(chart))
        .catch((err) => {
          setIsLoading(false);
          setHttpError(
            err.response.data.status +
            " : " +
            err.response.data.message +
            "Refresh Page to try again or contact support !  "
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
      PoultryApi.deleteFlockFeeding(user, id)
        .then(() => {
          getFeeding();
          refresh()
        })
        .catch((err) => {
          setIsLoading(false);
          setHttpError(
            err.message + "Refresh Page to try again or contact support !  "
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
    <div className="container-fluid">
      {/* <!-- Begin Page Content --> */}
      <BirdFeedingLineChart feedingChartData={feedingChartData} />

      {/* <!-- Page Heading --> */}
      <h1 className="h3 mb-2 text-gray-800">Feeding Record</h1>
      <div className="card shadow mb-4">
        <div
          className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary"> Feeding Reports for Flock ID {flockId}. Breed: {flockType}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Total Qty Fed (kgs) : {totalQtyFed}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Total Reduced/Sold : {totalSold}</h6>
          <h6 className="m-0 font-weight-bold text-secondary">Mortality(total) : {totalDead}</h6>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            {/* Example using Grid's API */}
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
              style={{ width: "100%", height: 450 }}
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

            <Button
              align="right"
              variant="outlined"
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={buttonListener}
            >
              Export
            </Button>
            <AddBirdFeedingDialog
              open={open}
              handleClose={handleClose}
              data={formData}
              onChange={onChange}
              handleFormSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>
      <BirdProvenderTable />
    </div>
  );
};
