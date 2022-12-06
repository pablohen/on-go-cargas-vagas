import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Card, Stack, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useOnGo } from "../../hooks/useOnGo";

const schema = z.object({
  login: z.string().min(8, "Mínimo de 8 caracteres"),
  password: z.string().min(8, "Mínimo de 8 caracteres"),
});

type FormSchema = z.infer<typeof schema>;

const initialValues: FormSchema = {
  login: "",
  password: "",
};

export function LoginForm() {
  const { login, user, setUser } = useOnGo();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loginMutation = login();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  function handleSubmit(data: FormSchema, e: any) {
    e.preventDefault();

    loginMutation.mutate(
      {
        login: data.login,
        password: data.password,
      },
      {
        onSuccess: (userData) => {
          setUser(userData);

          enqueueSnackbar("Logged in", {
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

  useEffect(() => {
    form.setValue("login", "vagas@ongo.com.br");
    form.setValue("password", "Vagas1a2b");
  }, []);

  useEffect(() => {
    if (Boolean(user)) {
      navigate("/terminals");
    }
  }, [user]);

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "20rem",
      }}
    >
      <form onSubmit={form.handleSubmit(handleSubmit, console.log)}>
        <Stack spacing="1rem">
          <Controller
            name="login"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                id="login"
                label="Login"
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                error={Boolean(fieldState.error?.message)}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                id="password"
                label="Senha"
                type="password"
                value={field.value}
                onChange={field.onChange}
                inputRef={field.ref}
                error={Boolean(fieldState.error?.message)}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loginMutation.isLoading}
          >
            Enviar
          </LoadingButton>
        </Stack>
      </form>
    </Card>
  );
}
