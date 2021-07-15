import { Stat as ChakraStat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

interface StatProps {
  label: string;
  data?: string | number;
  helpText?: string;
}

export function Stat({ label, data, helpText }: StatProps) {
  return (
    <ChakraStat display="flex">
      <StatLabel>
        {label}
      </StatLabel>
      <StatNumber >{data}</StatNumber>
      {helpText && (
        <StatHelpText>
          {helpText}
        </StatHelpText>
      )}
    </ChakraStat>
  );
}