import { Stat as ChakraStat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

interface StatProps {
  label: string;
  data: string;
  helpText?: string;
}

export function Stat({ label, data, helpText }: StatProps) {
  return (
    <ChakraStat display="flex">
      <StatLabel>{label}</StatLabel>
      <StatNumber alignSelf="end">{data}</StatNumber>
      {helpText && (
        <StatHelpText>
          {helpText}
        </StatHelpText>
      )}
    </ChakraStat>
  );
}