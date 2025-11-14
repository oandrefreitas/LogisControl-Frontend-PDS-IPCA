import { Home, Package, ClipboardList, BarChart2, UserPlus, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";

function DepComprasSidebar() {
  return (
    <>
      <SidebarItem to="/depcompras/home" icon={Home} label="Home" />
      <SidebarItem to="/depcompras/compras" icon={Package} label="Compras MP" />
      <SidebarItem to="/depcompras/materia-prima" icon={ClipboardList} label="T. Matéria Prima" />
      <SidebarItem to="/depcompras/fornecedor" icon={UserPlus} label="Criar Fornecedor" />
      <SidebarItem to="/depcompras/definicoes" icon={Settings} label="Definições" />
    </>
  );
}

export default DepComprasSidebar;
