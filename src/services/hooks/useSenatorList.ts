import { useQuery, UseQueryResult } from 'react-query';
import { api } from 'services/api';
import { Senator } from 'types/senator';

type SenatorListItem = {
  IdentificacaoParlamentar: Senator;
};

export const getSenatorlist = async (): Promise<Senator[]> => {
  const response = await api.get('/senador/lista/atual');
  const { Parlamentar } =
    response.data.ListaParlamentarEmExercicio.Parlamentares;
  const senators: Senator[] = Parlamentar.map(
    (senator: SenatorListItem) => senator.IdentificacaoParlamentar,
  );

  return senators;
};

export const useSenatorList = (): UseQueryResult<Senator[]> =>
  useQuery('senator-list', getSenatorlist, {
    staleTime: 1000 * 60 * 60 * 24, // 24h
    initialData: [],
  });
