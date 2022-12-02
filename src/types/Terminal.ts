export interface Result {
  success: boolean;
  data: Terminal;
}

export interface Terminal {
  id: number;
  nome: string;
  endereco: Endereco;
  idEndereco: number;
  donoCarga: DonoCarga;
  idDonoCarga: number;
  inscricaoEstadual: null;
  idProdutor: null;
  tipoPessoa: number;
  cpf: null;
  cnpj: string;
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
  lng: string;
  cidade: string;
  estado: number;
  siglaEstado: string;
  nomeEstado: string;
  codCidadeIBGE: number;
}
