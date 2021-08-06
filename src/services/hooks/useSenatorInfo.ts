import { useQuery, UseQueryResult } from 'react-query';
import { api } from 'services/api';
import { compareAsc, format } from 'date-fns';
import { SenatorInfo, Senator, Comission } from 'types/senator';

type SenatorListItem = {
  IdentificacaoParlamentar: Senator;
};

export const getSenatorInfo = async (id: string): Promise<SenatorInfo> => {
  const responseSenator = await api.get(`/senador/${id}/comissoes`);

  const senatorData =
    responseSenator.data.MembroComissaoParlamentar.Parlamentar;
  const comissionList = senatorData.MembroComissoes.Comissao;

  // Gambiarra pra pegar informações que faltam na api
  const responseList = await api.get(`/senador/lista/atual`);
  const senatorList =
    responseList.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
  const senator = senatorList
    .filter(
      ({ IdentificacaoParlamentar }: SenatorListItem) =>
        IdentificacaoParlamentar.CodigoParlamentar === id,
    )
    .pop();
  const { MembroMesa, MembroLideranca } = senator.IdentificacaoParlamentar;

  const ComissoesTitular = comissionList
    .filter(
      (comission: Comission) => comission.DescricaoParticipacao === 'Titular',
    )
    .sort((a: Comission, b: Comission) =>
      compareAsc(new Date(b.DataInicio), new Date(a.DataInicio)),
    )
    .map((comission: Comission) => ({
      ...comission,
      DataInicio: format(new Date(comission.DataInicio), 'P'),
      DataFim: comission.DataFim
        ? format(new Date(comission.DataFim), 'P')
        : '-',
    }));

  const ComissoesSuplente = comissionList
    .filter(
      (comission: Comission) => comission.DescricaoParticipacao === 'Suplente',
    )
    .sort((a: Comission, b: Comission) =>
      compareAsc(new Date(b.DataInicio), new Date(a.DataInicio)),
    )
    .map((comission: Comission) => ({
      ...comission,
      DataInicio: format(new Date(comission.DataInicio), 'P'),
      DataFim: comission.DataFim
        ? format(new Date(comission.DataFim), 'P')
        : '-',
    }));

  return {
    ...senatorData,
    ComissoesTitular,
    ComissoesSuplente,
    MembroMesa,
    MembroLideranca,
  };
};

export const useSenatorInfo = (id: string): UseQueryResult<SenatorInfo> =>
  useQuery(['senator-info', id], () => getSenatorInfo(id), {
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });
