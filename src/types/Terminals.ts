export interface Result {
  success: boolean;
  data: Data;
}

export interface Data {
  pageSize: number;
  pageIndex: number;
  totalResult: number;
  success: boolean;
  data: Terminal[];
}

export interface Terminal {
  id: number;
  nome: string;
  endereco: Endereco;
  idEndereco: number;
  donoCarga: DonoCarga;
  idDonoCarga: number;
  armazem: null;
  idArmazem: null;
  inscricaoEstadual: number;
  idProdutor: null;
  tipoPessoa: number;
  cpf: string;
  cnpj: null;
  blockUpdates: boolean;
}

export interface DonoCarga {
  id: number;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  modoPagamento: number;
  inscricaoEstadual: number;
  modoDescarregamento: number;
  ativo: boolean;
  tipo: number;
  ddi: string;
  ddd: string;
  numero: string;
  endereco: null;
  idEndereco: number;
  informarKM: boolean;
  socio: any[];
  documento: any[];
  donoCargaRepasse: any[];
}

export interface Endereco {
  id: number;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  cep: string;
  lat: string;
  gPlusCode: null;
  lng: string;
  cidade: string;
  estado: number;
  siglaEstado: string;
  nomeEstado: string;
  codCidadeIBGE: number;
}
