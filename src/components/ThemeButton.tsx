import {
  Tooltip,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { RiMoonLine, RiSunLine } from 'react-icons/ri';

export function ThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  const color = useColorModeValue(`teal.500`, `teal.200`);

  return (
    <Tooltip label={`Usar tema ${colorMode === `dark` ? `claro` : `escuro`}`}>
      <IconButton
        color={color}
        variant="ghost"
        colorScheme="teal"
        aria-label={`Usar tema ${colorMode === `dark` ? `claro` : `escuro`}`}
        rounded="md"
        icon={
          colorMode === `dark` ? (
            <RiSunLine size={20} />
          ) : (
            <RiMoonLine size={20} />
          )
        }
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
}
