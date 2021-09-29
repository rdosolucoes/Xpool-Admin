import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { PageLoader } from "../components/PageLoader/PageLoader";
import { Sidebar } from "../components/Sidebar";
import { isLogged } from "../services/hooks/useUsers";

export default function Dashboard() {
  const router = useRouter();
  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
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
    <Flex direction="column" h="100vh">
      <Header />

      <Flex width="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />
        <Heading>Bem vindo!</Heading>
      </Flex>
    </Flex>
  );
}
