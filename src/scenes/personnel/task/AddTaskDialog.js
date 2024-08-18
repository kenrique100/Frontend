import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddTaskDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    taskId,
    enteredTitle,
    enteredDescription,
    enteredDate,
    priority,
    completed,
    assignedTo,
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{taskId ? "Update Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="enteredTitle"
              value={enteredTitle}
              onChange={(e) => onChange(e)}
              label="Task Title"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="enteredDescription"
              value={enteredDescription}
              onChange={(e) => onChange(e)}
              label="Task Description"
              type="text"
              fullWidth
              multiline
              rows={"3"}
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="enteredDate"
              value={enteredDate}
              onChange={(e) => onChange(e)}
              label="Task Date"
              placeholder="Date Format"
              type="date"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="priority"
              value={priority}
              onChange={(e) => onChange(e)}
              label="priority"
              placeholder="true/false "
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="completed"
              value={completed}
              onChange={(e) => onChange(e)}
              label="completed"
              placeholder="true/false "
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => onChange(e)}
              label="assignedTo"
              placeholder="Enter Employee last name "
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => handleFormSubmit()}>
            {taskId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
