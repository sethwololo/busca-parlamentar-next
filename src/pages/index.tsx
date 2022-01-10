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
} from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
import { debounce } from 'lodash';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Card } from 'components/Card';
import { Pagination } from 'components/Pagination';

import { api, apiIbge } from 'services/api';
import { useColors } from 'styles/useColors';
import {
  IdentificacaoParlamentar,
  SenatorListApiResponse,
} from 'types/senatorList';
import { State, StatesApiResponse } from 'types/states';
import { useFilter } from 'hooks/useFilter';

interface HomeProps {
  senators: IdentificacaoParlamentar[];
  parties: {
    Sigla: string;
    Nome: string;
  }[];
  states: State[];
}

export default function Home({ senators, parties, states }: HomeProps) {
  const [filterText, setfilterText] = useState('');
  const [selectedParty, setSelectedParty] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [page, setPage] = useState(1);

  const { bgColor, borderColor, contentBgColor, inputFocusColor, textColor } =
    useColors();

  const filteredList = useFilter({
    filterText,
    senators,
    party: selectedParty,
    state: selectedState,
  });

  const pageStart = (Number(page) - 1) * Number(18);
  const pageEnd = pageStart + Number(18);

  const handleFilterboxChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setfilterText(event.target?.value);
    },
    300,
  );

  const handlePartyChange = debounce(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setPage(1);
      setSelectedParty(event.target?.value);
    },
    300,
  );
  const handleStateChange = debounce(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setPage(1);
      setSelectedState(event.target?.value);
    },
    300,
  );

  // const handleFilterboxDebounce = debounce(handleSearchboxChange, 250);
  // const handle = debounce(handleSearchboxChange, 250);
  // const handleFilterboxDebounce = debounce(handleSearchboxChange, 250);

  useEffect(
    () => () => {
      handleFilterboxChange.cancel();
      handlePartyChange.cancel();
      handleStateChange.cancel();
    },
    [handleFilterboxChange, handlePartyChange, handleStateChange],
  );

  if (senators.length > 0) {
    return (
      <Box minH="100vh" bg={bgColor} color={textColor}>
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
              onChange={handleFilterboxChange}
              focusBorderColor={inputFocusColor}
            />

            <Select
              placeholder="Partido"
              onChange={handlePartyChange}
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
              onChange={handleStateChange}
              maxW={['full', 'full', '20%']}
              focusBorderColor={inputFocusColor}
            >
              {states.map(state => (
                <option key={state.sigla} value={state.sigla}>
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
                {filteredList.slice(pageStart, pageEnd).map(senator => {
                  const {
                    CodigoParlamentar,
                    NomeParlamentar,
                    NomeCompletoParlamentar,
                    SiglaPartidoParlamentar,
                    UfParlamentar,
                    UrlFotoParlamentar,
                  } = senator;

                  return (
                    <Card
                      key={CodigoParlamentar}
                      id={CodigoParlamentar}
                      name={NomeParlamentar}
                      fullName={NomeCompletoParlamentar}
                      party={SiglaPartidoParlamentar}
                      uf={UfParlamentar}
                      photoUrl={UrlFotoParlamentar}
                    />
                  );
                })}
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

  return <div>Loading...</div>;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const responseSenators = await api.get<SenatorListApiResponse>(
      '/senador/lista/atual',
    );

    const { Parlamentar } =
      responseSenators.data.ListaParlamentarEmExercicio.Parlamentares;

    const senators = Parlamentar.map(
      senator => senator.IdentificacaoParlamentar,
    ).map(senator => {
      const photo = senator.UrlFotoParlamentar.replace('http', 'https');
      return {
        ...senator,
        UrlFotoParlamentar: photo,
      };
    });

    const responseParties = await api.get('/senador/partidos');
    const parties = responseParties.data.ListaPartidos.Partidos.Partido;

    const responseStates = await apiIbge.get<StatesApiResponse>(
      '/estados?orderBy=nome',
    );
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
