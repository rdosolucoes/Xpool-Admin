import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiWalletLine
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start" backgroundColor="gray.700" p="5" height="100%" borderRadius="10">
      <NavSection title="Geral"  >
        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink icon={RiContactsLine} href="/users">
          Usuários
        </NavLink>
        <NavLink icon={RiGitMergeLine} href="/users">
         Lojistas
        </NavLink>
        <NavLink icon={RiInputMethodLine} href="/users">
          Fornecedores
        </NavLink>
        <NavLink icon={RiWalletLine} href="/users">
         Financeiro
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
