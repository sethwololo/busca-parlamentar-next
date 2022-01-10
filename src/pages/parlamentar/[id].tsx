/* eslint-disable no-param-reassign */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  SimpleGrid,
  StatGroup,
  IconButton,
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  HStack,
  Center,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

import { api } from 'services/api';
import { Header } from 'components/Header';

import { Stat } from 'components/Stat';
import { ComissionTable } from 'components/ComissionTable';
import { Footer } from 'components/Footer';

import { useColors } from 'styles/useColors';
import { Senator, SenatorListApiResponse } from 'types/senatorList';
import { Comission, ComissionApiResponse } from 'types/comission';
import { sortBy } from 'lodash';

interface ParlamentarProps {
  senator: Senator | null;
  comissions: {
    asHolder: Comission[];
    asAlternate: Comission[];
  } | null;
}

export default function Parlamentar({ senator, comissions }: ParlamentarProps) {
  // const { data } = useSenatorInfo(String(query.id));
  const { bgColor, borderColor, contentBgColor, textColor } = useColors();

  if (!senator || !comissions) {
    return (
      <Box minH="100vh" bg={bgColor} color={textColor}>
        <Head>
          <title>Erro | Busca Parlamentar</title>
        </Head>
        <Header />
        <Center mx="auto" py="10">
          <Text fontSize="2xl">
            Erro ao buscar os dados... Tentando novamente em 1h
          </Text>
        </Center>
      </Box>
    );
  }

  const {
    SexoParlamentar,
    FormaTratamento,
    NomeParlamentar,
    NomeCompletoParlamentar,
    UrlFotoParlamentar,
    UfParlamentar,
    SiglaPartidoParlamentar,
    UrlPaginaParlamentar,
    MembroMesa,
    MembroLideranca,
  } = senator.IdentificacaoParlamentar;

  const pronoun = SexoParlamentar === 'Masculino' ? 'o' : 'a';

  return (
    <Box minH="100vh" bg={bgColor} color={textColor}>
      <Head>
        <title>{NomeParlamentar} | Busca Parlamentar</title>
        <meta
          name="description"
          content={`Informações sobre ${pronoun} ${FormaTratamento.toLowerCase()}${NomeParlamentar}`}
        />
      </Head>
      <Header />

      <Flex as="main" mx={4} align="center" direction="column" h="full">
        <Flex
          as="section"
          align="center"
          direction="column"
          justify="center"
          w="100%"
          maxW={1120}
          bg={contentBgColor}
          rounded="xl"
          boxShadow="sm"
          p={8}
          position="relative"
          border="1px solid"
          borderColor={borderColor}
        >
          <Link passHref href="/">
            <IconButton
              as="a"
              position="relative"
              top="0"
              left="0"
              mt="-4"
              ml="-4"
              aria-label="Voltar"
              icon={<FiArrowLeft size={24} />}
              alignSelf="start"
            />
          </Link>

          <Avatar
            borderColor={borderColor}
            name={NomeParlamentar}
            src={UrlFotoParlamentar}
            size="2xl"
            showBorder
            color="teal"
            mt="-24"
            boxShadow="md"
          />
          <Flex mt="2">
            <Badge colorScheme="purple" variant="outline" fontSize="sm" mr="1">
              {SiglaPartidoParlamentar}
            </Badge>
            <Badge colorScheme="teal" variant="outline" fontSize="sm">
              {UfParlamentar}
            </Badge>
          </Flex>

          <Heading textAlign="center" mt="2">
            {NomeParlamentar}
          </Heading>
          <HStack
            mt={-1}
            spacing={4}
            fontWeight="medium"
            mx="auto"
            opacity={0.8}
          >
            <Text>{NomeCompletoParlamentar}</Text>
            <Text as="span" fontWeight="normal" opacity={1}>
              |
            </Text>
            <Link passHref href={String(UrlPaginaParlamentar)}>
              <Text as="a" textDecor="underline">
                Página oficial
              </Text>
            </Link>
          </HStack>

          <StatGroup as={SimpleGrid} spacing={4} mt={4}>
            <Stat label="Membro da mesa" data={MembroMesa} />
            <Stat label="Membro da liderança" data={MembroLideranca} />
            <Stat
              label="Titular em"
              data={comissions.asHolder.length}
              helpText="comissões"
            />
            <Stat
              label="Suplente em"
              data={comissions.asAlternate.length}
              helpText="comissões"
            />
          </StatGroup>
        </Flex>

        <Flex
          as="section"
          justify="center"
          w="100%"
          maxW="1120px"
          bg={contentBgColor}
          rounded="xl"
          boxShadow="sm"
          position="relative"
          border="1px solid"
          borderColor={borderColor}
          mt="2"
          mb="8"
        >
          <Tabs
            variant="line"
            colorScheme="teal"
            w="100%"
            maxW="100%"
            isLazy
            isFitted
          >
            <TabList>
              <Tab>Titular</Tab>
              <Tab>Suplente</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ComissionTable comissions={comissions.asHolder} />
              </TabPanel>
              <TabPanel>
                <ComissionTable comissions={comissions.asAlternate} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get<SenatorListApiResponse>(
    '/senador/lista/atual',
  );

  const senatorRawList =
    response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;

  const senatorList = senatorRawList.map(
    senator => senator.IdentificacaoParlamentar,
  );

  return {
    paths: senatorList.map(senator => ({
      params: {
        id: senator.CodigoParlamentar,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const senatorList = await api.get<SenatorListApiResponse>(
      '/senador/lista/atual',
    );

    const senators =
      senatorList.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;

    const senator = senators
      .filter(
        senatorItem =>
          senatorItem.IdentificacaoParlamentar.CodigoParlamentar === params?.id,
      )
      .map(senatorItem => {
        senatorItem.IdentificacaoParlamentar.UrlFotoParlamentar =
          senatorItem.IdentificacaoParlamentar.UrlFotoParlamentar.replace(
            'http',
            'https',
          );
        return senatorItem;
      });

    const comissionResponse = await api.get<ComissionApiResponse>(
      `/senador/${params?.id}/comissoes`,
    );

    const { Comissao } =
      comissionResponse.data.MembroComissaoParlamentar.Parlamentar
        .MembroComissoes;

    const comissions = {
      asHolder: sortBy(
        Comissao.filter(
          comission => comission.DescricaoParticipacao === 'Titular',
        ),
        dateObj => new Date(dateObj.DataInicio),
      ).reverse(),
      asAlternate: sortBy(
        Comissao.filter(
          comission => comission.DescricaoParticipacao === 'Suplente',
        ),
        dateObj => new Date(dateObj.DataInicio),
      ).reverse(),
    };

    return {
      props: {
        senator: senator[0],
        comissions,
      },
      revalidate: 60 * 60 * 24, // 24h
    };
  } catch {
    return {
      props: {
        senator: null,
        comissions: null,
      },
      revalidate: 60 * 30, // 30m
    };
  }
};
