import { Image } from "@chakra-ui/react";

export function Logo() {
  return (
    <Image
      boxSize="100px"
      objectFit="cover"
      src="/images/logo_home.png"
      alt="XPool"
    />
  );
}
