import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import useSearchBar from "../../hooks/useSearchBar";
import { getShops, ShopData } from "../../services/hooks/useShops";
import { isLogged } from "../../services/hooks/useUsers";

const searchParams = ["name", "city", "email", "login"];

export default function ShopList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<ShopData[]>([]);

  
  const { search, defaultSearchBarProps, filterBySearchBar } =
    useSearchBar(searchParams);

  const loadData = async () => {
    setIsLoading(true);

    const session = isLogged();

    if (!session) router.push("/");

    const getListShops = await getShops();

    setUsers(getListShops);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredShops = filterBySearchBar(users);

  return (
    <Box>
      <Header
        search={search}
        handleSearch={defaultSearchBarProps.handleSearch}
      />

      <Flex width="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Lojas
            </Heading>
            {/*
            <Link href="/Shops/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="blue"
                backgroundColor="blue.700"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
</Link> */}
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos lojistas.</Text>
            </Flex>
          ) : (
            <Box overflowX={"auto"}>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Cidade</Th>
                    <Th>Email</Th>
                    <Th>Login</Th>
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredShops.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                          </Box>
                        </Td>
                        <Td>{user.city}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.login}</Td>

                        <Td>
                          <Link href={`/shops/${user.id}`} passHref>
                            <Button
                              as="a"
                              size="sm"
                              fontSize="small"
                              colorScheme="blackAlpha"
                              leftIcon={
                                <Icon as={RiPencilLine} fontSize="16" />
                              }
                            >
                              Editar
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
