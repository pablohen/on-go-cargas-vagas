import { Box, Container } from "@mui/material";
import { useSnackbar } from "notistack";
import { FormSchema, TerminalForm } from "../../components/TerminalForm";
import { useOnGo } from "../../hooks/useOnGo";

export function TerminalCreate() {
  const { createTerminal } = useOnGo();
  const { enqueueSnackbar } = useSnackbar();

  const createMutation = createTerminal();

  function handleOnValid(data: FormSchema, e: any) {
    e.preventDefault();

    createMutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar("Terminal created", {
          variant: "success",
        });
      },
      onError: (error) => {
        console.log("outro erro", error);
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
    <Container>
      <Box pt="2rem" pb="1rem">
        <TerminalForm
          loading={createMutation.isLoading}
          onValid={handleOnValid}
        />
      </Box>
    </Container>
  );
}
