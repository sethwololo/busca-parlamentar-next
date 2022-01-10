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
  useColorModeValue,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { dehydrate } from 'react-query/hydration';
import { useRouter } from 'next/router';
import Link from 'next/link';

import type { Senator } from 'types/senator';

import { api } from 'services/api';
import { Header } from 'components/Header';

import { Stat } from 'components/Stat';
import { queryClient } from 'services/queryClient';
import { getSenatorInfo, useSenatorInfo } from 'services/hooks/useSenatorInfo';
import { ComissionTable } from 'components/ComissionTable';
import { useMemo } from 'react';
import { Footer } from 'components/Footer';

import { useColors } from 'styles/useColors';

export default function Parlamentar() {
  const { query } = useRouter();
  const { data } = useSenatorInfo(String(query.id));
  const { bgColor, borderColor, contentBgColor, textColor } = useColors();


  const pronoun = useMemo(() => {
    if (data?.IdentificacaoParlamentar.SexoParlamentar === 'Masculino') {
      return 'o';
    }
    return 'a';
  }, [data?.IdentificacaoParlamentar.SexoParlamentar]);

  return (
    <Box bg={bgColor} color={textColor}>
      <Head>
        <title>
          {data?.IdentificacaoParlamentar.NomeParlamentar} | Busca Parlamentar
        </title>
        <meta
          name="description"
          content={`Informações sobre ${pronoun} senador${pronoun === 'a' ? 'a' : ''
            } ${data?.IdentificacaoParlamentar.NomeParlamentar}`}
        />
      </Head>
      <Header />

      <Flex as="main" mx={4} align="center" direction="column">
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
            name={data?.IdentificacaoParlamentar.NomeParlamentar}
            src={data?.IdentificacaoParlamentar.UrlFotoParlamentar}
            size="2xl"
            showBorder
            color="teal"
            mt="-24"
            boxShadow="md"
          />
          <Flex mt="2">
            <Badge colorScheme="purple" variant="outline" fontSize="sm" mr="1">
              {data?.IdentificacaoParlamentar.SiglaPartidoParlamentar}
            </Badge>
            <Badge colorScheme="teal" variant="outline" fontSize="sm">
              {data?.IdentificacaoParlamentar.UfParlamentar}
            </Badge>
          </Flex>

          <Heading textAlign="center" mt="2">
            {data?.IdentificacaoParlamentar.NomeParlamentar}
          </Heading>
          <HStack
            mt={-1}
            spacing={4}
            fontWeight="medium"
            mx="auto"
            opacity={0.8}
          >
            <Text>
              {data?.IdentificacaoParlamentar.NomeCompletoParlamentar}
            </Text>
            <Text as="span" fontWeight="normal" opacity={1}>
              |
            </Text>
            <Link
              passHref
              href={String(data?.IdentificacaoParlamentar.UrlPaginaParlamentar)}
            >
              <Text as="a" textDecor="underline">
                Página oficial
              </Text>
            </Link>
          </HStack>

          <StatGroup as={SimpleGrid} spacing={4} mt={4}>
            <Stat label="Membro da mesa" data={data?.MembroMesa} />
            <Stat label="Membro da liderança" data={data?.MembroLideranca} />
            <Stat
              label="Titular em"
              data={data?.ComissoesTitular.length}
              helpText="comissões"
            />
            <Stat
              label="Suplente em"
              data={data?.ComissoesSuplente.length}
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
                <ComissionTable comissions={data?.ComissoesTitular} />
              </TabPanel>
              <TabPanel>
                <ComissionTable comissions={data?.ComissoesSuplente} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <Footer />
    </Box>
  );
}

type SenatorListItem = {
  IdentificacaoParlamentar: Senator[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/senador/lista/atual');
  const senatorRawList =
    response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
  const senatorList = senatorRawList.map(
    (senator: SenatorListItem) => senator.IdentificacaoParlamentar,
  );

  return {
    paths: senatorList.map((senator: Senator) => ({
      params: {
        id: senator.CodigoParlamentar,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await queryClient.prefetchQuery(['senator-info', String(params?.id)], () =>
    getSenatorInfo(String(params?.id)),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60 * 60 * 24, // 24h
  };
};
