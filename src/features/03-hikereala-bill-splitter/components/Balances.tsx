import {
  Card,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useBillSplitter } from "../context/BillSplitterContext";

export function Balances() {
  const { expenses, calculateBalances } = useBillSplitter();
  const balances = calculateBalances(expenses);

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Stack gap={2} sx={{ maxWidth: 480, mx: "auto" }}>
        <Stack direction="row" gap={2} alignItems="center">
          <PaymentsIcon fontSize="large" />
          <Typography variant="h4">
            Solduri (pozitiv = de primit, negativ = de plătit)
          </Typography>
        </Stack>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Hikerist</strong></TableCell>
                <TableCell><strong>Sold</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {balances.map((b, i) => (
                <TableRow key={i}>
                    <TableCell>{b.name}</TableCell>
                    <TableCell>
                        <Chip
                            label={b.balance}
                            size="small"
                            sx={{
                            fontWeight: 600,
                            backgroundColor:b.balance < 0 ? "rgba(244, 67, 54, 0.10)" : "rgba(76, 175, 80, 0.10)", color:b.balance < 0 ? "rgba(183, 28, 28, 1)" : "rgba(27, 94, 32, 1)"}}
                        />
                    </TableCell>
                </TableRow>
              ))}

              {balances.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ py: 3, color: "text.secondary" }}>
                    Niciun sold de afișat
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Card>
  );
}
