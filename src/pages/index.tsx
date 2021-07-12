import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';

import type { Senator } from 'types/senator';

import { Header } from 'components/Header';
import { Card } from 'components/Card';

import { api } from 'services/api';

interface HomeProps {
  senators: Senator[];
}

export default function Home({ senators }: HomeProps) {

  useEffect(() => {
    console.log(senators)

  }, [senators])
  return (
    <Box bg="gray.100" color="gray.900">
      <Head>
        <title>Busca Parlamentar</title>
      </Head>


      <Header />
      <Flex as="main" mx="2">
        <SimpleGrid columns={[1, 2, 3]} mx="auto" w="100%" maxW="1280" spacing={4} my="8">
          {senators.map(senator => (
            <Card
              key={senator.CodigoParlamentar}
              id={senator.CodigoParlamentar}
              name={senator.NomeParlamentar}
              party={senator.SiglaPartidoParlamentar}
              uf={senator.UfParlamentar}
              photoUrl={senator.UrlFotoParlamentar}
            />
          ))}

        </SimpleGrid>
      </Flex>

    </Box>
  );
}

type SenatorListItem = {
  IdentificacaoParlamentar: Senator[];
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/senador/lista/atual')
  const { Parlamentar } = response.data.ListaParlamentarEmExercicio.Parlamentares;
  const senators = Parlamentar.map((senator: SenatorListItem) => senator.IdentificacaoParlamentar)

  return {
    props: {
      senators
    }
  }
}
