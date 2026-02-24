import {
  Button,
  Card,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  InputLabel,
  FormControl
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import { useBillSplitter } from "../context/BillSplitterContext";

export function ExpenseAdder() {
  const { participants, addExpense } = useBillSplitter();

  const [expensePerson, setExpensePerson] = useState("default");
  const [expenseSum, setExpenseSum] = useState("0");
  const [expenseDescription, setExpenseDescription] = useState("");

  const hasParticipants = participants.length > 0;

  return (
    <Card sx={{ mt: 3, p: 3 }}>
      <Stack gap={3} sx={{ maxWidth: 480, mx: "auto" }}>
        {/* Header */}
        <Stack direction="row" gap={2} alignItems="center">
          <AddShoppingCartIcon fontSize="large" />
          <Typography variant="h4">Adăugare cheltuială</Typography>
        </Stack>

        {/* Form fields */}
        <Stack gap={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Hikerist</InputLabel>
            <Select
              label="Hikerist"
              disabled={!hasParticipants}
              value={expensePerson}
              onChange={(e) => setExpensePerson(e.target.value)}
            >
              {hasParticipants ? (
                participants.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="default">Fără hikeristi adăugați</MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            label="Sumă"
            type="number"
            size="small"
            value={expenseSum}
            onChange={(e) => setExpenseSum(e.target.value)}
            fullWidth
          />

          <TextField
            label="Descriere (opțional)"
            size="small"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Submit button */}
        <Button
          variant="contained"
          size="large"
          disabled={!hasParticipants}
          onClick={() =>
            addExpense(expensePerson, Number(expenseSum), expenseDescription)
          }
        >
          Adaugă
        </Button>
      </Stack>
    </Card>
  );
}
