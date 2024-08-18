import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddEmpDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const { empId, fname, lname, telNumber, dateHired,email,jobDescription,jobTitle } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{empId ? "Update Employee" : "Add New Employee"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="fname"
              value={fname}
              onChange={(e) => onChange(e)}
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="lname"
              value={lname}
              onChange={(e) => onChange(e)}
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="telNumber"
              value={telNumber}
              onChange={(e) => onChange(e)}
              label="Mobile #"
              placeholder="+ Country Code + Number"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="dateHired"
              value={dateHired}
              onChange={(e) => onChange(e)}
              label="Date Hired"
              placeholder="Date Hired"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              value={email}
              onChange={(e) => onChange(e)}
              label="email"
              placeholder="email address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => onChange(e)}
              label="Job Title"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => onChange(e)}
              label="Job Description"
              type="text"
              fullWidth
              multiline
              rows={"3"}
              variant="standard"
              required={true}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => handleFormSubmit()}>
            {empId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
