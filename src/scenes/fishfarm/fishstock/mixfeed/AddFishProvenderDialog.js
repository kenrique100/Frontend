import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddFishProvenderDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    batchId,
    batchDate,
    qtyPrepared,
    cost,
    totalcpContent,
    totalEnergyContent,
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {batchId ? "Update Provender" : "Add New Provender"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="qtyPrepared"
              value={qtyPrepared}
              onChange={(e) => onChange(e)}
              label="Qty Prepared"
              type="number"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="batchDate"
              value={batchDate}
              onChange={(e) => onChange(e)}
              label=" Date Prepared"
              placeholder="Date Format"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="cost"
              value={cost}
              onChange={(e) => onChange(e)}
              label="Cost"
              type="number"
              placeholder="Production or purchase cost"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="totalcpContent"
              value={totalcpContent}
              onChange={(e) => onChange(e)}
              label="totalcpContent"
              placeholder="Feed Protein Content "
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="totalEnergyContent"
              value={totalEnergyContent}
              onChange={(e) => onChange(e)}
              label="totalEnergyContent"
              placeholder="Feed Enery Content "
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
            {batchId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
