import { Home, BarChart2, Truck, Settings, Bug, PackageSearch, ClipboardList, ShoppingCart } from "lucide-react";
import SidebarItem from "./SidebarItem";

function GestorSidebar() {
  return (
    <>
      <SidebarItem to="/gestor/home" icon={Home} label="Home" />
      <SidebarItem to="/gestor/listar-produto" icon={PackageSearch} label="O. Produção" />
      <SidebarItem to="/gestor/listar-encomenda" icon={PackageSearch} label="L. Encomenda" />
      <SidebarItem to="/gestor/materia-prima" icon={Truck} label="T. MatériaPrima" />
      <SidebarItem to="/gestor/pedidos-compra" icon={ShoppingCart} label="Aquisições" />
      <SidebarItem to="/gestor/pedidos-manutencao" icon={Bug} label="T. Manutenção" />
      <SidebarItem to="/gestor/definicoes" icon={Settings} label="Definições" />
    </>
  );
}

export default GestorSidebar;