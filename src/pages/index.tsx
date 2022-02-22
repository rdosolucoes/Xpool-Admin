import { Flex, Button, Stack,Heading, VStack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "../services/hooks/useUsers";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

type SignInFormData = {
  cpf: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .matches(/^\d{3}.\d{3}.\d{3}-\d{2}$/, "Campo deve ser um cpf"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors, isSubmitting } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    setIsLoading(true);
    console.log("values", values);
    const { cpf: login, password } = values;

    const response = await signIn(login, password);

    console.log("Response: ", response);

    const { success, msg, data } = response;

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

    if (data && data.accessToken) {
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("name", data.name);
      Cookies.set("avatar", data.image);

      console.log("setou: ", Cookies.get("accessToken"));
    }

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    
    
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex      
        w="100%"
        maxWidth={400}     
        p="5"       
        flexDirection="column"
      >
      <VStack align="center" p="5">
      <Heading size="2xl" >XPool Admin</Heading>
      </VStack>
      <Flex
        as="form"
        w="100%"
        maxWidth={400}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="cpf"
            name="cpf"
            label="CPF"
            error={errors.cpf}
            {...register("cpf")}
          />

          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="blue"
          backgroundColor="blue.700"
          size="lg"
          isLoading={isSubmitting || isLoading}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
    </Flex>
  );
}
