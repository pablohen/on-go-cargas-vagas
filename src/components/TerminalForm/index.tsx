import { isValid as isValidCnpj } from "@fnando/cnpj";
import { isValid as isValidCpf } from "@fnando/cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import { useBrasilApi } from "../../hooks/useBrasilApi";
import { UpsertTerminal } from "../../types/UpsertTerminal";
import { TerminalMap } from "../TerminalMap";

const invalidCpfMessage = "CPF inválido";
const invalidCnpjMessage = "CNPJ inválido";

const schema = z
  .object({
    Id: z.number(),
    idDonoCarga: z.number(),
    nome: z.string().min(3, "Mínimo de 3 caracteres"),
    TipoPessoa: z.custom().transform(Number),
    CPF: z.string().refine(isValidCpf, invalidCpfMessage).or(z.literal("")),
    CNPJ: z.string().refine(isValidCnpj, invalidCnpjMessage).or(z.literal("")),
    InscricaoEstadual: z.custom().transform(Number),
    Endereco: z.object({
      id: z.number(),
      logradouro: z.string(),
      cep: z.string().regex(/[0-9]{5}-[0-9]{3}/, "CEP inválido"),
      bairro: z.string(),
      numero: z.string().min(1, "Número inválido"),
      CodCidadeIBGE: z.number(),
      complemento: z.string(),
      lat: z.number(),
      lng: z.number(),
      cidade: z.string(),
      estado: z.string(),
      nomeEstado: z.string(),
    }),
  })
  .refine(
    (data) => {
      if (data.TipoPessoa === 2) {
        return true;
      }

      return data.TipoPessoa === 1 && data.CPF !== "";
    },
    {
      message: invalidCpfMessage,
      path: ["CPF"],
    }
  )
  .refine(
    (data) => {
      if (data.TipoPessoa === 1) {
        return true;
      }

      return data.TipoPessoa === 2 && data.CNPJ !== "";
    },
    {
      message: invalidCnpjMessage,
      path: ["CNPJ"],
    }
  );

export type FormSchema = z.infer<typeof schema>;

export const initialValues: FormSchema = {
  Id: 0,
  idDonoCarga: 0,
  nome: "",
  TipoPessoa: 1,
  CPF: "",
  CNPJ: "",
  InscricaoEstadual: 0,
  Endereco: {
    id: 0,
    logradouro: "",
    cep: "",
    bairro: "",
    numero: "",
    CodCidadeIBGE: 0,
    complemento: "",
    lat: 0,
    lng: 0,
    cidade: "",
    estado: "",
    nomeEstado: "",
  },
};
interface Props {
  data?: UpsertTerminal;
  loading: boolean;
  onValid: (data: FormSchema, e?: BaseSyntheticEvent) => void;
}

export function TerminalForm({ data, loading, onValid }: Props) {
  const [cep, setCep] = useState("");

  const { getAddressByCep } = useBrasilApi();
  const addressQuery = getAddressByCep({ cep: cep });

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const formData = form.watch();

  const center = {
    lat: formData.Endereco.lat ?? 0,
    lng: formData.Endereco.lng ?? 0,
  };

  useEffect(() => {
    if (formData.TipoPessoa == 1) {
      form.setValue("CNPJ", "");
    }

    if (formData.TipoPessoa == 2) {
      form.setValue("CPF", "");
    }
  }, [formData.TipoPessoa]);

  useEffect(() => {
    if (formData.Endereco.cep.at(-1) !== "_") {
      setCep(formData.Endereco.cep);
    }
  }, [formData.Endereco.cep]);

  useEffect(() => {
    if (addressQuery.data) {
      form.setValue("Endereco.logradouro", addressQuery.data.street);
      form.setValue("Endereco.bairro", addressQuery.data.neighborhood);
      form.setValue(
        "Endereco.lat",
        Number(addressQuery.data.location.coordinates.latitude ?? 0)
      );
      form.setValue(
        "Endereco.lng",
        Number(addressQuery.data.location.coordinates.longitude ?? 0)
      );
      form.setValue("Endereco.cidade", addressQuery.data.city);
      form.setValue("Endereco.estado", addressQuery.data.state);
      form.setValue("Endereco.nomeEstado", addressQuery.data.state);
    }
  }, [addressQuery.data]);

  useEffect(() => {
    if (data) {
      form.setValue("Id", data.Id);
      form.setValue("idDonoCarga", data.idDonoCarga);
      form.setValue("nome", data.nome);
      form.setValue("TipoPessoa", data.TipoPessoa);
      form.setValue("CPF", data.CPF ?? "");
      form.setValue("CNPJ", data.CNPJ ?? "");
      form.setValue("InscricaoEstadual", data.InscricaoEstadual);
      form.setValue("Endereco.id", data.Endereco.id);
      form.setValue("Endereco.logradouro", data.Endereco.logradouro);
      form.setValue("Endereco.cep", data.Endereco.cep);
      form.setValue("Endereco.bairro", data.Endereco.bairro);
      form.setValue("Endereco.numero", data.Endereco.numero);
      form.setValue("Endereco.CodCidadeIBGE", data.Endereco.CodCidadeIBGE);
      form.setValue("Endereco.complemento", data.Endereco.complemento);
      form.setValue("Endereco.lat", data.Endereco.lat);
      form.setValue("Endereco.lng", data.Endereco.lng);
      form.setValue("Endereco.cidade", data.Endereco.cidade);
      form.setValue("Endereco.estado", data.Endereco.estado);
      form.setValue("Endereco.nomeEstado", data.Endereco.nomeEstado);
    }
  }, [data]);

  return (
    <form onSubmit={form.handleSubmit(onValid, console.log)}>
      <Stack gap="2rem">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Stack gap="1rem">
              <Typography fontWeight={700}>Dados do Responsável</Typography>

              <Controller
                name="TipoPessoa"
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      aria-labelledby={field.name}
                      defaultValue={1}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      row
                      // fix misaligned items
                      sx={{
                        mb: "2px",
                      }}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label="pessoa física"
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label="pessoa jurídica"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />

              {formData.TipoPessoa == 1 && (
                <Controller
                  name="CPF"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="000.000.000-00"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                    >
                      <TextField
                        id={field.name}
                        label="CPF"
                        error={Boolean(fieldState.error?.message)}
                        helperText={fieldState.error?.message}
                      />
                    </InputMask>
                  )}
                />
              )}

              {formData.TipoPessoa == 2 && (
                <Controller
                  name="CNPJ"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <InputMask
                      mask="99.999.999/9999-99"
                      placeholder="00.000.000/0000-00"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                    >
                      <TextField
                        id={field.name}
                        label="CNPJ"
                        error={Boolean(fieldState.error?.message)}
                        helperText={fieldState.error?.message}
                      />
                    </InputMask>
                  )}
                />
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack gap="1rem">
              <Typography fontWeight={700}>Dados do Terminal</Typography>

              <Stack gap="1rem">
                <Controller
                  name="nome"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Nome"
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                      inputRef={field.ref}
                    />
                  )}
                />

                <Controller
                  name="InscricaoEstadual"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Inscrição estadual"
                      type="number"
                      value={field.value}
                      onChange={field.onChange}
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                      inputRef={field.ref}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Stack gap="1rem">
              <Typography fontWeight={700}>Endereço</Typography>

              <Controller
                name="Endereco.cep"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputMask
                    mask="99999-999"
                    placeholder="00000-000"
                    value={field.value}
                    onChange={field.onChange}
                    inputRef={field.ref}
                  >
                    <TextField
                      id={field.name}
                      label="CEP"
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  </InputMask>
                )}
              />

              <Stack gap="1rem" direction="row">
                <Controller
                  name="Endereco.logradouro"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Logradouro"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      disabled
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="Endereco.numero"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Número"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>

              <Stack gap="1rem" direction="row">
                <Controller
                  name="Endereco.complemento"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Complemento"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="Endereco.bairro"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Bairro"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      disabled
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>

              <Stack gap="1rem" direction="row">
                <Controller
                  name="Endereco.cidade"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Cidade"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      disabled
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="Endereco.CodCidadeIBGE"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Código da cidade no IBGE"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>

              <Stack gap="1rem" direction="row">
                <Controller
                  name="Endereco.estado"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Sigla do estado"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      disabled
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="Endereco.nomeEstado"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Nome do estado"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      disabled
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>

              <Stack gap="1rem" direction="row">
                <Controller
                  name="Endereco.lat"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Latitude"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      disabled
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />

                <Controller
                  name="Endereco.lng"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="Longitude"
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                      disabled
                      fullWidth
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
            }}
          >
            <TerminalMap center={center} title={formData.nome} />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              fullWidth
            >
              Enviar
            </LoadingButton>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
}
