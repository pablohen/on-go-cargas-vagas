import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { ProtectedPages } from "./components/ProtectedPages";
import { appTheme } from "./config/theme";
import { Login } from "./pages/Login";
import { TerminalCreate } from "./pages/TerminalCreate";
import { TerminalEdit } from "./pages/TerminalEdit";
import { TerminalList } from "./pages/TerminalList";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "terminals",
          handle: "Terminais",
          element: <ProtectedPages />,
          children: [
            { path: "", element: <TerminalList /> },
            { path: "new", element: <TerminalCreate />, handle: "Novo" },
            ,
            { path: "edit/:id", element: <TerminalEdit />, handle: "Editar" },
          ] as RouteObject[],
        },
        {
          path: "*",
          element: (
            <Container>
              <Typography variant="h4">404</Typography>
              <Typography variant="h6">Not found</Typography>
            </Container>
          ),
        },
      ],
    },
  ]);

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
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
