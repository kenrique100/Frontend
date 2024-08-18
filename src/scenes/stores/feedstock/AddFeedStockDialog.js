import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddFeedStockDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    feedstockId,
    name,
    unitPrice,
    inStockQty,
     qtyUsed,
    cpContent,
    energyContent,
    stockDate,
    projectedStockQty,
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {feedstockId ? "Update FeedStock" : "Add New FeedStock"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={name}
              onChange={(e) => onChange(e)}
              label="Raw Material. i.e: corn"
              type="text"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="unitPrice"
              value={unitPrice}
              onChange={(e) => onChange(e)}
              label="Unit Price"
              type="text"
              fullWidth
              rows={"3"}
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="inStockQty"
              value={inStockQty}
              onChange={(e) => onChange(e)}
              label="qtyBought"
              placeholder="qtyBought"
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
            {feedstockId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
