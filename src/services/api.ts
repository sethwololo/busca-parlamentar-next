import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://legis.senado.leg.br/dadosabertos',
  headers: {
    accept: 'application/json',
  },
});

export const apiIbge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
  headers: {
    accept: 'application/json',
  },
});
