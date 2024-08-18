import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddSamplingDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    samplingId,
    fishSpecy,
    sampleDate,
    sampleQty,
    totalSampleWeight,
    targetSize,
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {samplingId ? "Update Sample" : "Add New Sample"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="sampleDate"
              value={sampleDate}
              onChange={(e) => onChange(e)}
              label="Sample Date"
              type="date"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="fishSpecy"
              value={fishSpecy}
              onChange={(e) => onChange(e)}
              label="fish Specy"
              placeholder="Type of fish"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="sampleQty"
              value={sampleQty}
              onChange={(e) => onChange(e)}
              label="Sample Qty"
              placeholder="# of fish used in the sample"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="totalSampleWeight"
              value={totalSampleWeight}
              onChange={(e) => onChange(e)}
              label="total Sample Weight"
              placeholder="total weight of the sample"
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="targetSize"
              value={targetSize}
              onChange={(e) => onChange(e)}
              label="target Size"
              placeholder="target weight based on  projections"
              type="number"
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
            {samplingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
