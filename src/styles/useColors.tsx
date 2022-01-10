import { useColorModeValue } from '@chakra-ui/react';

export function useColors() {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const inputFocusColor = useColorModeValue('teal.500', 'teal.200');
  const contentBgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return {
    bgColor,
    textColor,
    inputFocusColor,
    contentBgColor,
    borderColor,
  };
}
