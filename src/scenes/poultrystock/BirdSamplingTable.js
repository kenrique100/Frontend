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
import AddBirdSamplingDialog from "./AddBirdSamplingDialog";
import { BirdSamplingLineChart } from "./BirdSampleLineChart";


const initialValue = {
  samplingId: "",
  birdType: "",
  sampleDate: "",
  sampleQty: "",
  totalSampleWeight: "",
  avgBirdSize: "",
  targetSize: "",
};
export const BirdSamplingTable = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const { flockId } = useParams();
  const {flockType} = useParams();

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
    getSample();
    setIsLoading(false);
  }, []);
  const getSample = () => {
    PoultryApi.getSamplingDataByFlock(user, flockId)

      .then((response) => {
        setRowData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setHttpError(err.message + " : Contact Support or Try again later ! ");
      });
  };
  const samplingTable = rowData?.map((x) => x.sampleDate);
  const avgBirdSize = rowData?.map((x) => x.avgBirdSize);
  const targetSize = rowData?.map((x) => x.targetSize);

  const sampleChartData = { samplingTable, avgBirdSize, targetSize };
  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "samplingId", hide: true },
    { field: "birdType" },
    { field: "sampleDate" },
    { field: "sampleQty", tooltipField: "sampleDate" },
    { field: "totalSampleWeight" },
    { field: "avgBirdSize" },
    { field: "targetSize" },
    {
      headerName: "Actions",
      field: "samplingId",
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
    if (formData.samplingId) {
      //updating a sample record
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
       PoultryApi.updateFlockSample(user, formData.samplingId, formData,flockType)
          .then(() => {
            handleClose();
            getSample();
          })
          .catch((err) => {
            setIsLoading(false);
            setHttpError(
              err.message + " : Contact Support or Try again later ! "
            );
          });
    } else {
      // adding new sample
      PoultryApi.createFlockSample(user, flockId, formData,flockType)
        .then(() => {
          handleClose();
          getSample();
        })
        //.then(chart => setChart(chart))
        .catch((err) => {
          setIsLoading(false);
          setHttpError(
            err.message + " : Contact Support or Try again later ! "
          );
        });
    }
  };
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };

  //deleting a sampling record
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this record ?",
      id
    );
    if (confirm) {
      PoultryApi.deleteFlockSample(user, id)
        .then(() => {
          getSample();
          // refresh()
        })
        .catch((err) => {
          setIsLoading(false);
          setHttpError(
            err.message + " : Contact Support or Try again later !  "
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
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
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
      <BirdSamplingLineChart sampleChartData={sampleChartData} />
      {/* Example using Grid's API */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Sampling Reports for Stock ID {flockId}. Breed: {flockType}
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              startIcon={<AddOutlinedIcon />}
            >
              Add Sampling Record
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
      <AddBirdSamplingDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};
