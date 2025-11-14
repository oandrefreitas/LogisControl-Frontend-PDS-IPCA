import React from "react";
import { Link } from "react-router-dom";
import "./DepComprasHomePage.css";

function DepComprasHomePage() {
  return (
    <div className="depcompras-home">
      <div className="atalhos">
        <Link to="/depcompras/compras" className="atalho-card">
          <h3>Compras MP</h3>
          <p>Gerir e registar compras de matéria-prima.</p>
        </Link>
        <Link to="/depcompras/materia-prima" className="atalho-card">
          <h3>T. Matéria Prima</h3>
          <p>Consultar ou registar matéria-prima.</p>
        </Link>
        <Link to="/depcompras/fornecedor" className="atalho-card">
          <h3>Criar Fornecedor</h3>
          <p>Adicionar novos fornecedores ao sistema.</p>
        </Link>
      </div>
    </div>
  );
}

export default DepComprasHomePage;