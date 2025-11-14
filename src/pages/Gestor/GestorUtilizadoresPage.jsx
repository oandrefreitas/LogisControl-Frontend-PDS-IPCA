import React, { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  obterUtilizadores,
  atualizarUtilizador,
  resetPasswordUtilizador 
} from "../../api/utilizador";
import "./GestorUtilizadoresPage.css";

function GestorUtilizadoresPage() {
  const navigate = useNavigate();
  const [utilizadores, setUtilizadores] = useState([]);

  useEffect(() => {
    const fetchUtilizadores = async () => {
      try {
        const response = await obterUtilizadores();
        setUtilizadores(response);
      } catch (error) {
        console.error("Erro ao carregar utilizadores:", error);
      }
    };

    fetchUtilizadores();
  }, []);

  // Atualiza o perfil
  const alterarRole = async (id, novoRole) => {
    try {
      const utilizadorAtual = utilizadores.find(
        (u) => u.utilizadorId === id
      );
      await atualizarUtilizador(id, {
        role: novoRole,
        estado: utilizadorAtual.estado
      });

      setUtilizadores((prev) =>
        prev.map((u) =>
          u.utilizadorId === id ? { ...u, role: novoRole } : u
        )
      );
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  // Atualiza o estado
  const toggleEstado = async (id, novoEstado) => {
    try {
      const utilizadorAtual = utilizadores.find(
        (u) => u.utilizadorId === id
      );
      await atualizarUtilizador(id, {
        estado: novoEstado,
        role: utilizadorAtual.role
      });

      setUtilizadores((prev) =>
        prev.map((u) =>
          u.utilizadorId === id ? { ...u, estado: novoEstado } : u
        )
      );
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar estado:", error);
    }
  };

  return (
    <div className="Gestao-utilizadores-page">
      <h2 className="Gestao-utilizadores-titulo">Gerir Utilizadores</h2>

      <table className="Gestao-utilizadores-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nº Funcionário</th>
            <th>Perfil</th>
            <th>Estado</th>
            <th>Reset Password</th>
          </tr>
        </thead>
        <tbody>
          {utilizadores.map((u, i) => (
            <tr
              key={u.utilizadorId}
              className={i % 2 === 0 ? "Gestao-utilizadores-linha-clara" : ""}
            >
              <td>{u.primeiroNome} {u.sobrenome}</td>
              <td>{u.numFuncionario}</td>

              {/* Dropdown de perfil */}
              <td>
                <div className="Gestao-utilizadores-dropdown-wrapper Gestao-utilizadores-dropdown-role">
                  <select
                    value={u.role}
                    onChange={(e) =>
                      alterarRole(u.utilizadorId, e.target.value)
                    }
                    className="Gestao-utilizadores-dropdown-acao"
                  >
                    <option value="Gestor">Gestor</option>
                    <option value="Tecnico">Técnico</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Operador">Operador</option>
                    <option value="DepCompras">DepCompras</option>
                  </select>
                </div>
              </td>

              {/* Dropdown de estado */}
              <td>
                <div className="Gestao-utilizadores-dropdown-wrapper Gestao-utilizadores-dropdown-estado">
                  <select
                    value={u.estado ? "Ativo" : "Inativo"}
                    onChange={(e) =>
                      toggleEstado(
                        u.utilizadorId,
                        e.target.value === "Ativo"
                      )
                    }
                    className="Gestao-utilizadores-dropdown-acao"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </td>
              <td>
              <button
                className="Gestao-utilizadores-reset-button"
                title="Reset Password"
                onClick={async () => {
                  try {
                    await resetPasswordUtilizador({
                      numFuncionario: u.numFuncionario,
                      novaPassword: "123"
                    });
                    alert(`Password de ${u.primeiroNome} redefinida para '123' com sucesso!`);
                  } catch (error) {
                    console.error("Erro ao redefinir password:", error);
                    alert("Erro ao redefinir a password.");
                  }
                }}
              >
                <KeyRound size={20} />
              </button>
            </td>


            </tr>
          ))}
        </tbody>
      </table>

      {/* Botões no fundo */}
      <div className="Gestao-utilizadores-botoes">
        <button
          onClick={() => navigate("/gestor/definicoes")}
          className="Gestao-utilizadores-botao-voltar"
        >
          Voltar
        </button>
        <button
          onClick={() => navigate("/gestor/novo-utilizador")}
          className="Gestao-utilizadores-botao-criar"
        >
          Criar Novo Utilizador
        </button>
      </div>
    </div>
  );
}

export default GestorUtilizadoresPage;