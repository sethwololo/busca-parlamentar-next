export interface Comission {
  IdentificacaoComissao: {
    CodigoComissao: string;
    SiglaComissao: string;
    NomeComissao: string;
    SiglaCasaComissao: string;
  };
  DescricaoParticipacao: 'Titular' | 'Suplente';
  DataInicio: Date;
  DataFim?: Date;
}

export interface ComissionApiResponse {
  MembroComissaoParlamentar: {
    Parlamentar: {
      MembroComissoes: {
        Comissao: Comission[];
      };
    };
  };
}
