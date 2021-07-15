import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';

import type { Senator } from 'types/senator';

import { Header } from 'components/Header';
import { Card } from 'components/Card';

import { dehydrate } from 'react-query/hydration';
import { queryClient } from 'services/queryClient';
import { getSenatorlist, useSenatorList } from 'services/hooks/useSenatorList';

interface HomeProps {
  senators: Senator[];
}

export default function Home() {
  const { data } = useSenatorList();

  return (
    <Box bg="gray.100" color="gray.900" minH="100vh">
      <Head>
        <title>Busca Parlamentar</title>
      </Head>


      <Header />
      <Flex as="main" mx="2">
        <SimpleGrid columns={[1, 2, 3]} mx="auto" w="100%" maxW="1280" spacing={4} my="8">
          {data?.senators.map(senator => (
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

export const getStaticProps: GetStaticProps = async () => {
  await queryClient.prefetchQuery('senator-list', getSenatorlist);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24 // 24h
  }
}
