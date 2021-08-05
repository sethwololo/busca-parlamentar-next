import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Box, Flex, Input, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import type { Senator } from 'types/senator';

import { Header } from 'components/Header';
import { Card } from 'components/Card';

import { dehydrate } from 'react-query/hydration';
import { queryClient } from 'services/queryClient';
import { getSenatorlist, useSenatorList } from 'services/hooks/useSenatorList';
import { api } from 'services/api';

interface HomeProps {
  senators: Senator[];
}

export default function Home({ senators }: HomeProps) {
  // const { data } = useSenatorList();
  // const senatorList = data;
  // const [filteredList, setFilteredList] = useState([...senatorList]);
  const [searchBox, setSearchBox] = useState('');
  // console.log(senators)

  const filteredList = useMemo(() =>
    senators.filter(
      senator => {
        console.log(senator)
        if (searchBox === '') {
          return senator;
        }
        const normalizedFilter = searchBox?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const normalizedName = senator?.NomeParlamentar.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const senatorCode = senator?.CodigoParlamentar;
        const normalizedFullName = senator?.NomeCompletoParlamentar.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        return normalizedName.includes(normalizedFilter) || normalizedFullName.includes(normalizedFilter) || senatorCode.includes(normalizedFilter);
      }), 
  [searchBox, senators]);

  return (
    <Box bg="gray.100" color="gray.900" minH="100vh">
      <Head>
        <title>Busca Parlamentar</title>
      </Head>


      <Header />
      <Flex as="main" mx="2" direction="column">
        <SimpleGrid >
          <Input
            placeholder="Digite o nome ou código parlamentar"
            value={searchBox}
            variant="outline"
            size="md"
            onChange={e => setSearchBox(e.target.value)}
          />
        </SimpleGrid>
        <SimpleGrid columns={[1, 2, 3]} mx="auto" w="100%" maxW="1280" spacing={4} my="8">
          {filteredList.map(senator => (
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
  IdentificacaoParlamentar: Senator;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get('/senador/lista/atual');
    const { Parlamentar } = response.data.ListaParlamentarEmExercicio.Parlamentares;
    const senators: Senator[] = Parlamentar
      .map((senator: SenatorListItem) => senator.IdentificacaoParlamentar)
      .map((senator: Senator) => {
        const photo = senator.UrlFotoParlamentar.replace('http', 'https')
        return {
          ...senator,
          UrlFotoParlamentar: photo,
        }
      });

    return {
      props: {
        senators,
      },
      revalidate: 60 * 60 * 24 // 24h
    }
  } catch {
    return {
      props: {
        senators: [],
      },
      revalidate: 60 * 60 * 2 // 2h
    }
  }
}