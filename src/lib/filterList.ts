import { Senator } from 'types/senator';

type FilterListProps = {
  senatorList: Senator[];
  searchBox: string;
  party: string;
  state: string;
};

export function filterList({
  senatorList,
  searchBox,
  party,
  state,
}: FilterListProps) {
  return senatorList
    .filter(senator => {
      if (searchBox === '') {
        return senator;
      }
      const normalizedFilter = searchBox
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      const normalizedName = senator?.NomeParlamentar.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      const normalizedFullName = senator?.NomeCompletoParlamentar.normalize(
        'NFD',
      )
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
      const senatorCode = senator?.CodigoParlamentar;

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
      return state === senator.UfParlamentar;
    })
    .filter(senator => {
      if (party === '') {
        return senator;
      }
      return party === senator.SiglaPartidoParlamentar;
    });
}
