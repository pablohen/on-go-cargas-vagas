import { Box, Card } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { FormSchema, LoginForm } from "../../components/LoginForm";
import { useOnGo } from "../../hooks/useOnGo";

const demoUser: FormSchema = {
  login: "vagas@ongo.com.br",
  password: "Vagas1a2b",
};

export function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const { login, setUser } = useOnGo();

  const loginMutation = login();

  function handleOnValid(data: FormSchema, e: any) {
    e.preventDefault();

    loginMutation.mutate(
      {
        login: data.login,
        password: data.password,
      },
      {
        onSuccess: (userData) => {
          setUser(userData);

          enqueueSnackbar("Usuário logado", {
            variant: "success",
          });
        },
        onError: (error) => {
          const err = error as AxiosError;

          enqueueSnackbar(err.message, {
            variant: "error",
          });
        },
      }
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          padding: "1rem",
          width: "20rem",
        }}
      >
        <LoginForm
          data={demoUser}
          loading={loginMutation.isLoading}
          onValid={handleOnValid}
        />
      </Card>
    </Box>
  );
}
