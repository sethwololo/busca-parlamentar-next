export interface SenatorApiResponse {
  Parlamentar: Senator;
}

export interface Senator {
  IdentificacaoParlamentar: IdentificacaoParlamentar;
  DadosBasicosParlamentar:  DadosBasicosParlamentar;
  Telefones:                Telefone[];
}

export interface DadosBasicosParlamentar {
  DataNascimento:      Date;
  Naturalidade:        string;
  UfNaturalidade:      string;
  EnderecoParlamentar: string;
}

export interface IdentificacaoParlamentar {
  CodigoParlamentar:       string;
  CodigoPublicoNaLegAtual: string;
  NomeParlamentar:         string;
  NomeCompletoParlamentar: string;
  SexoParlamentar:         string;
  UrlFotoParlamentar:      string;
  UrlPaginaParlamentar:    string;
  UrlPaginaParticular:     string;
  EmailParlamentar:        string;
  SiglaPartidoParlamentar: string;
  UfParlamentar:           string;
}

export interface Telefone {
  NumeroTelefone:  string;
  OrdemPublicacao: string;
  IndicadorFax:    string;
}









// export type Senator = {
//   CodigoParlamentar: string;
//   CodigoPublicoNaLegAtual: string;
//   NomeParlamentar: string;
//   NomeCompletoParlamentar: string;
//   SexoParlamentar: string;
//   FormaTratamento: string;
//   UrlFotoParlamentar: string;
//   UrlPaginaParlamentar: string;
//   UrlPaginaParticular: string;
//   EmailParlamentar: string;
//   Telefones: {
//     Telefone: {
//       NumeroTelefone: string;
//       OrdemPublicacao: string;
//       IndicadorFax: string;
//     }[];
//   };
//   SiglaPartidoParlamentar: string;
//   UfParlamentar: string;
//   MembroMesa: string;
//   MembroLideranca: string;
// };


// export type SenatorInfo = {
//   IdentificacaoParlamentar: {
//     CodigoParlamentar: string;
//     EmailParlamentar: string;
//     FormaTratamento: string;
//     NomeCompletoParlamentar: string;
//     NomeParlamentar: string;
//     SexoParlamentar: string;
//     SiglaPartidoParlamentar: string;
//     UfParlamentar: string;
//     UrlFotoParlamentar: string;
//     UrlPaginaParlamentar: string;
//   };
//   MembroAtualComissoes: {
//     Comissao: Comission[];
//   };
//   ComissoesTitular: Comission[];
//   ComissoesSuplente: Comission[];
//   MembroMesa: string;
//   MembroLideranca: string;
// };
