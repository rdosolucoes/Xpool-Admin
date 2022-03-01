import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

interface SearchBoxProps {
  onChange?: any;
  search?: string;
}

export function SearchBox({ onChange, search }: SearchBoxProps) {
  const handleSearch = (e: any) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar"
        _placeholder={{ color: "gray.400" }}
        onChange={handleSearch}
        value={search ?? ""}
      />
      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
