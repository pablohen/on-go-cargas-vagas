export interface UpsertTerminal {
  Id: number;
  idDonoCarga: number;
  nome: string;
  TipoPessoa: number;
  CPF: string;
  CNPJ: string;
  InscricaoEstadual: number;
  Endereco: Endereco;
}

export interface Endereco {
  id: number;
  logradouro: string;
  cep: string;
  bairro: string;
  numero: string;
  CodCidadeIBGE: number;
  complemento: string;
  lat: number;
  lng: number;
  cidade: string;
  estado: string;
  nomeEstado: string;
}
