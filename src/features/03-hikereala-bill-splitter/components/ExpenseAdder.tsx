import { Button, Card, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useBillSplitter } from "../context/BillSplitterContext";

export function ExpenseAdder() {
    const {participants, addExpense} = useBillSplitter();
    const [expensePerson, setExpensePerson] = useState<string>("default");
    const [expenseSum, setExpenseSum] = useState<string>("0");
    const [expenseDescription, setExpenseDescription] = useState<string>("");

    const selections = participants.length != 0 ? participants.map(participant => <MenuItem value={participant}>{participant}</MenuItem>) : <MenuItem value={"default"}>Fara hikeristi adaugati</MenuItem>;
    
    return (
        <Card sx={{marginTop: "24px", padding: "8px"}}>
        <Stack gap={2} sx={{maxWidth: "480px", marginInline: "auto"}}>
             <Stack direction="row" gap={2}>
            <AddShoppingCartIcon fontSize="large"></AddShoppingCartIcon>
            <Typography variant="h4">Adaugare cheltuiala</Typography>
            </Stack>
             <Stack sx={{justifyContent: "space-between"}} direction={"row"} gap={2}>
            <Select sx={{height: "40px",}} disabled={participants.length == 0} value={expensePerson} onChange={(event) => setExpensePerson(event.target.value)}>
                {selections}
            </Select>
            <TextField onChange={(event) => setExpenseSum(event.target.value)} value={expenseSum} size="small"></TextField>
            </Stack>
            <TextField type="text" placeholder="Descriere (optionala)" size="small" onChange={(event) => setExpenseDescription(event.target.value)} value={expenseDescription}></TextField>
            <Button sx={{height: "40px"}}  disabled={participants.length == 0} variant="contained" onClick={() => addExpense(expensePerson, Number(expenseSum), expenseDescription)}>Adauga</Button>
        </Stack>
        </Card>
    )
}