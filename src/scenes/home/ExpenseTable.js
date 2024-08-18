import React, { useState, useRef,  useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Tooltip from "@mui/material/Tooltip";
import { TransactionsApi } from '../../components/misc/TransactionsApi';
import { Button } from "@mui/material";
import AddExpenseDialog from './AddExpenseDialog';

const initialValue = { expenseId:"",type: "", reason: "", 
expenseAmount: "", expenseDate: "",paidBy:"", dueBalance:"",
qtyPurchase:"", amountPaid:"", paidTo:"" };


export const ExpenseTable = ({ expenseTableData }) => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const rowData = expenseTableData
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  
  const [httpError, setHttpError] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: "expenseId", hide: true },
    { headerName: "Category",field: 'type' },
    { field: 'reason' },
    { headerName: "Date", field: 'expenseDate'},
    { headerName: " Amount", field: 'expenseAmount', tooltipField: "dueBalance" },
    { field: 'qtyPurchase', hide: true},
    { headerName: " Paid", field: 'amountPaid' },
    { field: 'dueBalance' },
    { field: 'paidTo' },
    { field: 'paidBy' },    {
      headerName: "Actions",
      field: "expenseId",
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
  //Page refresh
  const refresh = () => window.location.reload(true);

  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a pond
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
      TransactionsApi.updateExpense(user, formData.id, formData)
          .then((response) => {
            //console.log(response.data)
            refresh()
            //handleClose();
            
          })
          .catch((err) => {
            setHttpError(
              err.message + " : Contact Support or Try again later ! "
            );
          });
    } else {
      // adding new 
      TransactionsApi.createExpense(user, formData)
        .then(() => {
          refresh()
          
        })
        .catch((err) => {
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
      "Are you sure, you want to delete this expense ?",
      id
    );
    if (confirm) {
      TransactionsApi.deleteExpense(user, id)
        .then(() => {
       
           refresh()
        })
        .catch((err) => {
         // console.log(err.response.data);
          setHttpError(
            err.response.data.status + " : " + err.response.data.message + " : Contact Support or Try again later !  "
          );
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
   // refresh()
  }; 
  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    floatingFilter: true,
    filter: true,
    flex: 2
  }));
// Example using Grid's API
const buttonListener = useCallback((e) => {
  gridRef.current.api.exportDataAsCsv();
}, []);
const onChange = (e) => {
  const { value, id } = e.target;

  setFormData({ ...formData, [id]: value });
};

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

      {/* Example using Grid's API */}
      <Button
                variant="outlined"
                onClick={handleClickOpen}
                startIcon={<AddOutlinedIcon />}
              >
                Add New Expense
              </Button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ width: '100%', height: 600 }}>

        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
          enableBrowserTooltips={true}
          pagination={true}
        />
      </div>

      <Button align="right" variant="outlined" startIcon={<FileDownloadOutlinedIcon />}
        onClick={buttonListener}>Export</Button>
        <AddExpenseDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />

    </div>

  );

}
