import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { api } from "../apis/brasilApi";
import { Address } from "../types/Address";

interface GetAddressByCep {
  cep: string;
}

export function useBrasilApi() {
  const { enqueueSnackbar } = useSnackbar();

  function getAddressByCep({ cep }: GetAddressByCep) {
    async function query() {
      const res = await api.get<Address>(`/cep/v2/${cep}`);

      return res.data;
    }

    return useQuery({
      queryKey: ["cep", cep],
      queryFn: query,
      enabled: Boolean(cep),
      onSuccess: () => {
        enqueueSnackbar("Endereço preenchido automaticamente com base no CEP", {
          variant: "info",
        });
      },
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
