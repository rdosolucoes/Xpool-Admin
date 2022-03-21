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
import { getTransactions, TransactionData } from "../../services/hooks/useFinances";
import { isLogged } from "../../services/hooks/useUsers";
import useSearchBar from "../../hooks/useSearchBar";

const searchParams = ["supplier", "type", "shop", "formatDate"]

export default function SupplierList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trans, setTrans] = useState<TransactionData[]>([]);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { search, defaultSearchBarProps, filterBySearchBar } =
  useSearchBar(searchParams);

  const loadData = async () => {
    setIsLoading(true);

    const session = isLogged();

    if (!session) router.push("/");

    const getListTransactions = await getTransactions();

    setTrans(getListTransactions);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTrans = filterBySearchBar(trans);

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
              Transações Financeiras
            </Heading>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados das transações.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>Fornecedor</Th>
                    <Th>Valor</Th>
                    {isWideVersion && <Th>Tipo</Th>}
                    {isWideVersion && <Th>Loja</Th>}
                    {isWideVersion && <Th>Data</Th>}
                    {isWideVersion && <Th>Status</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredTrans.map((trans) => {
                    return (
                      <Tr key={trans.id}>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{trans.supplier}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{trans.amount.toFixed(2)}</Td>}
                        {isWideVersion && <Td>{trans.type}</Td>}
                        {isWideVersion && <Td>{trans.shop}</Td>}
                        {isWideVersion && <Td>{trans.formatDate}</Td>}
                        {isWideVersion && <Td>{trans.status}</Td>}
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
