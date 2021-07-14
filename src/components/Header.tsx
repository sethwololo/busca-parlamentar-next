import { Flex, Text, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { FiMoon } from 'react-icons/fi';

export function Header() {
  return (
    <Flex
      mx="auto"
      w="100%"
      maxW="1440"
      as="header"
      px="2"
      py="6"
      justify="space-between"
      alignItems="center"
      mb="8"
    >
      <Link href="/" passHref>
        <Text as="a"
          fontWeight="black" 
          fontSize={["2xl", "3xl"]}  
          transition="filter 0.2s"
          _hover={{filter: 'brightness(0.85)'}}
        >
          Busca<Text color="teal.500" display="inline-block" as="span" >Parlamentar</Text>
        </Text>
      </Link>

      <IconButton
        variant="ghost"
        aria-label="Usar tema escuro"
        ml="2"
        colorScheme="teal"
        icon={<FiMoon size={24} />}
      />
    </Flex>
  );
}