import { Container, Typography } from "@mui/material";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ProtectedPages } from "../layouts/ProtectedPages";
import { Login } from "../pages/Login";
import { TerminalCreate } from "../pages/TerminalCreate";
import { TerminalEdit } from "../pages/TerminalEdit";
import { TerminalList } from "../pages/TerminalList";

const terminalRoutes = [
  { path: "", element: <TerminalList /> },
  { path: "new", element: <TerminalCreate />, handle: "Novo" },
  ,
  { path: "edit/:id", element: <TerminalEdit />, handle: "Editar" },
] as RouteObject[];

export const router = createBrowserRouter([
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
        children: terminalRoutes,
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
