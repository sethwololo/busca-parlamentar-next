import Link from 'next/link';
import { Flex, Box, Avatar, Text, Badge, LinkBox, LinkOverlay } from '@chakra-ui/react';

interface CardProps {
  id: string;
  name: string;
  photoUrl: string;
  uf: string;
  party: string;
}

export function Card({ name, photoUrl, uf, party, id }: CardProps) {
  return (
    <Link href={`/parlamentar/${id}`} passHref>
      <LinkBox>
        <Flex
          bg="white"
          p="2"
          align="center"
          w="100%"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          boxShadow="md"
          transition="0.2s"
          cursor="pointer"
          _hover={{
            boxShadow: 'lg',
            transform: 'translateY(-5px)',
            color: 'teal.700',
            border: '1px solid',
            borderColor: 'teal.700',
            shadowColor: 'teal.600'
          }}
        >
          <Avatar name={name} src={photoUrl} mr="2" size="lg" />
          <Box w="100%">
            <Flex align="center" justify="space-between">
              <LinkOverlay>
                <Text fontWeight="bold" mr="2">
                  {name}
                </Text>
              </LinkOverlay>
              <Badge 
                ml="auto" 
                variant="outline" 
                colorScheme="teal" 
                alignSelf="start"
                _hover={{ variant: 'subtle' }}
              >
                {uf}
              </Badge>
            </Flex>

            <Text fontWeight="medium" opacity={0.8} fontSize="sm" >{party}</Text>
          </Box>
        </Flex>
      </LinkBox>
    </Link>
  );
}