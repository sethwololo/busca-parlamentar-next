import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://legis.senado.leg.br/dadosabertos',
  headers: {
    'Content-Type': 'application/json'
  }
});
