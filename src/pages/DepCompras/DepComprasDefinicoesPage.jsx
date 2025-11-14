import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react";
import "./DepComprasDefinicoesPage.css";

function DepComprasDefinicoesPage() {
  const navigate = useNavigate();

  return (
    <div className="depcompras-definicoes-wrapper">
      <div className="depcompras-definicoes-opcoes">
        <button
          className="depcompras-definicao-opcao"
          onClick={() => navigate("/depcompras/gerir-perfil")}
        >
          <UserCog size={48} />
          <span>Gerir Perfil</span>
        </button>
      </div>
    </div>
  );
}

export default DepComprasDefinicoesPage;
