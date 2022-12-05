import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useBrasilApi } from "../../hooks/useBrasilApi";
import { UpsertTerminal } from "../../types/UpsertTerminal";

const schema = z.object({
  Id: z.number(),
  idDonoCarga: z.number(),
  nome: z.string().min(3, "Mínimo de 3 caracteres"),
  TipoPessoa: z.number(),
  CPF: z.string(),
  CNPJ: z.string(),
  InscricaoEstadual: z.number(),
  Endereco: z.object({
    id: z.number(),
    logradouro: z.string(),
    cep: z.string(),
    bairro: z.string(),
    numero: z.string(),
    CodCidadeIBGE: z.number(),
    complemento: z.string(),
    lat: z.number(),
    lng: z.number(),
    cidade: z.string(),
    estado: z.string(),
    nomeEstado: z.string(),
  }),
});

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
  onValid: (data: FormSchema, e: any) => void;
}

export function TerminalForm({ data, loading, onValid }: Props) {
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState("");

  const { getAddressByCep } = useBrasilApi();
  const addressQuery = getAddressByCep(search);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const formData = form.watch();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  });

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: formData.Endereco.lat ?? 0,
    lng: formData.Endereco.lng ?? 0,
  };

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (formData.Endereco.cep.length >= 8) {
      setSearch(formData.Endereco.cep);
    }
  }, [formData.Endereco.cep]);

  useEffect(() => {
    if (addressQuery.data) {
      form.setValue("Endereco.logradouro", addressQuery.data.street);
      form.setValue("Endereco.bairro", addressQuery.data.neighborhood);
      form.setValue(
        "Endereco.lat",
        Number(
          formData.Endereco.lat ??
            addressQuery.data.location.coordinates.latitude ??
            0
        )
      );
      form.setValue(
        "Endereco.lng",
        Number(
          formData.Endereco.lng ??
            addressQuery.data.location.coordinates.longitude ??
            0
        )
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
    <Box>
      <form onSubmit={form.handleSubmit(onValid, console.log)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Stack gap="1rem">
              <Controller
                name="Id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Id"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="idDonoCarga"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="idDonoCarga"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="nome"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Nome"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="TipoPessoa"
                control={form.control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel id={field.name}>Tipo de pessoa</FormLabel>

                    <RadioGroup
                      aria-labelledby={field.name}
                      defaultValue={1}
                      name={field.name}
                      row
                      value={field.value}
                      onChange={field.onChange}
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
                    <TextField
                      id={field.name}
                      label="CPF"
                      value={field.value}
                      onChange={field.onChange}
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}

              {formData.TipoPessoa == 2 && (
                <Controller
                  name="CNPJ"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      id={field.name}
                      label="CNPJ"
                      value={field.value}
                      onChange={field.onChange}
                      error={Boolean(fieldState.error?.message)}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}

              <Controller
                name="InscricaoEstadual"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Inscrição estadual"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Typography>Endereço</Typography>

              <Controller
                name="Endereco.cep"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="CEP"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="Endereco.id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Endereco.id"
                    value={field.value}
                    onChange={field.onChange}
                    disabled
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="Endereco.logradouro"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Logradouro"
                    value={field.value}
                    onChange={field.onChange}
                    disabled
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
                    disabled
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
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="Endereco.complemento"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Complemento"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="Endereco.lat"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Latitude"
                    value={field.value}
                    onChange={field.onChange}
                    disabled
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
                    disabled
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="Endereco.cidade"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Cidade"
                    value={field.value}
                    onChange={field.onChange}
                    disabled
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="Endereco.estado"
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    id={field.name}
                    label="Sigla do estado"
                    value={field.value}
                    onChange={field.onChange}
                    disabled
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
                    disabled
                    error={Boolean(fieldState.error?.message)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} lg={6}>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                center={center}
              >
                <Marker position={center} title={formData.nome} />
              </GoogleMap>
            )}
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              fullWidth
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
