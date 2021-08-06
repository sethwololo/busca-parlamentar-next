import type { Comission } from 'types/senator';
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
import React from 'react';

interface ComissionTableProps {
  comissions?: Comission[];
}

export function ComissionTable({ comissions }: ComissionTableProps) {
  const isSmallScreen = useBreakpointValue({
    base: true,
    lg: false,
  });

  const evenChatBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <VStack w="100%" direction="column" align="center">
      <SimpleGrid
        columns={[3, 3, 3, 4]}
        w="100%"
        textAlign="center"
        mx="auto"
        fontWeight="medium"
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

      <Flex direction="column" w="100%">
        {comissions?.map((comission: Comission) => (
          <SimpleGrid
            key={
              comission.DataFim + comission.IdentificacaoComissao.CodigoComissao
            }
            textAlign="center"
            columns={[3, 3, 3, 4]}
            p={1}
            _even={{ bg: evenChatBg }}
            _first={{ roundedTop: 'lg' }}
            _last={{ roundedBottom: 'lg' }}
          >
            <Tooltip
              placement="top-start"
              label={comission.IdentificacaoComissao.NomeComissao}
            >
              {`${comission.IdentificacaoComissao.SiglaComissao} ℹ️`}
            </Tooltip>

            <Box>
              <Badge
                colorScheme="purple"
                variant="outline"
                fontSize={['xx-small', 'xs', 'xs']}
              >
                {isSmallScreen
                  ? comission.IdentificacaoComissao.SiglaCasaComissao
                  : comission.IdentificacaoComissao.NomeCasaComissao}
              </Badge>
            </Box>

            {isSmallScreen ? (
              <Popover isLazy placement="top-start">
                <PopoverTrigger>
                  <Box>
                    <IconButton
                      aria-label="Visualizar datas"
                      icon={<FiInfo />}
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
                      {comission.DataInicio}
                    </Text>

                    {comission.DataFim !== '-' && (
                      <Text as="span" display="flex">
                        <Text fontWeight="medium" mr="1">
                          Fim:
                        </Text>
                        {comission.DataFim}
                      </Text>
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Text textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
                  {comission.DataInicio}
                </Text>
                <Text textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
                  {comission.DataFim}
                </Text>
              </>
            )}
          </SimpleGrid>
        ))}
      </Flex>
    </VStack>

    // <Table variant="striped" colorScheme="gray" size="sm" maxW="100%">
    //   <Thead>
    //     <Tr>
    //       <Th textAlign="center">Nome</Th>
    //       <Th textAlign="center">Casa</Th>
    //       {isLargeScreen ? (
    //         <Th textAlign="center">Datas</Th>
    //       ) : (
    //         <>
    //           <Th textAlign="center">Início</Th>
    //           <Th textAlign="center">Fim</Th>
    //         </>
    //       )}
    //     </Tr>
    //   </Thead>
    //   <Tbody>
    //     {comissions?.map((comission: Comission) => (
    //       <Tr
    //         key={
    //           comission.DataFim + comission.IdentificacaoComissao.CodigoComissao
    //         }
    //       >
    //         <Td fontSize={['xx-small', 'xs', 'sm', 'sm']} textAlign="center">
    //           <Tooltip
    //             placement="top-start"
    //             label={comission.IdentificacaoComissao.NomeComissao}
    //           >
    //             {`${comission.IdentificacaoComissao.SiglaComissao} ℹ️`}
    //           </Tooltip>
    //         </Td>
    //         <Td textAlign="center">
    //           <Badge
    //             colorScheme="purple"
    //             variant="outline"
    //             fontSize={['xx-small', 'xs', 'xs']}
    //           >
    //             {isLargeScreen
    //               ? comission.IdentificacaoComissao.SiglaCasaComissao
    //               : comission.IdentificacaoComissao.NomeCasaComissao}
    //           </Badge>
    //         </Td>

    //         {isLargeScreen ? (
    //           <Td textAlign="center">
    //             <Popover isLazy placement="top-start">
    //               <PopoverTrigger>
    //                 <IconButton
    //                   aria-label="Visualizar datas"
    //                   icon={<FiInfo />}
    //                   variant="outline"
    //                   colorScheme="teal"
    //                   size="xs"
    //                 />
    //               </PopoverTrigger>
    //               <PopoverContent maxW="200px">
    //                 <PopoverCloseButton />
    //                 <PopoverBody>
    //                   <Text as="span" display="flex">
    //                     <Text fontWeight="medium" mr="1">
    //                       Início:
    //                     </Text>
    //                     {comission.DataInicio}
    //                   </Text>

    //                   {comission.DataFim !== '-' && (
    //                     <Text as="span" display="flex">
    //                       <Text fontWeight="medium" mr="1">
    //                         Fim:
    //                       </Text>
    //                       {comission.DataFim}
    //                     </Text>
    //                   )}
    //                 </PopoverBody>
    //               </PopoverContent>
    //             </Popover>
    //           </Td>
    //         ) : (
    //           <>
    //             <Td textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
    //               {comission.DataInicio}
    //             </Td>
    //             <Td textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
    //               {comission.DataFim}
    //             </Td>
    //           </>
    //         )}
    //       </Tr>
    //     ))}
    //   </Tbody>
    // </Table>
  );
}
