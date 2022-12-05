import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { api } from "../apis/brasilApi";
import { Address } from "../types/Address";

export function useBrasilApi() {
  const { enqueueSnackbar } = useSnackbar();

  function getAddressByCep(cep: string) {
    async function getter() {
      const res = await api.get<Address>(`/cep/v2/${cep}`);

      return res.data;
    }

    return useQuery(["cep", cep], () => getter(), {
      enabled: Boolean(cep),
      onError: (error) => {
        const err = error as AxiosError;

        enqueueSnackbar(err.message, {
          variant: "error",
        });
      },
    });
  }

  return { getAddressByCep };
}
