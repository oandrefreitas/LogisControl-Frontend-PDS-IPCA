import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterFornecedores } from "../../api/fornecedor";
import "./GestorListaFornecedoresPage.css";

function GestorListaFornecedoresPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregar = async () => {
      try {
        const lista = await obterFornecedores();
        setFornecedores(lista);
      } catch (err) {
        alert("Erro ao carregar fornecedores.");
      }
    };
    carregar();
  }, []);

  return (
    <div className="fornecedores-wrapper">
      <h2>Lista de Fornecedores</h2>
      <table className="tabela-fornecedores">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((f) => (
            <tr key={f.fornecedorId}>
              <td>{f.nome}</td>
              <td>{f.email}</td>
              <td>{f.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-fornecedores">
        <button className="voltar" onClick={() => navigate("/gestor/definicoes")}>
          Voltar
        </button>
        <button className="criar" onClick={() => navigate("/gestor/criar-fornecedor")}>
          Criar Novo Fornecedor
        </button>
        </div>

    </div>
  );
}

export default GestorListaFornecedoresPage;
