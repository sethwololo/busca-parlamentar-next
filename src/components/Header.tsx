import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { ThemeButton } from './ThemeButton';

export function Header() {
  const titleColor = useColorModeValue('gray.900', 'gray.50');
  const titleHighlightColor = useColorModeValue('teal.500', 'teal.200');

  return (
    <Flex
      mx="auto"
      w="100%"
      maxW="1440"
      as="header"
      p={[4, 6]}
      justify="space-between"
      alignItems="center"
      mb={6}
    >
      <Link href="/" passHref>
        <Text
          as="a"
          fontWeight="black"
          color={titleColor}
          fontSize={['2xl', '3xl']}
          transition="filter 0.2s"
          _hover={{ filter: 'brightness(0.85)' }}
        >
          Busca
          <Text color={titleHighlightColor} display="inline-block" as="span">
            Parlamentar
          </Text>
        </Text>
      </Link>

      <ThemeButton />
    </Flex>
  );
}
