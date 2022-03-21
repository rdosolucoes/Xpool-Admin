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
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { getShop } from "../../services/hooks/useShops";
import { getParam, saveParam } from "../../services/hooks/useParams";

const editUserFormSchema = yup.object().shape({
  referenceValue: yup
    .string()
    .required("Valor Obrigatório")
    
});

type EditParamFormData = {
  referenceValue: number;
  transferValue: number;
};

export default function EditParam({
  param,
}: {
  param: { referenceValue: number; transferValue: number; };
}) {
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  // TODO - DECRYPT SENHA PARA SENHA HUMANA
  // TODO - ADICIONAR CAMPOS NECESSARIOS PARA EDIT

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(editUserFormSchema),
    defaultValues: {
      referenceValue: param.referenceValue,
      transferValue: param.transferValue
    },
  });

  const { errors, isSubmitting } = formState;

  const handleCreateUser: SubmitHandler<EditParamFormData> = async (values) => {
    console.log("values", values);

    const { referenceValue, transferValue } = values;

    const response = await saveParam(values);

    console.log("Response: ", response);

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
      description: "Parâmetro configurado com sucesso",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    //router.push("/params");
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
            Parametrizações do Sistema
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="number"
                step="0.1"
                name="referenceValue"
                label="Valor Indicação R$"
                error={errors.referenceValue}
                {...register("referenceValue")}
              />
              <Input
                type="number"
                name="transferValue"
                label="Repasse Lojista R$"
                error={errors.transferValue}
                {...register("transferValue")}
              />
            </SimpleGrid>

       
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/dashboard" passHref>
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  
  var id = 1;
  const param = await getParam();

  return {
    props: {
      param,
    },
  };
};
