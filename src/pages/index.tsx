import Head from 'next/head';
import { GetStaticProps } from 'next';
import {
  Box,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChangeEvent, useMemo, useState, useEffect } from 'react';
import { debounce } from 'lodash';

import type { Senator } from 'types/senator';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Card } from 'components/Card';

import { api, apiIbge } from 'services/api';
import { filterList } from 'lib/filterList';
import { Pagination } from 'components/Pagination';

interface HomeProps {
  senators: Senator[];
  parties: {
    Sigla: string;
    Nome: string;
  }[];
  states: {
    nome: string;
    sigla: string;
  }[];
}

export default function Home({ senators, parties, states }: HomeProps) {
  const [searchBox, setSearchBox] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [page, setPage] = useState(1);

  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const inputFocusColor = useColorModeValue('teal.500', 'teal.200');
  const contentBgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const pageStart = (Number(page) - 1) * Number(18);
  const pageEnd = pageStart + Number(18);

  const handleSearchboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchBox(event.target?.value);
  };

  const handleSearchboxDebounce = useMemo(
    () => debounce(handleSearchboxChange, 300),
    [],
  );

  const filteredList = useMemo(
    () =>
      filterList({
        searchBox,
        party: selectedParty,
        state: selectedState,
        senatorList: senators,
      }),
    [searchBox, selectedParty, selectedState, senators],
  );

  useEffect(
    () => () => {
      handleSearchboxDebounce.cancel();
    },
    [handleSearchboxDebounce],
  );

  return (
    <Box bg={bgColor} color={textColor} minH="100vh">
      <Head>
        <title>Busca Parlamentar</title>
        <meta
          name="description"
          content="Busque informações sobre os parlamentares do Senado Federal rapidamente."
        />
      </Head>

      <Header />
      <Flex as="main" mx="2" direction="column">
        <Stack
          direction={['column', 'row']}
          columns={3}
          maxW={1120}
          mx="auto"
          bg={contentBgColor}
          p={6}
          rounded="lg"
          border="1px"
          boxShadow="sm"
          borderColor={borderColor}
        >
          <Input
            placeholder="Digite o nome ou código parlamentar"
            variant="outline"
            size="md"
            onChange={handleSearchboxDebounce}
            focusBorderColor={inputFocusColor}
          />

          <Select
            value={selectedParty}
            placeholder="Partido"
            onChange={e => setSelectedParty(e.target.value)}
            maxW={['full', 'full', '20%']}
            focusBorderColor={inputFocusColor}
          >
            {parties.map(party => (
              <option key={party.Sigla} value={party.Sigla}>
                {party.Sigla} - {party.Nome}
              </option>
            ))}
          </Select>

          <Select
            placeholder="UF"
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            maxW={['full', 'full', '20%']}
            focusBorderColor={inputFocusColor}
          >
            {states.map(state => (
              <option value={state.sigla} key={state.sigla}>
                {state.sigla} - {state.nome}
              </option>
            ))}
          </Select>
        </Stack>
        {filteredList.length <= 0 ? (
          <Box mx="auto" px={2} mt={10}>
            <Text fontSize="xl">Nenhum resultado encontrado :(</Text>
          </Box>
        ) : (
          <>
            <SimpleGrid
              columns={[1, 2, 2, 3]}
              mx="auto"
              w="100%"
              maxW="1280"
              spacing={4}
              my="8"
            >
              {filteredList.slice(pageStart, pageEnd).map(senator => (
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
            <Box
              mx="auto"
              p={2}
              bg={contentBgColor}
              rounded="lg"
              border="1px"
              boxShadow="sm"
              borderColor={borderColor}
            >
              <Pagination
                registersPerPage={18}
                totalCountOfRegisters={filteredList.length}
                onPageChange={setPage}
                currentPage={page}
              />
            </Box>
          </>
        )}
      </Flex>
      <Footer />
    </Box>
  );
}

type SenatorListItem = {
  IdentificacaoParlamentar: Senator;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const responseSenators = await api.get('/senador/lista/atual');

    const { Parlamentar } =
      responseSenators.data.ListaParlamentarEmExercicio.Parlamentares;

    const senators: Senator[] = Parlamentar.map(
      (senator: SenatorListItem) => senator.IdentificacaoParlamentar,
    ).map((senator: Senator) => {
      const photo = senator.UrlFotoParlamentar.replace('http', 'https');
      return {
        ...senator,
        UrlFotoParlamentar: photo,
      };
    });

    const responseParties = await api.get('/senador/partidos');
    const parties = responseParties.data.ListaPartidos.Partidos.Partido;

    const responseStates = await apiIbge.get('/estados');
    const states = responseStates.data;

    return {
      props: {
        senators,
        parties,
        states,
      },
      revalidate: 60 * 60 * 24, // 24h
    };
  } catch {
    // Retorna array vazio caso não consiga encontrar resultados
    return {
      props: {
        senators: [],
        parties: [{}],
        states: [{}],
      },
      revalidate: 60 * 60 * 2, // 2h
    };
  }
};
