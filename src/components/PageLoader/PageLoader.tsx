import { Flex, Spinner } from "@chakra-ui/react";

export function PageLoader() {
  return (
    <Flex
      h="100vh"
      width="100%"
      my="6"
      mx="auto"
      px="6"
      justify="center"
      align="center"
      color="cyan.500"
    >
      <Spinner size="xl" />
    </Flex>
  );
}
