import { Card, Container } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { BaseSyntheticEvent } from "react";
import { FormSchema, TerminalForm } from "../../components/TerminalForm";
import { useOnGo } from "../../hooks/useOnGo";

export default function TerminalCreate() {
  const { createTerminal } = useOnGo();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const createMutation = createTerminal();

  function handleOnValid(data: FormSchema, e?: BaseSyntheticEvent) {
    e?.preventDefault();

    createMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["terminal"]);

        enqueueSnackbar("Terminal cadastrado", {
          variant: "success",
        });
      },
      onError: (error) => {
        const err = error as any;
        const errors = err?.response?.data?.data;

        errors.map((error: { errorCode: string; message: string }) =>
          enqueueSnackbar(error.message, {
            variant: "error",
          })
        );

        enqueueSnackbar(err.response.statusText, {
          variant: "error",
        });
      },
    });
  }

  return (
    <Container sx={{ pb: (theme) => theme.spacing(2) }}>
      <Card sx={{ p: (theme) => theme.spacing(2) }}>
        <TerminalForm
          loading={createMutation.isLoading}
          onValid={handleOnValid}
        />
      </Card>
    </Container>
  );
}
