import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import type { Senator } from 'types/senator';

import { api } from "services/api";

interface SenatorProps {}

export default function Parlamentar({senator}) {
  console.log(senator)

  return (
    <>
    <Head>
      <title>Senador | Busca Parlamentar</title>
    </Head>
    <h1>senator</h1>
    </>
  );
}

type SenatorListItem = {
  IdentificacaoParlamentar: Senator[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/senador/lista/atual')
  const { Parlamentar } = response.data.ListaParlamentarEmExercicio.Parlamentares;
  const senatorList = Parlamentar.map((senator: SenatorListItem) => senator.IdentificacaoParlamentar);
  const senatorIds = senatorList.map((senator: Senator) => senator.CodigoParlamentar);

  return {
    paths: [...senatorIds],
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await api.get(`/senador/${params?.id}`);
  const senator = response.data.DetalheParlamentar.Parlamentar;

  return {
    props: {
      senator,
    }
  };
}