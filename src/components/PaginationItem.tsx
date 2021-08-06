import { Button, useColorModeValue } from '@chakra-ui/react';

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  const disabledBg = useColorModeValue('teal.500', 'teal.200');

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="teal"
        disabled
        _disabled={{
          bg: disabledBg,
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
