import { useState } from "react";
import { Stack, Typography } from "@mui/material"
import image from "../assets/hikereala_bill_splitter_header.png"
import { Balances, type BalancePerPerson } from "../components/Balances";
import { Participants } from "../components/Participants";
import { ExpenseAdder } from "../components/ExpenseAdder";
import { ExpenseList } from "../components/ExpenseList";
import { Settlements } from "../components/Settlements";
import { Footer } from "../components/Footer";

export interface Expense {
  name: string,
  sum: number,
  description: string
}

export function HikerealaBillSplitterPage() {

  const [participants, setParticipants] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [, setBalances] = useState<BalancePerPerson[]>([])

  function onAddParticipant(participant: string) {
   setParticipants([...participants, participant])
    console.log("Added participant " + participant);
  }

  function onDeleteParticipant(participant: string) {
    const currentParticipants = participants.filter(tempParticipant => tempParticipant != participant);
    setParticipants(currentParticipants);
  }

  function onAddExpense(expensePerson: string, expenseSum: string, expenseDescription: string) {
    setExpenses([...expenses, {name: expensePerson, sum: Number(expenseSum), description: expenseDescription}]);
  }

   function onSetBalances(calculatedBalances: BalancePerPerson[]) {
    setBalances([...calculatedBalances]);
  }

  return (
    <Stack gap={2} sx={{maxWidth: "480px", marginInline: "auto"}}>
      <img
        src={image}
        loading="lazy"
        style={{borderRadius: "10px"}}
       />
    <Typography variant="h4">HBS </Typography>
    <Typography variant="h5">(Hikereala bill splitter)</Typography>
    <Participants onAddParticipant={onAddParticipant} participantList={participants} onDeleteParticipant={onDeleteParticipant}/>
    <ExpenseAdder participantList={participants} onAddExpense={onAddExpense}/>
    <ExpenseList expenses={expenses}/>
    <Balances expenses={expenses} onSetBalances={onSetBalances}/>
    <Settlements expenses={expenses}/>
    <Footer/>
    </Stack>
  )
}
