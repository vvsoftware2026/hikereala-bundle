import { createContext, useContext, useEffect, useRef, useState } from "react";

export interface Expense {
  id: number
  name: string,
  sum: number,
  description: string
}

export interface BalancePerPerson {
    name: string,
    balance: number
}

export interface ISettlement {
    sender: string,
    receiver: string,
    sum: number
}

interface BillSplitterContextType {
    participants: string[],
    addParticipant: (name:string) => void,
    deleteParticipant: (name: string) => void,
    expenses: Expense[]; 
    addExpense: (person: string, sum: number, description: string) => void; 
    balances: BalancePerPerson[]; 
    calculateSettlements: (balances: BalancePerPerson[]) => ISettlement[];
    calculateBalances: (expenses: Expense[]) => BalancePerPerson[];
    removeExpense: (expenseid: number) => void;
}

const BillSplitterContext = createContext<BillSplitterContextType | null>(null);

export function BillSplitterProvider({ children }: { children: React.ReactNode }) {
    
  const [participants, setParticipants] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [balances, ] = useState<BalancePerPerson[]>([])
  let expenseCounter = useRef(0);

  useEffect(() => {
    const filteredExpenses = expenses.filter(expense => participants.includes(expense.name));
    setExpenses(filteredExpenses);
  }, [participants]); 

  function addParticipant(participant: string) {
   setParticipants([...participants, participant])
    console.log("Added participant " + participant);
  }

  function deleteParticipant(participant: string) {
    const currentParticipants = participants.filter(tempParticipant => tempParticipant != participant);
    setParticipants(currentParticipants);
  }

  function addExpense(person: string, sum: number, description: string) { 
    expenseCounter.current++;
    setExpenses(prev => [...prev, { id: expenseCounter.current, name: person, sum, description }]); 
  }

  function removeExpense(expenseId: number) {
    const newExpenses = expenses.filter(expense => expense.id !== expenseId);
    setExpenses(newExpenses); 
  }

function calculateSettlements(balances: BalancePerPerson[]) {
    let settlements: ISettlement[] = [];

    balances.sort((balanceA, balanceB) => balanceA.balance - balanceB.balance);

    const debtors = balances.filter(balance => balance.balance < 0);
    const creditors = balances.filter(balance => balance.balance > 0);

      let i = 0, j = 0;

      while (i < debtors.length && j < creditors.length) {
        let debtor = debtors[i];
        let creditor = creditors[j];
        let debtorAmount = -debtor.balance;
        let creditorAmount = creditor.balance;

        const payment = Math.min(-debtor.balance, creditor.balance);
        if (payment >= 0.01) {
          settlements.push({ sender: debtor.name, receiver: creditor.name, sum: payment } as ISettlement);
          debtorAmount = debtorAmount - payment;
          creditorAmount = creditorAmount - payment;
        }

        if (debtorAmount == 0 ) {
            i++;        
        }
        else { 
            debtors[i].balance = debtorAmount;
        }

          if (creditorAmount == 0 ) {
            j++;        
        }
        else { 
            creditors[j].balance = creditorAmount;
        }
        
      }

    return settlements;
}

function calculateBalances(expenses: Expense[]) {
    let totalSum = 0;
    let balances: BalancePerPerson[] = [];

    for (const expense of expenses) {
        const foundBalance = balances.find(balance => balance.name == expense.name);

        if (!foundBalance) {
            balances.push({name: expense.name, balance: expense.sum})
        }
        else {
            const newBalance: BalancePerPerson = {name: foundBalance.name, balance: foundBalance.balance + expense.sum};
            
            const updatedBalances = balances.map(balance => {
                if (balance.name == expense.name) {
                    return newBalance;
                }
                else {
                    return balance;
                }
            })

            balances = updatedBalances;
        }
       
        totalSum += expense.sum;
    }

    const sumPerPerson = totalSum / balances.length;

   const updatedBalances = balances.map(balance => {
    const newBalance: BalancePerPerson = {name: balance.name, balance: balance.balance - sumPerPerson};
    return newBalance;
});

    return updatedBalances;
}





  return (
    <BillSplitterContext.Provider
    value={{
        participants,
        addParticipant,
        deleteParticipant,
        expenses,
        addExpense,
        balances,
        calculateSettlements,
        calculateBalances,
        removeExpense
    }}
    >
        {children}
    </BillSplitterContext.Provider>
  );

}

export function useBillSplitter() { 
    const ctx = useContext(BillSplitterContext); 
    if (!ctx) throw new Error("useBillSplitter must be used inside BillSplitterProvider");
    return ctx; 
}