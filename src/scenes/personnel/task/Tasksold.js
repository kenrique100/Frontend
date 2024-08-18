import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import { Sidebar } from '../../../components/navigation/SideBar';
import { MainNav } from '../../../components/navigation/MainNav';
import { Footer } from '../../../components/navigation/Footer';
import { TasksMenu } from './TasksMenu';
import AddTaskDialog from './AddTaskDialog';
const initialValue = {
    enteredTitle: "", enteredDescription: "", enteredDate: "", priority: "", completed: "",
    assignedTo: ""
};

export const TasksOld = () => {
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialValue)
    const [errorMessage, setErrorMessage] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };
    const totalTasks = rowData.map(x => x.taskId);
    const assignedTasks = rowData.filter(x => x.assignedTo !== null);
    const completedTasks = rowData.filter(x => x.completed===true)
   
   
    const taskMenuData = { totalTasks, assignedTasks, completedTasks }

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue)
    };
    

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'taskId', hide: true },
        { field: 'assignedTo' },
        { headerName: "Task", field: 'enteredTitle', tooltipField: "enteredDescription"},
        { headerName: "Description", field: 'enteredDescription', tooltipField: "enteredDescription"},
        { field: 'enteredDate' },
        { field: 'priority', flex: 1 },
        { field: 'completed', flex: 1 },
        
        {
            headerName: "Actions", field: 'taskId', filter: false, cellRenderer: (params) => <div>
                <Tooltip title="Update" >
                    <Button
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => handleUpdate(params.data)}>
                    </Button>
                </Tooltip>

                <Tooltip title="Delete" >
                    <Button color="error"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => handleDelete(params.value)}>
                    </Button>
                </Tooltip>
            </div>
        }]);

    const handleFormSubmit = () => {
        if (formData.taskId) {
            console.log(formData.taskId)
            //updating a stock 
            const confirm = window.confirm("Are you sure, you want to update this row ?")
            confirm && fetch(url + `/${formData.taskId}`, {
                method: "PUT", body: JSON.stringify(formData), headers: {
                    'content-type': "application/json"
                }
            }).then(resp => resp.json())
                .then(resp => {
                    handleClose()
                    getTasks()
                })
        } else {
            // adding new stock
            fetch(url, {
                method: "POST", body: JSON.stringify(formData), headers: {
                    'content-type': "application/json"
                }
            }).then(resp => resp.json())
                .then(resp => {
                    handleClose()
                    getTasks()
                })
        }
    }
    // setting update row data to form data and opening pop up window
    const handleUpdate = (oldData) => {
        setFormData(oldData)
        handleClickOpen()
    }

    //deleting a pond
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure, you want to delete this task record ?", id)
        if (confirm) {
            fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getTasks())
            

        }
    }
    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        floatingFilter: true,
        filter: true,
        flex: 2,
        resizable: true,
    initialWidth: 200,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        // console.log('cellClicked', event);
    }, []);

    // load data from server
    const url = 'http://localhost:8080/kbf/api/1.0/task' 
    useEffect(() => {
        getTasks()
    }, []);
    const getTasks = () => {
        setIsLoading(true);
        fetch(url).then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Something went wrong');
          })
          .then(rowData => setRowData(rowData))
          .catch((err) => {
            setErrorMessage(err.message + " : Data API not reachable! ")
          });
    }
    
    // Example using Grid's API
    const buttonListener = useCallback(e => {
        gridRef.current.api.exportDataAsCsv();
    }, []);
    const onChange = (e) => {
        const { value, id } = e.target
        setFormData({ ...formData, [id]: value })
    }
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" >
                <div id="content">

                    <MainNav />
                    {errorMessage && <h5 className=" text-danger  d-flex justify-content-center"> {errorMessage} </h5>}
                 
                </div>
                <div className="container-fluid">
                    {/* <!-- Page Heading --> */}
                    <h1 className="h3 mb-2 text-gray-800"></h1>
                    <p className="mb-4"> TASKINGS
                    </p>
                    
               
                    {/* <!-- Begin Page Content --> */}
                     <TasksMenu taskMenuData={taskMenuData} /> 
                        {/* <!-- DataTales Example --> */}
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary"> Kombe Farm ToDo List</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">

                                    {/* Example using Grid's API */}
                                    <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddOutlinedIcon />}>Add New Task</Button>


                                    {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                                    <div className="ag-theme-alpine" style={{ width: '100%', height: 300 }}>

                                        <AgGridReact
                                            ref={gridRef} // Ref for accessing Grid's API

                                            rowData={rowData} // Row Data for Rows

                                            columnDefs={columnDefs} // Column Defs for Columns
                                            defaultColDef={defaultColDef} // Default Column Properties

                                            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                            rowSelection='multiple' // Options - allows click selection of rows
                                            enableBrowserTooltips={true}
                                            onCellClicked={cellClickedListener} 
                                            
                                        />
                                    </div>

                                    <Button align="right" variant="outlined" startIcon={<FileDownloadOutlinedIcon />}
                                        onClick={buttonListener}>Export</Button>
                                    
                                    <AddTaskDialog
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
                <Footer />
            </div>
        </div>
    );
}
