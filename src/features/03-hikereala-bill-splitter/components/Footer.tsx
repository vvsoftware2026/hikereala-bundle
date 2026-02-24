import { Card, Typography, Stack } from "@mui/material";

export function Footer() {
  return (
    <Card sx={{ mt: 3, p: 3 }}>
      <Stack spacing={1} sx={{ textAlign: "center", maxWidth: 600, mx: "auto" }}>
  <Typography variant="subtitle1" fontWeight={600}>
    Dezvoltat cu dragoste
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Pentru amicii mei...
  </Typography>
  <Typography variant="body2" color="text.secondary">
    In ciubar stau...
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Si beau cu ei...
  </Typography>
</Stack>

    </Card>
  );
}
