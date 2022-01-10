import { Comission } from 'types/comission';
import { FiInfo } from 'react-icons/fi';
import {
  Badge,
  useBreakpointValue,
  Tooltip,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  Text,
  useColorModeValue,
  SimpleGrid,
  Flex,
  VStack,
  Box,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Pagination } from './Pagination';

interface ComissionTableProps {
  comissions: Comission[];
}

export function ComissionTable({ comissions }: ComissionTableProps) {
  const [page, setPage] = useState(1);

  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false,
  });

  const evenChatBg = useColorModeValue('gray.100', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const pageStart = (Number(page) - 1) * Number(10);
  const pageEnd = pageStart + Number(10);

  const numberOfComissions = useMemo(() => {
    if (comissions) {
      return comissions.length;
    }
    return 0;
  }, [comissions]);

  return (
    <VStack w="100%" direction="column" align="center" spacing={1.5}>
      <SimpleGrid
        columns={[3, 3, 3, 4]}
        w="100%"
        textAlign="center"
        mx="auto"
        fontWeight="bold"
      >
        <Text>Nome</Text>
        <Text>Casa</Text>

        {isSmallScreen ? (
          <Text>Datas</Text>
        ) : (
          <>
            <Text>Início</Text>
            <Text>Fim</Text>
          </>
        )}
      </SimpleGrid>

      <Flex
        direction="column"
        w="100%"
        border="1px"
        borderColor={borderColor}
        rounded="lg"
      >
        {numberOfComissions <= 0 ? (
          <Flex p={1} flex="1" w="full" align="center" justify="center">
            Este senador ainda não participou de nenhuma comissão com esse
            cargo.
          </Flex>
        ) : (
          comissions?.slice(pageStart, pageEnd).map((comission: Comission) => (
            <SimpleGrid
              key={
                comission.DataFim +
                comission.IdentificacaoComissao.CodigoComissao
              }
              textAlign="center"
              columns={[3, 3, 3, 4]}
              p={1}
              _even={{ bg: evenChatBg }}
              _first={{ roundedTop: 'lg' }}
              _last={{ roundedBottom: 'lg' }}
              alignItems="center"
            >
              <Tooltip
                placement="top-start"
                label={comission.IdentificacaoComissao.NomeComissao}
                rounded="md"
                textAlign="center"
                isLazy
              >
                <Text fontSize={['xx-small', 'xs', 'xs', 'sm']}>
                  {`${comission.IdentificacaoComissao.SiglaComissao} ℹ️`}
                </Text>
              </Tooltip>

              <Box>
                <Badge
                  colorScheme="purple"
                  variant="outline"
                  fontSize={['xx-small', 'xs', 'xs']}
                >
                  {comission.IdentificacaoComissao.SiglaCasaComissao}
                </Badge>
              </Box>

              {isSmallScreen ? (
                <Popover isLazy placement="top-start">
                  <PopoverTrigger>
                    <Box>
                      <IconButton
                        aria-label="Visualizar datas"
                        icon={<FiInfo size={18} />}
                        variant="outline"
                        colorScheme="teal"
                        size="sm"
                      />
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent maxW="200px">
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text as="span" display="flex">
                        <Text fontWeight="medium" mr="1">
                          Início:
                        </Text>
                        {format(new Date(comission.DataInicio), 'dd/MM/yyyy')}
                      </Text>

                      {comission.DataFim && (
                        <Text as="span" display="flex">
                          <Text fontWeight="medium" mr="1">
                            Fim:
                          </Text>
                          {format(new Date(comission.DataFim), 'dd/MM/yyyy')}
                        </Text>
                      )}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <>
                  <Text textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
                    {format(new Date(comission.DataInicio), 'dd/MM/yyyy')}
                  </Text>
                  <Text textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
                    {comission.DataFim
                      ? format(new Date(comission.DataFim), 'dd/MM/yyyy')
                      : '-'}
                  </Text>
                </>
              )}
            </SimpleGrid>
          ))
        )}
      </Flex>

      <Pagination
        totalCountOfRegisters={numberOfComissions}
        onPageChange={setPage}
        currentPage={page}
      />
    </VStack>
  );
}
