import type { Comission } from 'types/senator';
import { FiInfo } from 'react-icons/fi';
import {
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
  Badge,
  useBreakpointValue,
  Tooltip,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  Text
} from '@chakra-ui/react';


interface ComissionTableProps {
  comissions?: Comission[];
}

export function ComissionTable({ comissions }: ComissionTableProps) {
  const isLargeScreen = useBreakpointValue({
    sm: false,
    base: true,
  })


  return (
    <Table variant="striped" colorScheme="gray" size="sm" maxW="100%" >
      <Thead>
        <Tr>
          <Th textAlign="center">Nome</Th>
          <Th textAlign="center">Casa</Th>
          {isLargeScreen ? (
            <Th textAlign="center">Datas</Th>
          ) : (
            <>
              <Th textAlign="center">Início</Th>
              <Th textAlign="center">Fim</Th>
            </>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {comissions?.map((comission: Comission) => (
          <Tr key={comission.DataFim + comission.IdentificacaoComissao.CodigoComissao}>
            <Td fontSize={['xx-small', 'xs', 'sm', 'sm']} textAlign="center">
              <Tooltip placement="top-start" label={comission.IdentificacaoComissao.NomeComissao}>
                {`${comission.IdentificacaoComissao.SiglaComissao} ℹ️`}
              </Tooltip>
            </Td>
            <Td textAlign="center" >
              <Badge colorScheme="purple" variant="outline" fontSize={['xx-small', 'xs', 'xs']}>
                {
                  isLargeScreen
                    ? comission.IdentificacaoComissao.SiglaCasaComissao
                    : comission.IdentificacaoComissao.NomeCasaComissao
                }
              </Badge>
            </Td>
          
            {isLargeScreen ? (
              <Td textAlign="center">
                <Popover isLazy placement="top-start">
                  <PopoverTrigger>
                    <IconButton
                      aria-label="Visualizar datas"
                      icon={<FiInfo />}
                      variant="outline"
                      colorScheme="teal"
                      size="xs"
                    />
                  </PopoverTrigger>
                  <PopoverContent maxW="200px">
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text as="span" display="flex">
                        <Text fontWeight="medium"  mr="1">
                          Início:
                        </Text>
                        {comission.DataInicio}
                      </Text>

                      {comission.DataFim !== '-' && (
                        <Text as="span" display="flex">
                          <Text fontWeight="medium"  mr="1">
                            Fim:
                          </Text>
                          {comission.DataFim}
                        </Text>
                      )}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Td>
            ) : (
              <>
                <Td textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
                  {comission.DataInicio}
                </Td>
                <Td textAlign="center" fontSize={['xx-small', 'xs', 'sm']}>
                  {comission.DataFim}
                </Td>
              </>
            )}
          </Tr>
        ))}

      </Tbody>
    </Table>
  );
}