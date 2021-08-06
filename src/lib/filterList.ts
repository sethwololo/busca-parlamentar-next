import { Senator } from 'types/senator';

export function filterList(senatorList: Senator[], searchBox: string) {
  return senatorList.filter(senator => {
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
    const normalizedFullName = senator?.NomeCompletoParlamentar.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const senatorCode = senator?.CodigoParlamentar;

    return (
      normalizedName.includes(normalizedFilter) ||
      normalizedFullName.includes(normalizedFilter) ||
      senatorCode.includes(normalizedFilter)
    );
  });
}
