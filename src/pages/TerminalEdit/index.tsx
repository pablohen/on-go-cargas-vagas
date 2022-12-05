import { Box, Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { FormSchema, TerminalForm } from "../../components/TerminalForm";
import { useOnGo } from "../../hooks/useOnGo";
import { mapTerminalToUpsert } from "../../utils/mapTerminalToUpsert";

export function TerminalEdit() {
  const { getTerminal, updateTerminal } = useOnGo();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams() as { id: string };

  const terminalQuery = getTerminal({
    id: id,
  });

  const updateMutation = updateTerminal();

  function handleOnValid(data: FormSchema, e: any) {
    e.preventDefault();
    console.log(data);
    updateMutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar("Terminal updated", {
          variant: "success",
        });
      },
      onError: (error) => {
        const err = error as AxiosError;

        enqueueSnackbar(err.message, {
          variant: "error",
        });
      },
    });
  }

  return (
    <Box p="1rem">
      <Stack spacing="1rem">
        <Typography variant="h4">
          Terminal: {terminalQuery.data?.data.nome}
        </Typography>

        <TerminalForm
          data={
            terminalQuery.data?.data
              ? mapTerminalToUpsert(terminalQuery.data?.data)
              : undefined
          }
          loading={updateMutation.isLoading}
          onValid={handleOnValid}
        />
      </Stack>
    </Box>
  );
}
