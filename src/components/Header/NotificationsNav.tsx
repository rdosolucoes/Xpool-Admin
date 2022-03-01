import { HStack, Icon, IconButton } from "@chakra-ui/react";
import { RiNotificationLine, RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";

export function NotificationsNav() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      {/* <Icon as={RiNotificationLine} fontSize="20" /> */}
      <Link href="/">
        <Icon as={RiLogoutBoxLine} fontSize="20" cursor="pointer" />
      </Link>
    </HStack>
  );
}
