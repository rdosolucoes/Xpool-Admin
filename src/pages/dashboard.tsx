import {
  Badge,
  Flex,
  SimpleGrid,
  Spacer,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

//import peopleImage from "assets/img/logo_home.png";
//import logoChakra from "../assets/svg/logo-white.svg";

import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import IconBox from "../components/Icons/IconBox";
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  PersonIcon,
  WalletIcon,
  
} from "../components/Icons/Icons.js";

// Custom icons
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { PageLoader } from "../components/PageLoader/PageLoader";
import { Sidebar } from "../components/Sidebar";
import { isLogged } from "../services/hooks/useUsers";
import { getSuppliers, SupplierData } from "../services/hooks/useSuppliers";
import { getShops, ShopData } from "../services/hooks/useShops";
import { getUsers, UserData } from "../services/hooks/useUsers";

export default function Dashboard() {
  const router = useRouter();
  const [screenLoading, setScreenLoading] = useState(true);
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const [totalSup, setTotalSup] = useState(0);
  const [totalShop, setTotalShop] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  var totalSuppliers = 0;


  const loadData = async () => {
    const getListSuppliers = await getSuppliers();
    const getListUsers = await getUsers();
    const getListShop = await getShops();

    setTotalSup(getListSuppliers.length);
    setTotalShop(getListShop.length);
    setTotalUser(getListUsers.length);
  };
 
  useEffect(() => {
    loadData();
    setScreenLoading(true);

    const session = isLogged();
    

    if (!session) router.push("/");

    setTimeout(() => {
      setScreenLoading(false);
    }, 1000);
  }, []);

  return screenLoading ? (
    <PageLoader />
  ) : (
    <Flex direction="column" h="100vh" w="100%">
      <Header />
      <Flex width="100%" my="4" px="6">
        <Sidebar />
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 5 }} spacing="26px" w="100%">
          <Card minH="70px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="start"
                justify="start"
                w="100%"
              >
                <Stat>
                  <StatLabel color="gray.400" fontWeight="bold">
                    Usuários
                  </StatLabel>
                  <StatNumber color={textColor} fontSize="x-large">{totalUser}</StatNumber>
                </Stat>

                <IconBox as="box" h={"55px"} w={"55px"} bg={iconTeal}>
                  <PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="70px">
            <CardBody>
            <Flex
                flexDirection="row"
                align="start"
                justify="start"
                w="100%"
              >
                <Stat>
                  <StatLabel color="gray.400" fontWeight="bold">
                    Lojistas
                  </StatLabel>
                  <StatNumber color={textColor} fontSize="x-large">{totalShop}</StatNumber>
                </Stat>

                <IconBox as="box" h={"55px"} w={"55px"} bg={iconTeal}>
                  <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="70px">
            <CardBody>
            <Flex
                flexDirection="row"
                align="start"
                justify="start"
                w="100%"
              >
                <Stat>
                  <StatLabel color="gray.400" fontWeight="bold">
                    Fornecedores
                  </StatLabel>
                  <StatNumber color={textColor} fontSize="x-large">{totalSup}</StatNumber>
                </Stat>

                <IconBox as="box" h={"55px"} w={"55px"} bg={iconTeal}>
                  <StatsIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
          <Card minH="70px">
            <CardBody>
            <Flex
                flexDirection="row"
                align="start"
                justify="start"
                w="100%"
              >
                <Stat>
                  <StatLabel color="gray.400" fontWeight="bold">
                    Faturamento
                  </StatLabel>
                  <StatNumber color={textColor} fontSize="x-large"  >150,00</StatNumber>
                </Stat>

                <IconBox as="box" h={"55px"} w={"55px"} bg={iconTeal}>
                  <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
                </IconBox>
              </Flex>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

/*
    
    <Flex direction="column" h="100vh">
      <Header />

      <Flex width="100%" maxWidth={1480} my="4"  px="6">
        <Sidebar />
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 1 }} spacing="10px" justify="center" align="center">
        <Card minH="83px" justify="center" align="center">
          <CardBody justify="center" align="center">
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Usuários
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="x-large" color={textColor} alignItems="end">
                    25
                  </StatNumber>
                  
                </Flex>
              </Stat>
              <IconBox as="box" h={"50px"} w={"55px"} bg={iconTeal} ml="5" >
                <PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
       
      </SimpleGrid>
      </Flex>
    </Flex>
  );
}
*/
