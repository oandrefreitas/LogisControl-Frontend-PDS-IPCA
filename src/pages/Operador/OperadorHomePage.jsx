import React from "react";
import { Link } from "react-router-dom";
import "./OperadorHomePage.css";

function OperadorHomePage() {
  return (
    <div className="operador-home">
      <div className="atalhos">
        <Link to="/operador/registos" className="atalho-card">
          <h3>Registos de Produção</h3>
          <p>Consultar e adicionar registos da linha de produção.</p>
        </Link>

        <Link to="/operador/armazem" className="atalho-card">
          <h3>Gestão de Armazém</h3>
          <p>Ver stocks, entradas e saídas de material.</p>
        </Link>

        <Link to="/operador/manutencao" className="atalho-card">
          <h3>T. Manutenção</h3>
          <p>Registar ou consultar tarefas de manutenção.</p>
        </Link>
      </div>
    </div>
  );
}

export default OperadorHomePage;