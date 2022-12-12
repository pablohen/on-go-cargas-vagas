import { zodResolver } from "@hookform/resolvers/zod";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import { BaseSyntheticEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToggle } from "usehooks-ts";
import { z } from "zod";
import { useOnGo } from "../../hooks/useOnGo";

const schema = z.object({
  login: z.string().min(8, "Mínimo de 8 caracteres"),
  password: z.string().min(8, "Mínimo de 8 caracteres"),
});

export type FormSchema = z.infer<typeof schema>;

export const initialValues: FormSchema = {
  login: "",
  password: "",
};

interface Props {
  data?: FormSchema;
  loading: boolean;
  onValid: (data: FormSchema, e?: BaseSyntheticEvent) => void;
}

export function LoginForm({ data, loading, onValid }: Props) {
  const navigate = useNavigate();
  const { user } = useOnGo();
  const [showPassword, toggleShowPassword] = useToggle();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (data) {
      form.setValue("login", data.login);
      form.setValue("password", data.password);
    }
  }, [data]);

  useEffect(() => {
    if (Boolean(user)) {
      navigate("/terminals");
    }
  }, [user]);

  return (
    <form onSubmit={form.handleSubmit(onValid, console.log)}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LockOutlinedIcon />
        </Box>

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
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                    {showPassword ? (
                      <VisibilityIcon onClick={toggleShowPassword} />
                    ) : (
                      <VisibilityOffIcon onClick={toggleShowPassword} />
                    )}
                  </InputAdornment>
                ),
              }}
              value={field.value}
              onChange={field.onChange}
              inputRef={field.ref}
              error={Boolean(fieldState.error?.message)}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <LoadingButton type="submit" variant="contained" loading={loading}>
          Enviar
        </LoadingButton>
      </Stack>
    </form>
  );
}
