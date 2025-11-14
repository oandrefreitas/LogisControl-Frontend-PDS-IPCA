import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criarMaquina } from "../../api/maquina";
import { listarAssistencias } from "../../api/assistencia";
import "./TecnicoCriarMaquinaPage.css";

function TecnicoCriarMaquinaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    linhaProd: "",
    assistenciaExternaAssistenteId: ""
  });

  const [assistencias, setAssistencias] = useState([]);

  useEffect(() => {
    const fetchAssistencias = async () => {
      try {
        const data = await listarAssistencias();
        setAssistencias(data);
      } catch (error) {
        alert("Erro ao carregar assistências.");
      }
    };
    fetchAssistencias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const valor = name === "linhaProd" ? value.replace(/\D/g, "").slice(0, 9) : value;
    setFormData((prev) => ({ ...prev, [name]: valor }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.assistenciaExternaAssistenteId) {
      alert("Por favor selecione uma assistência externa.");
      return;
    }

    try {
      await criarMaquina({
        ...formData,
        linhaProd: parseInt(formData.linhaProd, 10),
        assistenciaExternaAssistenteId: parseInt(formData.assistenciaExternaAssistenteId, 10)
      });

      alert("Máquina criada com sucesso!");
      navigate("/tecnico/listar-maquinas")
    } catch (error) {
      alert("Erro ao criar máquina: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="tecnico-criar-maquina-wrapper">
      <h2>Criar Nova Máquina</h2>

      <form onSubmit={handleSubmit} className="tecnico-criar-maquina-formulario">
        <div className="tecnico-criar-maquina-linha">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="tecnico-criar-maquina-linha">
          <label htmlFor="linhaProd">Linha</label>
          <input
            type="text"
            inputMode="numeric"
            id="linhaProd"
            name="linhaProd"
            value={formData.linhaProd}
            onChange={handleChange}
            required
          />
        </div>

        <div className="tecnico-criar-maquina-linha">
          <label htmlFor="assistencia">Assistência Externa</label>
          <select
            id="assistencia"
            name="assistenciaExternaAssistenteId"
            value={formData.assistenciaExternaAssistenteId}
            onChange={handleChange}
            required
          >
            {assistencias.map((a) => (
              <option key={a.assistenteId} value={a.assistenteId}>
                {a.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="tecnico-criar-maquina-botoes">
        <button type="button" className="voltar" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button type="submit">Criar Máquina</button>
        </div>
      </form>
    </div>
  );
}

export default TecnicoCriarMaquinaPage;
