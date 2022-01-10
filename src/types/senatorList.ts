interface Exercicio {
  CodigoExercicio: string;
  DataInicio: Date;
  DataFim?: Date;
  SiglaCausaAfastamento?: string;
  DescricaoCausaAfastamento?: string;
  DataLeitura?: Date;
}

interface LegislaturaDoMandato {
  NumeroLegislatura: string;
  DataInicio: Date;
  DataFim: Date;
}

interface Titular {
  DescricaoParticipacao: '1º Suplente' | '2º Suplente' | 'Titular';
  CodigoParlamentar: string;
  NomeParlamentar: string;
}

export interface Mandato {
  CodigoMandato: string;
  UfParlamentar: string;
  PrimeiraLegislaturaDoMandato: LegislaturaDoMandato;
  SegundaLegislaturaDoMandato: LegislaturaDoMandato;
  DescricaoParticipacao: '1º Suplente' | '2º Suplente' | 'Titular';
  Suplentes: { Suplente: Titular[] };
  Exercicios: { Exercicio: Exercicio[] };
  Titular?: Titular;
}

interface Telefone {
  NumeroTelefone: string;
  OrdemPublicacao: string;
  IndicadorFax: 'Não' | 'Sim';
}

export interface IdentificacaoParlamentar {
  CodigoParlamentar: string;
  CodigoPublicoNaLegAtual: string;
  NomeParlamentar: string;
  NomeCompletoParlamentar: string;
  SexoParlamentar: 'Feminino' | 'Masculino';
  FormaTratamento: 'Senador' | 'Senadora';
  UrlFotoParlamentar: string;
  UrlPaginaParlamentar: string;
  UrlPaginaParticular?: string;
  EmailParlamentar?: string;
  Telefones: {
    Telefone: Telefone[] | Telefone;
  };
  SiglaPartidoParlamentar: string;
  UfParlamentar: string;
  MembroMesa: 'Não' | 'Sim';
  MembroLideranca: 'Não' | 'Sim';
}

export interface Senator {
  IdentificacaoParlamentar: IdentificacaoParlamentar;
  Mandato: Mandato;
}

export interface SenatorListApiResponse {
  ListaParlamentarEmExercicio: {
    Parlamentares: {
      Parlamentar: Senator[];
    };
  };
}
