import {
  Button,
  Card,
  Chip,
  Stack,
  TextField,
  Typography,
  Box
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState } from "react";
import { useBillSplitter } from "../context/BillSplitterContext";

export function Participants() {
  const { addParticipant, deleteParticipant, participants } = useBillSplitter();
  const [participantToAdd, setParticipantToAdd] = useState("");

  return (
    <Card sx={{ mt: 3, p: 3 }} elevation={1}>
      <Stack sx={{ maxWidth: 480, mx: "auto" }} spacing={3}>
        {/* Header */}
        <Stack direction="row" spacing={2} alignItems="center">
          <GroupsIcon fontSize="large" />
          <Typography variant="h4">Hikeriști participanți</Typography>
        </Stack>

        {/* Add participant */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="Nume hikerist"
            size="small"
            fullWidth
            value={participantToAdd}
            onChange={(e) => setParticipantToAdd(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (participantToAdd.trim()) {
                addParticipant(participantToAdd.trim());
                setParticipantToAdd("");
              }
            }}
          >
            Adaugă
          </Button>
        </Stack>

        {/* Chip list */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mt: 1
          }}
        >
          {participants.map((p) => (
            <Chip
              key={p}
              label={p}
              color="info"
              onDelete={() => deleteParticipant(p)}
            />
          ))}
        </Box>
      </Stack>
    </Card>
  );
}
