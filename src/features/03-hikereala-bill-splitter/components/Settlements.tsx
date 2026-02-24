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
  Paper
} from "@mui/material";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import { useBillSplitter, type ISettlement } from "../context/BillSplitterContext";

export function Settlements() {
  const { expenses, calculateSettlements, calculateBalances } = useBillSplitter();

  const balances = calculateBalances(expenses);
  const settlements: ISettlement[] =
    balances.length === 0 ? [] : calculateSettlements(balances);

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <Stack gap={2} sx={{ maxWidth: 480, mx: "auto" }}>
        <Stack direction="row" gap={2} alignItems="center">
          <PriceChangeIcon fontSize="large" />
          <Typography variant="h4">Plăți sugerate</Typography>
        </Stack>

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Hikerist platitor</strong></TableCell>
                <TableCell><strong>Hikerist primitor</strong></TableCell>
                <TableCell><strong>Suma</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {settlements.map((s, i) => (
                <TableRow key={i}>
                  <TableCell>{s.sender}</TableCell>
                  <TableCell>{s.receiver}</TableCell>
                  <TableCell>{s.sum}</TableCell>
                </TableRow>
              ))}

              {settlements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3, color: "text.secondary" }}>
                    Nicio plată necesară
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
