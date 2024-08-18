import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddStockDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    stockId,
    fishSpecy,
    stockDate,
    mortality,
    totalStock,
    fishPondName,
    purpose,
    reduction,
    batch,
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{stockId ? "Update Stock" : "Add New Stock"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="fishSpecy"
              value={fishSpecy}
              onChange={(e) => onChange(e)}
              label="fishSpecy"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />

            <TextField
              autoFocus
              margin="dense"
              id="stockDate"
              value={stockDate}
              onChange={(e) => onChange(e)}
              label="stock Date"
              placeholder="Date Format"
              type="date"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="totalStock"
              value={totalStock}
              onChange={(e) => onChange(e)}
              label="Total Stock"
              placeholder="Total # of fish added to the pond "
              type="number"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="reduction"
              value={reduction}
              onChange={(e) => onChange(e)}
              label="Sold or Removed"
              placeholder="# of birds sold, removed from stock "
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="mortality"
              value={mortality}
              onChange={(e) => onChange(e)}
              label="mortality"
              placeholder="Dead Fish "
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="fishPondName"
              value={fishPondName}
              onChange={(e) => onChange(e)}
              label="Pond Name"
              placeholder="Enter the name of the Pond being used for this stock"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="purpose"
              value={purpose}
              onChange={(e) => onChange(e)}
              label="purpose"
              type="text"
              fullWidth
              placeholder="i.e : meat,parent stock, reproduction ..."
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
            {stockId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
