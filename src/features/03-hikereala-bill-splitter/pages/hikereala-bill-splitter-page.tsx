import { Stack, Typography, Box, Divider } from "@mui/material";
import image from "../assets/hikereala_bill_splitter_header.png";
import { Balances } from "../components/Balances";
import { Participants } from "../components/Participants";
import { ExpenseAdder } from "../components/ExpenseAdder";
import { ExpenseList } from "../components/ExpenseList";
import { Settlements } from "../components/Settlements";
import { Footer } from "../components/Footer";
import { BillSplitterProvider } from "../context/BillSplitterContext";

export function HikerealaBillSplitterPage() {
  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: 600,
        mx: "auto",
        py: 4,
        px: 2
      }}
    >
      {/* Header image */}
      <Box sx={{ textAlign: "center" }}>
        <img
          src={image}
          loading="lazy"
          style={{
            borderRadius: 12,
            width: "100%",
            height: "auto"
          }}
        />
      </Box>

      {/* Title block */}
      <Stack spacing={0.5} sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700}>
          HBS
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Hikereala Bill Splitter
        </Typography>
      </Stack>

      <Divider />

      {/* App content */}
      <BillSplitterProvider>
        <Participants />
        <ExpenseAdder />
        <ExpenseList />
        <Balances />
        <Settlements />
      </BillSplitterProvider>

      <Footer />
    </Stack>
  );
}
