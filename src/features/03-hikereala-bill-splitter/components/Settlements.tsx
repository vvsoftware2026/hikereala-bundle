import { Card, Stack, Typography } from "@mui/material";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useBillSplitter, type ISettlement } from "../context/BillSplitterContext";

export function Settlements() {
    const {expenses, calculateSettlements, calculateBalances} = useBillSplitter();
    const balances = calculateBalances(expenses);

    let settlements: ISettlement[];

    if (balances.length == 0) {
        settlements = []
    }
    else {
       settlements = calculateSettlements(balances);
    }

    const settlementRows = settlements.map(settlement => {return <tr><td>{settlement.sender}</td><td>{settlement.receiver}</td><td>{settlement.sum}</td></tr>}); 
    
    
    return (
    <Card sx={{marginTop: "24px", padding: "8px"}}>
        <Stack direction="column" gap={2} sx={{maxWidth: "480px", marginInline:"auto"}}>
        <Stack direction="row" gap={2}>
            <PriceChangeIcon fontSize="large"></PriceChangeIcon>
        <Typography variant="h4">Plati sugerate</Typography>
        </Stack>
            <table style={{maxWidth: "960px"}}>
            <tr>
                <td>Hikerist platitor</td>
                <td>Hikerist primitor</td>
                <td>Suma</td>
            </tr>
            {settlementRows}
        </table>
        </Stack>
    </Card>
    )
}
