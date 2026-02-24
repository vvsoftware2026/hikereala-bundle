import {
  Button,
  Card,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useBillSplitter } from "../context/BillSplitterContext";

export function ExpenseList() {
  const { expenses, removeExpense } = useBillSplitter();

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Stack gap={2} sx={{ maxWidth: 480, mx: "auto" }}>
        <Stack direction="row" gap={2} alignItems="center">
          <ShoppingCartIcon fontSize="large" />
          <Typography variant="h4">Cheltuieli</Typography>
        </Stack>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Hikerist</strong></TableCell>
                <TableCell><strong>Suma platita</strong></TableCell>
                <TableCell><strong>Descriere</strong></TableCell>
                <TableCell><strong>Sterge</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>{expense.sum}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => removeExpense(expense.id)}
                      variant="text"
                      color="error"
                      size="small"
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
}