import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterMateriasPrimas } from "../../api/materiaPrima";
import "./GestorMateriasPrimasPage.css";

function GestorMateriasPrimasPage() {
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const carregarMaterias = async () => {
      try {
        const dados = await obterMateriasPrimas();
        setMaterias(dados);
      } catch (error) {
        alert("Erro ao carregar matérias-primas: " + (error.response?.data || error.message));
      }
    };

    carregarMaterias();
  }, []);

  return (
    <div className="materia-prima-wrapper">
      <h2>Lista de Matérias-Primas</h2>
      <table className="tabela-materia-prima">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Categoria</th>
            <th>Cód. Interno</th>
            <th>Preço (€)</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.materiaPrimaId}>
              <td>{m.nome}</td>
              <td>{m.quantidade}</td>
              <td>{m.categoria}</td>
              <td>{m.codInterno}</td>
              <td>{m.preco.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-materia">
        <button className="voltar" onClick={() => navigate("/gestor/definicoes")}>
          Voltar
        </button>
        <button className="criar" onClick={() => navigate("/gestor/materia-prima/criar")}>
          Criar Nova Matéria-Prima
        </button>
      </div>

    </div>
  );
}

export default GestorMateriasPrimasPage;