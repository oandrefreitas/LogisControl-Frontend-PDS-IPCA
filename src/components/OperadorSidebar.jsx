import { Home, ClipboardCheck, Boxes, Bug, Flag, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";

function OperadorSidebar() {
  return (
    <>
      <SidebarItem to="/operador/home" icon={Home} label="Home" />
      <SidebarItem to="/operador/listar-producao" icon={ClipboardCheck} label="Producao" />
      <SidebarItem to="/operador/armazem" icon={Boxes} label="Gestão Armazém" />s
      <SidebarItem to="/operador/manutencao" icon={Bug} label="T. Manutenção" />
      <SidebarItem to="/operador/pedido-compra" icon={Flag} label="Pedido Compra" />
      <SidebarItem to="/operador/opcao2" icon={Flag} label="xxxxx" />
      <SidebarItem to="/operador/definicoes" icon={Settings} label="Definições" />
    </>
  );
}

export default OperadorSidebar;