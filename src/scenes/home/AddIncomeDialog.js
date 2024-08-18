import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddIncomeDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    incomeId,
    type,
    dueBalance,
    amountSold,
    dateSold,
    reference,
    qtySold,
    amountReceived,
    origin,
    enteredBy,
  } = data;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{incomeId ? "Update Sale" : "Add New Sale"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="type"
              value={type}
              onChange={(e) => onChange(e)}
              label="Income type"
              type="text"
              fullWidth
              placeholder="Income source, Product name. i.e Chicken, Pig.."
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="dateSold"
              value={dateSold}
              onChange={(e) => onChange(e)}
              label="Income Date"
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
              type="text"
              fullWidth
              placeholder="Receipt Number"
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="amountSold"
              value={amountSold}
              onChange={(e) => onChange(e)}
              label="Income Amount"
              placeholder="Total amount to be paid "
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="amountReceived"
              value={amountReceived}
              onChange={(e) => onChange(e)}
              label="amount Received"
              placeholder="Total amount paid "
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              margin="dense"
              id="dueBalance"
              value={dueBalance}
              onChange={(e) => onChange(e)}
              label="dueBalance"
              placeholder="dueBalance"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="qtySold"
              value={qtySold}
              onChange={(e) => onChange(e)}
              label="qtySold"
              placeholder="qty Sold"
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
              label="Received From"
              type="text"
              fullWidth
              placeholder="i.e name of customer"
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="enteredBy"
              value={enteredBy}
              onChange={(e) => onChange(e)}
              label="Received By"
              type="text"
              fullWidth
              placeholder="i.e who was it paid by"
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
            {incomeId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
