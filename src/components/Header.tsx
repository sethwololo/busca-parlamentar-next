import { Flex, Text, IconButton } from "@chakra-ui/react";
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
    >
      <Text fontWeight="black" fontSize={["2xl","3xl"]}>
        Busca <Text color="teal.500"display="inline-block">Parlamentar</Text>
      </Text>

      <IconButton
        variant="ghost"
        aria-label="Usar tema escuro"
        ml="2"
        colorScheme="teal"
        icon={<FiMoon size={20} />}
      />
    </Flex>
  );
}