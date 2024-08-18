import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddFlockDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    flockId,
    nbrOfBirds,
    purpose,
    reduction,
    flockType,
    stockDate,
    mortality,
    batch,
  } = data;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{flockId ? "Update Flock" : "Add New Flock"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="flockType"
              value={flockType}
              onChange={(e) => onChange(e)}
              label="flockType"
              type="text"
              fullWidth
              placeholder="i.e : Broiler, Layers, Duck, Bhrama, Country Fowl ..."
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
            />
            <TextField
              autoFocus
              margin="dense"
              id="nbrOfBirds"
              value={nbrOfBirds}
              onChange={(e) => onChange(e)}
              label="# of Animals"
              placeholder="Total # of animals added to the flock "
              type="number"
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
              placeholder="i.e : meat, eggs, reproduction ..."
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
              placeholder="# of animal sold, removed from stock "
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
              placeholder="Dead Animals "
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
            {flockId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
