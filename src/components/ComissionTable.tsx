import type { Comission } from 'types/senator';
import { Table, Tr, Th, Td, Thead, Tbody, Badge, useBreakpointValue, Tooltip, Icon } from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';

interface ComissionTableProps {
  comissions?: Comission[];
}

export function ComissionTable({ comissions }: ComissionTableProps) {
  const isLargeScreen = useBreakpointValue({
    sm: false,

  })

  return (
    <Table variant="striped" colorScheme="gray" size="sm" maxW="100%"  overflowX="auto">
      <Thead>
        <Tr>
          <Th textAlign="center">Nome</Th>
          <Th textAlign="center">Casa</Th>
          <Th textAlign="center">Participação</Th>
          <Th textAlign="center">Início</Th>
          <Th textAlign="center">Fim</Th>
        </Tr>
      </Thead>
      <Tbody>
        {comissions?.map((comission: Comission) => (
          <Tr key={comission.DataFim + comission.IdentificacaoComissao.CodigoComissao}>
            <Td>
              <Tooltip placement="top-start" label={comission.IdentificacaoComissao.NomeComissao}>
                {`${comission.IdentificacaoComissao.SiglaComissao} 🛈`}
              </Tooltip>
            </Td>
            <Td textAlign="center">
              <Badge colorScheme="purple" variant="outline">
                {comission.IdentificacaoComissao.SiglaCasaComissao}
              </Badge>
            </Td>
            <Td textAlign="center" >
              <Badge
                variant="outline"
                colorScheme={comission.DescricaoParticipacao === 'Titular' ? 'teal' : 'blue'}
              >
                {comission.DescricaoParticipacao}
              </Badge>
            </Td>
            <Td textAlign="center">{comission.DataInicio}</Td>
            <Td textAlign="center">{comission.DataFim}</Td>
          </Tr>
        ))}

      </Tbody>
    </Table>
  );
}