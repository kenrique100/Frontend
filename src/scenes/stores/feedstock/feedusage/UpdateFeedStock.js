import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import { FarmSuppliesApi } from "../../../../components/misc/FarmSuppliesApi";
import { Button } from "@mui/material";
import { SpinnerLoading } from "../../../../components/utilities/SpinnerLoading";

import AddFeedStockDialog from "../AddFeedStockDialog";
import { UpdateFeedStockCharts } from "./UpdateFeedStockCharts";
import UpdateFeedStockDialog from "./UpdateFeedStockDialog";
const initialValue = {
  feedstockId: "",
  name: "",
  unitPrice: "",
  qtyBought: "",
  qtyUsed: "",
  cpContent: "",
  energyContent: "",
  stockDate: "",
  stockRemaining: "",
  inStockQty: "",
  projectedStockQty: "",
  broilerFeedUsed: "",
  fishFeedUsed: "",
  duckAndFowlFeedUsed: "",
  pigFeedUsed: "",
  rabbitFeedUsed: "",
  otherFeedUsed: "",
};
export const UpdateFeedStock = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getFeedStock();
    setIsLoading(false);
  }, []);
  const getFeedStock = () => {
    FarmSuppliesApi.getFeedStock(user)

      .then((response) => {
        setRowData(response.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setHttpError(
          err.message + " : Data API not reachable! Try again later! "
        );
      });
  };

  const qtyInStock = rowData.map((x) => x.inStockQty);
  const qtyUsed = rowData.map((x) => x.qtyUsed);
  const qtyRemaining = rowData.map((x) => x.stockRemaining);
  const qtyProjected = rowData.map((x) => x.projectedStockQty);
  const broilerFeedUsed = rowData.map((x) => x.broilerFeedUsed);
  const fishFeedUsed = rowData.map((x) => x.fishFeedUsed);
  const duckAndFowlFeedUsed = rowData.map((x) => x.duckAndFowlFeedUsed);
  const pigFeedUsed = rowData.map((x) => x.pigFeedUsed);
  const rabbitFeedUsed = rowData.map((x) => x.rabbitFeedUsed);
  const otherFeedUsed = rowData.map((x) => x.otherFeedUsed);
  const labels = rowData.map((x) => x.name);
  const feedStockCharts = {
    qtyInStock,
    labels,
    qtyUsed,
    qtyRemaining,
    qtyProjected,
    broilerFeedUsed,
    fishFeedUsed,
    duckAndFowlFeedUsed,
    pigFeedUsed,
    rabbitFeedUsed,
    otherFeedUsed,
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  //Page refresh
  const refresh = () => window.location.reload(true);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "feedstockId", hide: true },
    { headerName: "Material", field: "name" },
    { headerName: "Broiler", field: "broilerFeedUsed" },

    { headerName: "Fish", field: "fishFeedUsed" },
    { headerName: "Ducks&Local", field: "duckAndFowlFeedUsed" },
    { headerName: "Pig", field: "pigFeedUsed" },
    { headerName: "Rabbit", field: "rabbitFeedUsed" },
    { headerName: "Others", field: "otherFeedUsed" },

    {
      headerName: "Actions",
      field: "feedstockId",
      filter: false,
      cellRenderer: (params) => (
        <div>
          <Tooltip title="Update Usage">
            <Button
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleUpdate(params.data)}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ]);

  const handleFormSubmit = () => {
    if (formData.feedstockId) {
      //updating a stock
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        FarmSuppliesApi.updateFeedStockUsage(
          user,
          formData.feedstockId,
          formData
        )
          .then(() => {
            handleClose();
            getFeedStock();
          })
          .catch((err) => {
            setIsLoading(false);
            setHttpError(
              err.message + " : Contact Support or Try again later ! "
            );
          });
    } else {
      // adding new pond
      FarmSuppliesApi.createFeedStock(user, formData)
        .then(() => {
          handleClose();
          getFeedStock();
        })
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

  //deleting a pond
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this pond ?",
      id
    );
    if (confirm) {
      FarmSuppliesApi.deleteFeedStock(user, id)
        .then(() => {
          getFeedStock();
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
    // console.log('cellClicked', event);
  }, []);
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

      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-2 text-gray-800">Feed Stock Usage</h1>
        <p className="mb-4">Stock of raw materials usage by animal group</p>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Usage Record</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {/* Example using Grid's API */}

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
              <UpdateFeedStockDialog
                open={open}
                handleClose={handleClose}
                data={formData}
                onChange={onChange}
                handleFormSubmit={handleFormSubmit}
              />
            </div>
          </div>
        </div>
      </div>
      <UpdateFeedStockCharts feedStockCharts={feedStockCharts} />
    </div>
  );
};
