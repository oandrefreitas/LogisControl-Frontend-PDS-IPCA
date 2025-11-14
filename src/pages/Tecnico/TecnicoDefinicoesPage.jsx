import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react";
import "./TecnicoDefinicoesPage.css";

function TecnicoDefinicoesPage() {
  const navigate = useNavigate();

  return (
    <div className="tecnico-definicoes-wrapper">
      <div className="tecnico-definicoes-opcoes">
        <button
          className="tecnico-definicao-opcao"
          onClick={() => navigate("/tecnico/gerir-perfil")}
        >
          <UserCog size={48} />
          <span>Gerir Perfil</span>
        </button>
      </div>
    </div>
  );
}

export default TecnicoDefinicoesPage;