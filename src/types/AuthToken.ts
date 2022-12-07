export interface AuthToken {
  nbf: number;
  exp: number;
  iss: string;
  aud: string[];
  client_id: string;
  sub: string;
  auth_time: number;
  idp: string;
  Permissao: string[];
  role: string;
  strc: string;
  tenant: string;
  identificador_empresa: string;
  OcpApimSubscriptionKey: string;
  jti: string;
  iat: number;
  scope: string[];
  amr: string[];
}
