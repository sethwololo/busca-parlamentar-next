import Head from 'next/head';
import { GetStaticProps } from 'next';
import {
  Box,
  Flex,
  Input,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

import type { Senator } from 'types/senator';

import { Header } from 'components/Header';
import { Card } from 'components/Card';

import { api } from 'services/api';
import { filterList } from 'lib/filterList';

interface HomeProps {
  senators: Senator[];
}

export default function Home({ senators }: HomeProps) {
  const [searchBox, setSearchBox] = useState('');
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.900', 'gray.50');

  const filteredList = useMemo(
    () => filterList(senators, searchBox),
    [searchBox, senators],
  );

  return (
    <Box bg={bgColor} color={textColor} minH="100vh">
      <Head>
        <title>Busca Parlamentar</title>
      </Head>

      <Header />
      <Flex as="main" mx="2" direction="column">
        <SimpleGrid>
          <Input
            placeholder="Digite o nome ou código parlamentar"
            value={searchBox}
            variant="outline"
            size="md"
            onChange={e => setSearchBox(e.target.value)}
          />
        </SimpleGrid>
        <SimpleGrid
          columns={[1, 2, 2, 3]}
          mx="auto"
          w="100%"
          maxW="1280"
          spacing={4}
          my="8"
        >
          {filteredList.map(senator => (
            <Card
              key={senator.CodigoParlamentar}
              id={senator.CodigoParlamentar}
              name={senator.NomeParlamentar}
              fullName={senator.NomeCompletoParlamentar}
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
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await api.get('/senador/lista/atual');
    const { Parlamentar } =
      response.data.ListaParlamentarEmExercicio.Parlamentares;
    const senators: Senator[] = Parlamentar.map(
      (senator: SenatorListItem) => senator.IdentificacaoParlamentar,
    ).map((senator: Senator) => {
      const photo = senator.UrlFotoParlamentar.replace('http', 'https');
      return {
        ...senator,
        UrlFotoParlamentar: photo,
      };
    });

    return {
      props: {
        senators,
      },
      revalidate: 60 * 60 * 24, // 24h
    };
  } catch {
    // Retorna array vazio caso não consiga encontrar resultados
    return {
      props: {
        senators: [],
      },
      revalidate: 60 * 60 * 2, // 2h
    };
  }
};
