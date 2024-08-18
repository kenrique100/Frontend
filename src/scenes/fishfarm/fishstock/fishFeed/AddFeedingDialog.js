import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddFeedingDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    feedingId,
    feedingDate,
    qtyFed,    
    fishInPond,
    pelletSize,
    feedingNotes,
    provenderId,
    reduced,
    mortality
  } = data; 
 
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {feedingId ? "Update Feeding" : "Add New Feeding"}
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
              placeholder="Amount of feed given per day"
              type="number"
              fullWidth
              variant="standard"
            />
           
            <TextField
              autoFocus
              margin="dense"
              id="fishInPond"
              value={fishInPond}
              onChange={(e) => onChange(e)}
              label="fishInPond"
              placeholder="# fish in pond"
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
              id="pelletSize"
              value={pelletSize}
              onChange={(e) => onChange(e)}
              label="Pellet Size"
              placeholder="size of the feed pellet"
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
            {feedingId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
