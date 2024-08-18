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
import { Button } from "@mui/material";
import { SpinnerLoading } from "../../utilities/SpinnerLoading";
import { TransactionsApi } from "../../misc/TransactionsApi";
import AddInvestDialog from "./AddInvestDialog";

const initialValue = {
  investmentId: "",
  type: "",
  balance: "",
  date: "",
  reference: "",
  dueBalance: "",
  qtySold: "",
  amountDisbursed: "",
  origin: "",
  destination : ""  
};

export const InvestDashBoard = () => {
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
    getInvestment();
    setIsLoading(false);
  }, [getInvestment]);
  const getInvestment = () => {
    TransactionsApi.getInvestments(user)
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

 
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "investmentId", hide: true },
    { field: "type" },
    { field: "date" },
    { headerName: "Ref #",field: "reference" },
    { headerName: "Disbursed", field: "amountDisbursed", tooltipField: "destination" },
  
    { field: "origin" },
    { headerName: "Received By", field: "destination" },
    {
      headerName: "Actions",
      field: "investmentId",
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
    if (formData.id) {
      //updating a pond
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
      TransactionsApi.updateExpense(user, formData.id, formData)
          .then((response) => {
            handleClose();
            getInvestment();
          })
          .catch((err) => {
            setIsLoading(false);
            setHttpError(
              err.message + " : Contact Support or Try again later ! "
            );
          });
    } else {
      // adding new 
      TransactionsApi.createInvestment(user, formData)
        .then(() => {
          handleClose();
          getInvestment();
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
      TransactionsApi.deleteInvestment(user, id)
        .then((response) => {
        console.log(response)
          getInvestment();
          // refresh()
        })
        .catch((err) => {
         // console.log(err.response.data);
          setIsLoading(false);
          setHttpError(
            err.response.data.status + " : " + err.response.data.message + " : Contact Support or Try again later !  "
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
  }), []);

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
    <div >
      {/* <!-- Begin Page Content --> */}

     
        <p className="mb-4"></p>

       
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Investments Records</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {/* Example using Grid's API */}
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<AddOutlinedIcon />}
              >
                Add New Investment
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
              <AddInvestDialog
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
  );
};
