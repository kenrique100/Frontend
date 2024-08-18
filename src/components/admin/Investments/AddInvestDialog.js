import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddInvestDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    investmentId,
    type,
    date,
    reference,
    amountDisbursed,
    origin,
    destination,
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {investmentId ? "Update Investment" : "Add Investment"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="type"
              value={type}
              onChange={(e) => onChange(e)}
              label="type"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="date"
              value={date}
              onChange={(e) => onChange(e)}
              label="date "
              placeholder="Date Format"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="reference"
              value={reference}
              onChange={(e) => onChange(e)}
              label="reference"
              placeholder="Transfer or Bank reference "
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="amountDisbursed"
              value={amountDisbursed}
              onChange={(e) => onChange(e)}
              label="amountDisbursed"
              placeholder="amount Disbursed"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="origin"
              value={origin}
              onChange={(e) => onChange(e)}
              label="origin"
              placeholder="who made the investment "
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="destination"
              value={destination}
              onChange={(e) => onChange(e)}
              label="destination"
              placeholder="who received the money"
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
            {investmentId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
