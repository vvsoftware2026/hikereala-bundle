import { Card, Stack, Typography } from "@mui/material";
import PaymentsIcon from '@mui/icons-material/Payments';
import { useBillSplitter } from "../context/BillSplitterContext";

export function Balances() {
    const {expenses, calculateBalances} = useBillSplitter();
    const calculatedBalances = calculateBalances(expenses);

    return(
        <Card sx={{marginTop: "24px", padding: "8px"}}>
           <Stack gap={2} sx={{maxWidth: "480px", marginInline: "auto"}}>
            <Stack direction="row" gap={2}>
            <PaymentsIcon fontSize="large"></PaymentsIcon>
            <Typography variant="h4">Solduri (pozitiv = de primit, negativ = de platit)</Typography>
        </Stack>
        <table style={{maxWidth: "960px", marginTop: "16px"}}>
               <tr>
            <td>Hikerist</td>
            <td>Sold</td>
         </tr>
       {calculatedBalances.map(calculatedBalance => {
        if (calculatedBalance.balance < 0) {
            return  <tr><td>{calculatedBalance.name}</td><td className="negative-balance">{calculatedBalance.balance}</td></tr>
        }
        else {
              return <tr><td>{calculatedBalance.name}</td><td className="positive-balance">{calculatedBalance.balance}</td></tr>
        }
})}
        </table>
        </Stack>
        </Card>
    )
}