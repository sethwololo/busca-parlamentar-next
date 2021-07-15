import { useQuery, UseQueryResult, } from 'react-query';
import { api } from 'services/api';
import { SenatorInfo, Senator, Comission } from 'types/senator';

type SenatorListItem = {
  IdentificacaoParlamentar: Senator;
}

type SenatorListObject = {
  senators: Senator[];
}

export const getSenatorlist = async (): Promise<SenatorListObject> => {
  const response = await api.get('/senador/lista/atual');
  const { Parlamentar } = response.data.ListaParlamentarEmExercicio.Parlamentares;
  const senators = Parlamentar.map((senator: SenatorListItem) => senator.IdentificacaoParlamentar)

  return { senators };
}

export const useSenatorList = (): UseQueryResult<SenatorListObject> => {
  return useQuery('senator-list', getSenatorlist, {
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });
}
