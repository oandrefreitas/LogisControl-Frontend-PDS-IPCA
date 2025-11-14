import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterClientes } from "../../api/cliente";
import "./GestorListaClientesPage.css";

function GestorListaClientesPage() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregar = async () => {
      try {
        const lista = await obterClientes();
        setClientes(lista);
      } catch (err) {
        alert("Erro ao carregar clientes.");
      }
    };
    carregar();
  }, []);

  return (
    <div className="clientes-wrapper">
      <h2>Lista de Clientes</h2>
      <table className="tabela-clientes">
        <thead>
          <tr>
            <th>Nome</th>
            <th>NIF</th>
            <th>Morada</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.clienteId}>
              <td>{c.nome}</td>
              <td>{c.nif}</td>
              <td>{c.morada}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-clientes">
        <button className="voltar" onClick={() => navigate("/gestor/definicoes")}>
          Voltar
        </button>
        <button className="criar" onClick={() => navigate("/gestor/criar-cliente")}>
          Criar Novo Cliente
        </button>

      </div>
    </div>
  );
}

export default GestorListaClientesPage;