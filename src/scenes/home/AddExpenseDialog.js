import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddExpenseDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    expenseId,
    type,
    reason,
    dueBalance,
    expenseAmount,
    expenseDate,
    paidBy,
    qtyPurchase,
    amountPaid,
    paidTo,
  } = data;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {expenseId ? "Update Expense" : "Add New Expense"}
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
              placeholder="salary, feed, ..."
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="reason"
              value={reason}
              onChange={(e) => onChange(e)}
              label="reason"
              type="text"
              fullWidth
              placeholder="i.e : reason why ..."
              variant="standard"
              required={true}
            />

            <TextField
              autoFocus
              margin="dense"
              id="expenseDate"
              value={expenseDate}
              onChange={(e) => onChange(e)}
              label="expense Date"
              placeholder="Date Format"
              type="date"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="expenseAmount"
              value={expenseAmount}
              onChange={(e) => onChange(e)}
              label="expenseAmount"
              placeholder="Total amount to pay "
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="amountPaid"
              value={amountPaid}
              onChange={(e) => onChange(e)}
              label="amountPaid"
              placeholder="amountPaid "
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
              id="qtyPurchase"
              value={qtyPurchase}
              onChange={(e) => onChange(e)}
              label="qtyPurchase"
              placeholder="qtyPurchase"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="paidTo"
              value={paidTo}
              onChange={(e) => onChange(e)}
              label="paidTo"
              type="text"
              fullWidth
              placeholder="i.e who was it paid to"
              variant="standard"
              required={true}
            />
            <TextField
              autoFocus
              margin="dense"
              id="paidBy"
              value={paidBy}
              onChange={(e) => onChange(e)}
              label="paidBy"
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
            {expenseId ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
