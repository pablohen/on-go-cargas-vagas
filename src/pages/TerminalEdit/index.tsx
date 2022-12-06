import { Card, Container } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { FormSchema, TerminalForm } from "../../components/TerminalForm";
import { useOnGo } from "../../hooks/useOnGo";
import { mapTerminalToUpsertTerminal } from "../../utils";

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

    updateMutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar("Terminal atualizado", {
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
    <Container sx={{ pb: "1rem" }}>
      <Card sx={{ p: "1rem" }}>
        <TerminalForm
          data={
            terminalQuery.data?.data
              ? mapTerminalToUpsertTerminal(terminalQuery.data?.data)
              : undefined
          }
          loading={updateMutation.isLoading}
          onValid={handleOnValid}
        />
      </Card>
    </Container>
  );
}
