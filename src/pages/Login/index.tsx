import { Box } from "@mui/material";
import { LoginForm } from "../../components/LoginForm";

export function Login() {
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
      <LoginForm />
    </Box>
  );
}
