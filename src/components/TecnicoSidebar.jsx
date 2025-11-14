import { Home, ClipboardList, Bug, Users, Cpu, Settings, Wrench } from "lucide-react";
import SidebarItem from "./SidebarItem";

function TecnicoSidebar() {
  return (
    <>
      <SidebarItem to="/tecnico/home" icon={Home} label="Home" />
      <SidebarItem to="/tecnico/pedidos-compra" icon={ClipboardList} label="Aquisições" />
      <SidebarItem to="/tecnico/manutencao" icon={Bug} label="T. Manutenção" />
      <SidebarItem to="/tecnico/listar-assistencias" icon={Users} label="Empresas de Assistência" />
      <SidebarItem to="/tecnico/listar-maquinas" icon={Cpu} label="Máquinas" />
      <SidebarItem to="/tecnico/definicoes" icon={Settings} label="Definições" />
    </>
  );
}

export default TecnicoSidebar;