export type Senator = {
  CodigoParlamentar: string;
  CodigoPublicoNaLegAtual: string,
  NomeParlamentar: string,
  NomeCompletoParlamentar: string,
  SexoParlamentar: string,
  FormaTratamento: string,
  UrlFotoParlamentar: string,
  UrlPaginaParlamentar: string,
  UrlPaginaParticular: string,
  EmailParlamentar: string,
  Telefones: {
    Telefone: {
      NumeroTelefone: string,
      OrdemPublicacao: string,
      IndicadorFax: string
    }[]
  },
  SiglaPartidoParlamentar: string,
  UfParlamentar: string,
  MembroMesa: string,
  MembroLideranca: string,
}