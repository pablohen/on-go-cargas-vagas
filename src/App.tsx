import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedPages } from "./components/ProtectedPages";
import { appTheme } from "./config/theme";
import { Login } from "./pages/Login";
import { TerminalCreate } from "./pages/TerminalCreate";
import { TerminalEdit } from "./pages/TerminalEdit";
import { TerminalList } from "./pages/TerminalList";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider
          maxSnack={5}
          autoHideDuration={3000}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
        >
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route path="" element={<Login />} />
                <Route path="login" element={<Login />} />

                <Route path="terminals" element={<ProtectedPages />}>
                  <Route path="" element={<TerminalList />} />
                  <Route path="create" element={<TerminalCreate />} />
                  <Route path=":id" element={<TerminalEdit />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
