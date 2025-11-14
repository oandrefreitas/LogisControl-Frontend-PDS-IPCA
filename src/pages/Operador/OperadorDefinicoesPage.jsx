import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react";
import "./OperadorDefinicoesPage.css";

function OperadorDefinicoesPage() {
  const navigate = useNavigate();

  return (
    <div className="operador-definicoes-wrapper">
      <div className="operador-definicoes-opcoes">
        <button
          className="operador-definicao-opcao"
          onClick={() => navigate("/operador/gerir-perfil")}
        >
          <UserCog size={48} />
          <span>Gerir Perfil</span>
        </button>
      </div>
    </div>
  );
}

export default OperadorDefinicoesPage;