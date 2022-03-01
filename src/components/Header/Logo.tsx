import { Image } from "@chakra-ui/react";

export function Logo() {
  return (
    <Image
      boxSize="80px"
      objectFit="cover"
      src="/images/logo_home.png"
      alt="XPool"
    />
  );
}
