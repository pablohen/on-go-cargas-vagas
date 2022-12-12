import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { Fallback } from "../components/Fallback";

const LazyLogin = lazy(() => import("../pages/Login"));
const LazyTerminalList = lazy(() => import("../pages/TerminalList"));
const LazyTerminalCreate = lazy(() => import("../pages/TerminalCreate"));
const LazyTerminalEdit = lazy(() => import("../pages/TerminalEdit"));
const LazyNotFound = lazy(() => import("../pages/NotFound"));
const LazyProtectedPages = lazy(() => import("../layouts/ProtectedPages"));

const terminalRoutes = [
  { path: "", element: <LazyTerminalList /> },
  { path: "new", element: <LazyTerminalCreate />, handle: "Novo" },
  ,
  { path: "edit/:id", element: <LazyTerminalEdit />, handle: "Editar" },
] as RouteObject[];

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Fallback />}>
            <LazyLogin />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Fallback />}>
            <LazyLogin />
          </Suspense>
        ),
      },
      {
        path: "terminals",
        handle: "Terminais",
        element: (
          <Suspense fallback={<Fallback />}>
            <LazyProtectedPages />
          </Suspense>
        ),
        children: terminalRoutes,
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Fallback />}>
            <LazyNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);
