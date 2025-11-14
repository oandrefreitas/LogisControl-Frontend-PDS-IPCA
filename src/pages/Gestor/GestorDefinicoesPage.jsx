import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, Box, Cpu, UserCog, Users } from "lucide-react";
import "./GestorDefinicoesPage.css";

function GestorDefinicoesPage() {
  const navigate = useNavigate();

  return (
    <div className="gestor-definicoes-wrapper">
      <div className="definicoes-opcoes">
        <div className="linha-botoes">
          <button className="definicao-opcao" onClick={() => navigate("/gestor/utilizadores")}> <User size={48} /><span>Gerir Utilizadores</span> </button>
          <button className="definicao-opcao" onClick={() => navigate("/gestor/materia-prima")}> <Box size={48} /><span>Gerir Matéria-Prima</span> </button>
        </div>
        <div className="linha-botoes">
          <button className="definicao-opcao" onClick={() => navigate("/gestor/ListarProdutos")}> <Package size={48} /><span>Produtos</span> </button>
          <button className="definicao-opcao" onClick={() => navigate("/gestor/fornecedores")}> <Cpu size={48} /><span>Fornecedores</span> </button>
        </div>
        <div className="linha-botoes">
          <button className="definicao-opcao" onClick={() => navigate("/gestor/clientes")}> <Users size={48} /><span>Gerir Clientes</span> </button>
          <button className="definicao-opcao" onClick={() => navigate("/gestor/gerir-perfil")}> <UserCog size={48} /><span>Gerir Perfil</span> </button>
        </div>
      </div>
    </div>
  );
}

export default GestorDefinicoesPage;