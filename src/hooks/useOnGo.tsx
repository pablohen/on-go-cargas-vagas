import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { api } from "../apis/onGoCargas";
import { Auth } from "../types/Auth";
import { AuthToken } from "../types/AuthToken";
import { Result as TerminalResult } from "../types/Terminal";
import { Result as TerminalsResult } from "../types/Terminals";
import { UpsertTerminal } from "../types/UpsertTerminal";

interface AuthParams {
  login: string;
  password: string;
}

export interface PaginationOptions {
  pageSize: number;
  pageIndex: number;
  pesquisa: string;
  rowsPerPage: number[];
}

export const initialOptions: PaginationOptions = {
  pageIndex: 0,
  pageSize: 10,
  pesquisa: "",
  rowsPerPage: [10, 25, 50, 100],
};

interface GetTerminal {
  id: string;
}

export function useOnGo() {
  const [user, setUser] = useLocalStorage<Auth | null>("user", null);
  const { decodedToken, isExpired } = useJwt<AuthToken>(
    user?.access_token as string
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function login() {
    async function mutation(data: AuthParams) {
      const res = await api.post<Auth>("/v1/public/api/Auth/login", {
        UserIdentifier: data.login,
        Password: data.password,
      });

      return res.data;
    }

    return useMutation({
      mutationFn: mutation,
    });
  }

  function logout() {
    setUser(null);
    navigate("/login");

    enqueueSnackbar("Usuário deslogado", {
      variant: "info",
    });
  }

  function getTerminals(data: PaginationOptions) {
    async function query() {
      const { pageIndex, pageSize, pesquisa } = data;
      const res = await api.get<TerminalsResult>(
        "/v1/api/Terminal/get-terminal-listagem",
        {
          params: {
            pageSize,
            pageIndex,
            pesquisa,
          },
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Ocp-Apim-Subscription-Key": decodedToken?.OcpApimSubscriptionKey,
          },
        }
      );

      return res.data;
    }

    return useQuery({
      queryKey: ["terminal", ...Object.values(data)],
      queryFn: query,
      enabled:
        Boolean(user?.access_token) &&
        Boolean(decodedToken?.OcpApimSubscriptionKey),
    });
  }

  function getTerminal({ id }: GetTerminal) {
    async function query() {
      const res = await api.get<TerminalResult>(
        "/v1/api/Terminal/get-terminal-id",
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Ocp-Apim-Subscription-Key": decodedToken?.OcpApimSubscriptionKey,
          },
        }
      );

      return res.data;
    }

    return useQuery({
      queryKey: ["terminal", id],
      queryFn: query,
      enabled:
        Boolean(id) &&
        Boolean(user?.access_token) &&
        Boolean(decodedToken?.OcpApimSubscriptionKey),
    });
  }

  function createTerminal() {
    async function mutation(data: UpsertTerminal) {
      const res = await api.post<UpsertTerminal>(
        "/v1/api/Terminal/save-terminal",
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Ocp-Apim-Subscription-Key": decodedToken?.OcpApimSubscriptionKey,
          },
        }
      );

      return res.data;
    }

    return useMutation({
      mutationFn: mutation,
    });
  }

  function updateTerminal() {
    async function mutation(data: UpsertTerminal) {
      const res = await api.post<UpsertTerminal>(
        "/v1/api/Terminal/alterar-terminal",
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Ocp-Apim-Subscription-Key": decodedToken?.OcpApimSubscriptionKey,
          },
        }
      );

      return res.data;
    }

    return useMutation({
      mutationFn: mutation,
    });
  }

  return {
    login,
    logout,
    getTerminals,
    getTerminal,
    createTerminal,
    updateTerminal,
    user,
    setUser,
    decodedToken,
    isExpired,
  };
}
