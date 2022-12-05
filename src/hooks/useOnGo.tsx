import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { api, subscriptionKey } from "../apis/onGoCargas";
import { Auth } from "../types/Auth";
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
}

export const initialState: PaginationOptions = {
  pageIndex: 0,
  pageSize: 10,
  pesquisa: "",
};

interface GetTerminal {
  id: string;
}

export function useOnGo() {
  const [user, setUser] = useLocalStorage<Auth | null>("user", null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function login() {
    return useMutation({
      mutationFn: async (data: AuthParams) => {
        const res = await api.post<Auth>("/v1/public/api/Auth/login", {
          UserIdentifier: data.login,
          Password: data.password,
        });

        return res.data;
      },
    });
  }

  function logout() {
    setUser(null);
    navigate("/login");

    enqueueSnackbar("Logged out", {
      variant: "info",
    });
  }

  function getTerminals(data: PaginationOptions) {
    const getter = async () => {
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
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        }
      );

      return res.data;
    };

    return useQuery(["terminal", ...Object.values(data)], () => getter(), {
      enabled: Boolean(user?.access_token),
    });
  }

  function getTerminal({ id }: GetTerminal) {
    const getter = async () => {
      const res = await api.get<TerminalResult>(
        "/v1/api/Terminal/get-terminal-id",
        {
          params: { id },
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        }
      );

      return res.data;
    };

    return useQuery(["terminal", id], () => getter(), {
      enabled: Boolean(id) && Boolean(user?.access_token),
    });
  }

  function createTerminal() {
    return useMutation({
      mutationFn: async (data: UpsertTerminal) => {
        const res = await api.post("/v1/api/Terminal/save-terminal", data, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        });

        return res.data;
      },
    });
  }

  function updateTerminal() {
    return useMutation({
      mutationFn: async (data: UpsertTerminal) => {
        const res = await api.post("/v1/api/Terminal/alterar-terminal", data, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        });

        return res.data;
      },
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
  };
}
