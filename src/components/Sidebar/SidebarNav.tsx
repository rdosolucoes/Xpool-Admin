import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href="/users">
          Usuários
        </NavLink>
      </NavSection>

      {/* <NavSection title="NOME_SESSAO_AQUI">
        <NavLink icon={RiInputMethodLine} href="LINK_DA_PAGINA">
          NOME_DA_PAGINA
        </NavLink>
      </NavSection> */}
    </Stack>
  );
}
