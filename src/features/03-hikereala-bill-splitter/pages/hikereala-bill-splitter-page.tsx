import { Stack, Typography } from "@mui/material"
import image from "../assets/hikereala_bill_splitter_header.png"
import { Balances } from "../components/Balances";
import { Participants } from "../components/Participants";
import { ExpenseAdder } from "../components/ExpenseAdder";
import { ExpenseList } from "../components/ExpenseList";
import { Settlements } from "../components/Settlements";
import { Footer } from "../components/Footer";
import { BillSplitterProvider } from "../context/BillSplitterContext";



export function HikerealaBillSplitterPage() {

  return (
    <Stack gap={2} sx={{maxWidth: "480px", marginInline: "auto"}}>
      <img
        src={image}
        loading="lazy"
        style={{borderRadius: "10px"}}
       />
    <Typography variant="h4">HBS </Typography>
    <Typography variant="h5">(Hikereala bill splitter)</Typography>
    <BillSplitterProvider>
    <Participants/>
    <ExpenseAdder/>
    <ExpenseList/>
    <Balances/>
    <Settlements/>
    </BillSplitterProvider>
    <Footer/>
    </Stack>
  )
}
