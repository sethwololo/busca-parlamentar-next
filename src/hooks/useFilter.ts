import { useMemo } from 'react';
import { IdentificacaoParlamentar } from 'types/senatorList';

interface UseFilterParams {
  senators: IdentificacaoParlamentar[];
  filterText: string;
  party: string;
  state: string;
}

function normalize(string: string) {
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function useFilter({
  filterText,
  party,
  senators,
  state,
}: UseFilterParams) {
  const filteredList = useMemo(
    () =>
      senators
        .filter(senator => {
          if (filterText === '') {
            return senator;
          }

          const {
            NomeParlamentar,
            NomeCompletoParlamentar,
            CodigoParlamentar,
          } = senator;

          const normalizedFilter = normalize(filterText);
          const normalizedName = normalize(NomeParlamentar);
          const normalizedFullName = normalize(NomeCompletoParlamentar);
          const senatorCode = CodigoParlamentar;

          return (
            normalizedName.includes(normalizedFilter) ||
            normalizedFullName.includes(normalizedFilter) ||
            senatorCode.includes(normalizedFilter)
          );
        })
        .filter(senator => {
          if (state === '') {
            return senator;
          }
          const { UfParlamentar } = senator;
          return state === UfParlamentar;
        })
        .filter(senator => {
          if (party === '') {
            return senator;
          }
          const { SiglaPartidoParlamentar } = senator;
          return party === SiglaPartidoParlamentar;
        }),
    [filterText, party, senators, state],
  );

  return filteredList;
}
