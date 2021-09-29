import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { createUser } from "../../services/hooks/useUsers";

const creatUserFormSchema = yup.object().shape({
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .matches(/^\d{3}.\d{3}.\d{3}-\d{2}$/, "Campo deve ser um cpf"),
  password: yup.string().required("Senha obrigatória"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

type CreateUserFormData = {
  cpf: string;
  password: string;
  password_confirmation: string;
};

export default function CreateUser() {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(creatUserFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    const { cpf: login, password } = values;

    const response = await createUser(login, password);

    const { success, msg } = response;

    if (!success) {
      toast({
        title: "Erro!",
        description: msg || "Erro na chamada",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Sucesso!",
      description: "Usuário criado com sucesso",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex width="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="cpf"
                label="CPF"
                error={errors.cpf}
                {...register("cpf")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                label="Senha"
                type="password"
                error={errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                label="Confirmação da senha"
                type="password"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="blue"
                backgroundColor="blue.700"
                isLoading={isSubmitting || isLoading}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
