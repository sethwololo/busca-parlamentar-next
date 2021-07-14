import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Box, Flex, Avatar, Text, Heading, useBreakpointValue, SimpleGrid, StatGroup, IconButton } from '@chakra-ui/react';

import type { Senator } from 'types/senator';

import { api } from "services/api";
import { Header } from "components/Header";
import { FiArrowLeft } from "react-icons/fi";
import React from "react";
import { Stat } from "components/Stat";

interface SenatorProps {
  senator: any;
}

export default function Parlamentar({ senator }: SenatorProps) {
  console.log(senator)
  const { IdentificacaoParlamentar } = senator;
  const isSmallScreen = useBreakpointValue({
    sm: true,
    base: false
  });

  return (
    <Box bg="gray.100" color="gray.900" minH="100vh">
      <Head>
        <title>Senador | Busca Parlamentar</title>
      </Head>
      <Header />

      <Flex as="main" mx="4" justify="center">
        <Flex
          as="section"
          align="center"
          direction="column"
          justify="center"
          w="100%"
          maxW="1120px"
          bg="gray.50"
          rounded="xl"
          shadow="md"
          p="8"
          position="relative"
        >
          <IconButton
            position="relative"
            top="0"
            left="0"
            mt="-4"
            ml="-4"
            aria-label="Voltar"
            icon={<FiArrowLeft size={24} />}
            alignSelf="start"
          // colorScheme="red"
          // variant="ghost"
          // size="sm"
          />
          <Avatar
            name={IdentificacaoParlamentar.NomeParlamentar}
            src={IdentificacaoParlamentar.UrlFotoParlamentar}
            size="2xl"
            showBorder={true}
            color="teal"
            mt="-20"
            boxShadow="md"
          />

          <Heading textAlign="center">
            {IdentificacaoParlamentar.NomeParlamentar}
          </Heading>
          <Text fontWeight="medium" opacity={0.8} textAlign="center">
            {IdentificacaoParlamentar.NomeCompletoParlamentar}
          </Text>
          <StatGroup as={SimpleGrid} spacing={2} maxW="100%">
            <Stat 
              label="Partido"
              data={IdentificacaoParlamentar.SiglaPartidoParlamentar}
            />
            <Stat 
              label="Estado"
              data={IdentificacaoParlamentar.UfParlamentar}
            />
            <Stat 
              label="Membro da mesa"
              data={IdentificacaoParlamentar.SiglaPartidoParlamentar}
            />
            <Stat 
              label="Membro da liderança"
              data={IdentificacaoParlamentar.SiglaPartidoParlamentar}
            />
            <Stat 
              label="Comissões como titular"
              data={IdentificacaoParlamentar.SiglaPartidoParlamentar}
            />
            <Stat 
              label="Comissões como suplente"
              data={IdentificacaoParlamentar.SiglaPartidoParlamentar}
            />

          </StatGroup>


        </Flex>
      </Flex>
    </Box>
  );
}

type SenatorListItem = {
  IdentificacaoParlamentar: Senator[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/senador/lista/atual')
  const { Parlamentar } = response.data.ListaParlamentarEmExercicio.Parlamentares;
  const senatorList = Parlamentar.map((senator: SenatorListItem) => senator.IdentificacaoParlamentar);

  return {
    paths: senatorList.map((senator: Senator) => {
      return {
        params: {
          id: senator.CodigoParlamentar,
        },
      };
    }),
    fallback: "blocking",
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await api.get(`/senador/${params?.id}`);
  const senator = response.data.DetalheParlamentar.Parlamentar;

  const senatorInfo = {
    name: senator.NomeParlamentar,
    fullName: senator.NomeCompletoParlamentar,
    photoUrl: senator.UrlFotoParlamentar,
    party: senator.SiglaPartidoParlamentar,
    officialPage: senator.UrlPaginaParlamentar,
  }

  return {
    props: {
      senator,
    }
  };
}