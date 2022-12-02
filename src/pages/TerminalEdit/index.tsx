import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { TerminalForm } from "../../components/TerminalForm";
import { useOnGoCargas } from "../../hooks/useOnGoCargas";

export function TerminalEdit() {
  const { getTerminal } = useOnGoCargas();
  const { id } = useParams() as { id: string };

  const terminalQuery = getTerminal({
    id: id,
  });

  return (
    <Box p="1rem">
      <Stack spacing="1rem">
        <Typography variant="h4">
          Terminal: {terminalQuery.data?.data.nome}
        </Typography>

        <TerminalForm />
      </Stack>
    </Box>
  );
}
