import React from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import "./GestorManutencaoPage.css";

function GestorManutencaoPage() {
  const navigate = useNavigate();

  return (
    <div className="gestor-manutencao-wrapper">
      <div className="manutencao-opcoes">
        <button className="manutencao-opcao" onClick={() => navigate("/gestor/pedidos-compra")}>
          <Package size={48} />
          <span>Pedidos de Compra</span>
        </button>
      </div>
    </div>
  );
}

export default GestorManutencaoPage;