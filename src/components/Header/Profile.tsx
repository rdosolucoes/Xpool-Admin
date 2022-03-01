import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  // TODO => Colocar img default

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{Cookies.get("name") || ""}</Text>

          {/* <Text color="gray.300" fontSize="small">
            email or something
          </Text> */}
        </Box>
      )}

      <Avatar
        size="md"
        name="UserName"
        src={
          Cookies.get("avatar") ||
          "https://i0.wp.com/categorianerd.com/wp-content/uploads/2020/06/bob-esponja-calca-quadrada-nickelodeon-viacomcbs-3778837.jpg?fit=1024%2C768&ssl=1"
        }
      />
    </Flex>
  );
}
