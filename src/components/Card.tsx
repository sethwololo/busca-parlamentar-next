import Link from 'next/link';
import {
  Flex,
  Box,
  Avatar,
  Text,
  Badge,
  LinkBox,
  LinkOverlay,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

interface CardProps {
  id: string;
  name: string;
  photoUrl: string;
  uf: string;
  party: string;
  fullName: string;
}

export function Card({ name, photoUrl, uf, party, id, fullName }: CardProps) {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const hoveredColor = useColorModeValue('teal.700', 'teal.200');

  return (
    <Link href={`/parlamentar/${id}`} passHref>
      <LinkBox>
        <Flex
          bg={bgColor}
          color={textColor}
          p="2"
          align="center"
          w="100%"
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          boxShadow="sm"
          transition="transform 0.2s"
          cursor="pointer"
          _hover={{
            boxShadow: 'md',
            transform: 'translateY(-2px)',
            color: hoveredColor,
            border: '1px solid',
            borderColor: hoveredColor,
            shadowColor: 'teal.600',
          }}
        >
          <Avatar name={name} src={photoUrl} mr="2" size="lg" />
          <Box w="100%">
            <Flex align="center" justify="space-between">
              <LinkOverlay>
                <Text fontWeight="bold" lineHeight="4">
                  {name}
                </Text>
              </LinkOverlay>
              <Stack
                direction={['row', 'column', 'row']}
                align="center"
                spacing={1}
                ml={2}
                mt={-4}
              >
                <Badge
                  variant="outline"
                  colorScheme="purple"
                  fontSize={['xs', 'xx-small', 'xs']}
                  isTruncated
                >
                  {party}
                </Badge>
                <Badge
                  fontSize={['xs', 'xx-small', 'xs']}
                  variant="outline"
                  colorScheme="teal"
                >
                  {uf}
                </Badge>
              </Stack>
            </Flex>

            <Text
              lineHeight="shorter"
              opacity={0.8}
              fontSize="xx-small"
              maxW="50%"
            >
              {fullName}
            </Text>
          </Box>
        </Flex>
      </LinkBox>
    </Link>
  );
}
