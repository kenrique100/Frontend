import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddPondDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const { pondId, pondName, area, targetFishType} = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{pondId ? "Update Pond" : "Add New Pond"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="pondName"
              value={pondName}
              onChange={(e) => onChange(e)}
              label="Pond Name"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="area"
              value={area}
              onChange={(e) => onChange(e)}
              label="Pond Area"
              placeholder="In cubic meter"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="targetFishType"
              value={targetFishType}
              onChange={(e) => onChange(e)}
              label="Fish Type"
              placeholder="e.g. Clarias "
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
            {pondId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
