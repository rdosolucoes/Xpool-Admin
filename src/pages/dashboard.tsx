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
  MoneyIcon,
  MoneyIcon2 
} from "../components/Icons/Icons.js";

// Custom icons
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { PageLoader } from "../components/PageLoader/PageLoader";
import { Sidebar } from "../components/Sidebar";
import { isLogged } from "../services/hooks/useUsers";
import { getDashboard, DashBoardData } from "../services/hooks/useDashBoard";

export default function Dashboard() {
  const router = useRouter();
  const [screenLoading, setScreenLoading] = useState(true);
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const [totalSup, setTotalSup] = useState(0);
  const [totalShop, setTotalShop] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalReferences, setTotalReferences] = useState(0);
  const [totalTransfer, setTotalTransfer] = useState(0);
  const [totalGain, setTotalGain] = useState(0);

  var totalSuppliers = 0;


  const loadData = async () => {
    const getValues = await getDashboard();

    setTotalSup(getValues.totalSuppliers);
    setTotalShop(getValues.totalShops);
    setTotalUser(getValues.totalUsers);
    setTotalReferences(getValues.totalReferences);
    setTotalCash(getValues.totalCash);
    setTotalTransfer(getValues.totalTransfer);
    setTotalGain(getValues.totalGain);
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
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="10px" w="100%" h="10%">
          <Card minH="70px">
            <CardBody>
              <Flex
                flexDirection="row"
                align="start"
                justify="start"
                w="100%"
              >
                <Stat>
                <StatNumber color={textColor} fontSize="22">{totalUser}</StatNumber>
                  <StatLabel color="gray.400" fontWeight="bold" fontSize="14">
                    Usuários
                  </StatLabel>
                 
                </Stat>

                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
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
                <StatNumber color={textColor} fontSize="22">{totalShop}</StatNumber>
               
                  <StatLabel color="gray.400" fontWeight="bold" fontSize="14">
                    Lojistas
                  </StatLabel>
                  </Stat>
                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
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
                <StatNumber color={textColor} fontSize="22">{totalSup}</StatNumber>
                  <StatLabel color="gray.400" fontWeight="bold" fontSize="14">
                    Fornecedores
                  </StatLabel>
                 
                </Stat>

                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
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
                <StatNumber color={textColor} fontSize="22"  >{totalReferences}</StatNumber>
                  <StatLabel color="gray.400" fontWeight="bold" fontSize="14">
                    Indicações
                  </StatLabel>           
                </Stat>

                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
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
                <StatNumber color={textColor} fontSize="22"  >{totalCash.toFixed(2)}</StatNumber>
                  <StatLabel color="gray.400" fontWeight="bold" fontSize="14">
                    Caixa(R$)
                  </StatLabel>                 
                </Stat>

                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
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
                <StatNumber color={textColor} fontSize="22"  >{totalTransfer.toFixed(2)}</StatNumber>
                  <StatLabel color="gray.400" fontWeight="bold" fontSize="14">
                    Repasse(R$)
                  </StatLabel>                 
                </Stat>

                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <MoneyIcon2 h={"24px"} w={"24px"} color={iconBoxInside} />
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
                <StatNumber color={textColor} fontSize="22"  >{totalGain.toFixed(2)}</StatNumber>
                  <StatLabel color="gray.400" fontWeight="bold" fontSize="14">
                    Lucro(R$)
                  </StatLabel>                 
                </Stat>

                <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                  <MoneyIcon h={"24px"} w={"24px"} color={iconBoxInside} />
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
                  <StatNumber fontSize="22" color={textColor} alignItems="end">
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
