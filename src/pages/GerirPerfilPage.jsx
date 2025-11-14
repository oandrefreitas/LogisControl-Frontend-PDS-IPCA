import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterPerfilUtilizador, atualizarPerfil } from "../api/utilizador";
import "./GerirPerfilPage.css";

function GerirPerfilPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    primeiroNome: "",
    sobrenome: "",
    novaPassword: "",
  });

  // Navegação com base na role guardada no localStorage
  const irParaDefinicoes = () => {
    const role = localStorage.getItem("role")?.toLowerCase();
    if (!role) {
      alert("Não foi possível identificar o tipo de utilizador.");
      return;
    }
    navigate(`/${role}/definicoes`);
  };

  useEffect(() => {
    const fetchUtilizador = async () => {
      try {
        const data = await obterPerfilUtilizador();
        setFormData({
          primeiroNome: data.primeiroNome,
          sobrenome: data.sobrenome,
          novaPassword: "",
        });
      } catch (error) {
        alert("Erro ao carregar dados do perfil.");
      }
    };

    fetchUtilizador();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await atualizarPerfil(formData);
      alert("Perfil atualizado com sucesso!");
      irParaDefinicoes();
    } catch (error) {
      alert("Erro ao atualizar perfil: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="editar-perfil-wrapper">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="formulario-editar-perfil">
        <div className="linha-formulario-editar-perfil">
          <label htmlFor="primeiroNome">Primeiro Nome</label>
          <input
            type="text"
            id="primeiroNome"
            name="primeiroNome"
            value={formData.primeiroNome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="linha-formulario-editar-perfil">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            type="text"
            id="sobrenome"
            name="sobrenome"
            value={formData.sobrenome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="linha-formulario-editar-perfil">
          <label htmlFor="novaPassword">Nova Password (opcional)</label>
          <input
            type="password"
            id="novaPassword"
            name="novaPassword"
            value={formData.novaPassword}
            onChange={handleChange}
          />
        </div>

        <div className="botoes-editar-perfil">
          <button type="button" className="voltar" onClick={irParaDefinicoes}>
            Cancelar
          </button>
          <button type="submit" className="criar">
            Guardar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}

export default GerirPerfilPage;
