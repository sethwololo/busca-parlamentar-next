export type Senator = {
  CodigoParlamentar: string;
  CodigoPublicoNaLegAtual: string;
  NomeParlamentar: string;
  NomeCompletoParlamentar: string;
  SexoParlamentar: string;
  FormaTratamento: string;
  UrlFotoParlamentar: string;
  UrlPaginaParlamentar: string;
  UrlPaginaParticular: string;
  EmailParlamentar: string;
  Telefones: {
    Telefone: {
      NumeroTelefone: string;
      OrdemPublicacao: string;
      IndicadorFax: string;
    }[];
  };
  SiglaPartidoParlamentar: string;
  UfParlamentar: string;
  MembroMesa: string;
  MembroLideranca: string;
};
export type Comission = {
  IdentificacaoComissao: {
    CodigoComissao: string;
    SiglaComissao: string;
    NomeComissao: string;
    SiglaCasaComissao: string;
    NomeCasaComissao: string;
  };
  DescricaoParticipacao: 'Titular' | 'Suplente';
  DataInicio: string;
  DataFim: string;
};

export type SenatorInfo = {
  IdentificacaoParlamentar: {
    CodigoParlamentar: string;
    EmailParlamentar: string;
    // FormaTratamento: string;
    NomeCompletoParlamentar: string;
    NomeParlamentar: string;
    // SexoParlamentar: string;
    SiglaPartidoParlamentar: string;
    UfParlamentar: string;
    UrlFotoParlamentar: string;
    UrlPaginaParlamentar: string;
  };
  MembroAtualComissoes: {
    Comissao: Comission[];
  };
  ComissoesTitular: Comission[];
  ComissoesSuplente: Comission[];
  MembroMesa: string;
  MembroLideranca: string;
};
