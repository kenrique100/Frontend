import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddBirdFeedingDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    birdfeedId,
    feedingDate,
    qtyFed,
    avgBirdSize,
    animalStock,
    provenderId,
    feedingNotes,
    reduced,
    mortality
  } = data;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {birdfeedId ? "Update Feeding" : "Add New Feeding"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="feedingDate"
              value={feedingDate}
              onChange={(e) => onChange(e)}
              label="feeding Date"
              type="date"
              fullWidth
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="qtyFed"
              value={qtyFed}
              onChange={(e) => onChange(e)}
              label="Qty Fed"
              placeholder="Amount of feed given per day(kg)"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="avgBirdSize"
              value={avgBirdSize}
              onChange={(e) => onChange(e)}
              label="average size"
              placeholder="Avg size taken during last sample"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="provenderId"
              value={provenderId}
              onChange={(e) => onChange(e)}
              label="Provender Id"
              placeholder="ID of the Provender Stock  "
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="animalStock"
              value={animalStock}
              onChange={(e) => onChange(e)}
              label="animal Stock"
              placeholder="# of animal in stock"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="reduced"
              value={reduced}
              onChange={(e) => onChange(e)}
              label="reduced"
              placeholder="# of animal sold ,disposed,gifted.."
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
              label="Mortality"
              placeholder="# of animal dead"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="feedingNotes"
              value={feedingNotes}
              onChange={(e) => onChange(e)}
              label="Enter feeding notes"
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
            {birdfeedId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
