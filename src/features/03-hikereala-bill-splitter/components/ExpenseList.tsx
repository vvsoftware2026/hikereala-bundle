import { Button, Card, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useBillSplitter } from "../context/BillSplitterContext";


export function ExpenseList() {
const {expenses, removeExpense} = useBillSplitter();
    const expenseRows = expenses.map(expense => <tr><td>{expense.name}</td><td>{expense.sum}</td><td>{expense.description}</td><td><Button onClick={() => removeExpense(expense.id)} variant="text" color="error">X</Button></td></tr>);

    return (
            <Card sx={{marginTop: "24px", padding: "8px"}}>
        <Stack gap={2} sx={{maxWidth: "480px", marginInline: "auto"}}>
            <Stack direction="row" gap={2}>
            <ShoppingCartIcon fontSize="large"></ShoppingCartIcon>
            <Typography variant="h4">Cheltuieli</Typography>
            </Stack>
        
        <table style={{marginTop: "16px"}}>
         <tr>
            <td>Hikerist</td>
            <td>Suma platita</td>
            <td>Descriere</td>
            <td>Sterge cheltuiala</td>
         </tr>
         {expenseRows}
        </table>
        </Stack>
        </Card>
    )
}