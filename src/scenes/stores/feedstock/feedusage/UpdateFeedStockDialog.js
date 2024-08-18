import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateFeedStockDialog({
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
    stockRemaining,
    projectedStockQty,
    broilerFeedUsed,
    fishFeedUsed,
    duckAndFowlFeedUsed,
    pigFeedUsed,
    rabbitFeedUsed,
    otherFeedUsed,
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {feedstockId ? "Update Usage" : "Add New FeedStock"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={name}
              onChange={(e) => onChange(e)}
              label="Raw Material"
              type="text"
              fullWidth
              variant="standard"
              required={true}
              InputProps={{
                readOnly: true,
              }}
              sx={{ input: { color: "blue" } }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="stockRemaining"
              value={stockRemaining}
              onChange={(e) => onChange(e)}
              label="Stock of raw materials brought forward(Kg)"
              type="number"
              fullWidth
              variant="standard"
              required={true}
              InputProps={{
                readOnly: true,
              }}
              sx={{ input: { color: "blue" } }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="broilerFeedUsed"
              value={broilerFeedUsed}
              onChange={(e) => onChange(e)}
              label="broilerFeedUsed"
              placeholder="broilerFeedUsed"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="fishFeedUsed"
              value={fishFeedUsed}
              onChange={(e) => onChange(e)}
              label="fishFeedUsed"
              placeholder="fishFeedUsed"
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="duckAndFowlFeedUsed"
              value={duckAndFowlFeedUsed}
              onChange={(e) => onChange(e)}
              label="duckAndFowlFeedUsed"
              placeholder="duckAndFowlFeedUsed "
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="pigFeedUsed"
              value={projectedStockQty}
              onChange={(e) => onChange(e)}
              label="pigFeedUsed"
              placeholder="pigFeedUsed"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="rabbitFeedUsed"
              value={projectedStockQty}
              onChange={(e) => onChange(e)}
              label="rabbitFeedUsed"
              placeholder="rabbitFeedUsed"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="otherFeedUsed"
              value={otherFeedUsed}
              onChange={(e) => onChange(e)}
              label="Other Animal feeding"
              placeholder="other Animal Feed Usage"
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
