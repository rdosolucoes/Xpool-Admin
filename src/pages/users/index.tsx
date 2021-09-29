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
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { getUsers, isLogged, UserData } from "../../services/hooks/useUsers";

export default function UserList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const loadData = async () => {
    setIsLoading(true);

    const session = isLogged();

    if (!session) router.push("/");

    const getListUsers = await getUsers();

    setUsers(getListUsers);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box>
      <Header />

      <Flex width="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link href="/users/create" passHref>
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
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados do usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.login}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.creationDate}</Td>}
                        {isWideVersion && (
                          <Td>
                            <Link href={`/users/${user.id}`} passHref>
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
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
