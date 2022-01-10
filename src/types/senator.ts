export interface IdentificacaoParlamentar {
  CodigoParlamentar: string;
  CodigoPublicoNaLegAtual: string;
  NomeParlamentar: string;
  NomeCompletoParlamentar: string;
  SexoParlamentar: string;
  UrlFotoParlamentar: string;
  UrlPaginaParlamentar: string;
  UrlPaginaParticular: string;
  EmailParlamentar: string;
  SiglaPartidoParlamentar: string;
  UfParlamentar: string;
}

export interface Telefone {
  NumeroTelefone: string;
  OrdemPublicacao: string;
  IndicadorFax: string;
}

export interface DadosBasicosParlamentar {
  DataNascimento: Date;
  Naturalidade: string;
  UfNaturalidade: string;
  EnderecoParlamentar: string;
}
export interface Senator {
  IdentificacaoParlamentar: IdentificacaoParlamentar;
  DadosBasicosParlamentar: DadosBasicosParlamentar;
  Telefones: Telefone[];
}

export interface SenatorApiResponse {
  Parlamentar: Senator;
}
