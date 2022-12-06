import { Terminal } from "../types/Terminal";
import { UpsertTerminal } from "../types/UpsertTerminal";

export function mapTerminalToUpsertTerminal(data: Terminal): UpsertTerminal {
  const upsertTerminal: UpsertTerminal = {
    Id: data.id,
    idDonoCarga: data.idDonoCarga,
    nome: data.nome,
    TipoPessoa: data.tipoPessoa,
    CPF: data.cpf ?? "",
    CNPJ: data.cnpj,
    InscricaoEstadual: data.inscricaoEstadual ?? 0,
    Endereco: {
      id: data.endereco.id,
      logradouro: data.endereco.logradouro,
      cep: data.endereco.cep,
      bairro: data.endereco.bairro,
      numero: data.endereco.numero,
      CodCidadeIBGE: data.endereco.codCidadeIBGE,
      complemento: data.endereco.complemento,
      lat: Number(data.endereco.lat),
      lng: Number(data.endereco.lng),
      cidade: data.endereco.cidade,
      estado: String(data.endereco.estado),
      nomeEstado: data.endereco.nomeEstado,
    },
  };

  return upsertTerminal;
}
