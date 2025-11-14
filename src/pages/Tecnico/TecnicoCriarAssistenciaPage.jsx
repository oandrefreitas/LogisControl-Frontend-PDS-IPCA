import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarAssistencia } from "../../api/assistencia";
import "./TecnicoCriarAssistenciaPage.css";


function TecnicoCriarAssistenciaPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    nif: "",
    morada: "",
    telefone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limitar NIF e telefone a 9 dígitos
    if (name === "nif" || name === "telefone") {
      const apenasNumeros = value.replace(/\D/g, "").slice(0, 9);
      setFormData(prev => ({ ...prev, [name]: apenasNumeros }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarAssistencia({
        ...formData,
        nif: parseInt(formData.nif, 10),
        telefone: parseInt(formData.telefone, 10)
      });
      navigate("/tecnico/listar-assistencias");
    } catch (error) {
      alert("Erro ao criar assistência: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="tecnico-criar-assistencia-wrapper">
      <h2>Criar Nova Assistência Externa</h2>
      <form onSubmit={handleSubmit} className="tecnico-formulario-criar-assistencia">
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "NIF", name: "nif", type: "text" },
          { label: "Telefone", name: "telefone", type: "text" },
          { label: "Morada", name: "morada", type: "text" }
        ].map((campo) => (
          <div className="tecnico-linha-formulario" key={campo.name}>
            <label htmlFor={campo.name}>{campo.label}</label>
            <input
              type={campo.type}
              id={campo.name}
              name={campo.name}
              value={formData[campo.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="tecnico-botoes-formulario">
        <button type="button" className="voltar" onClick={() => navigate(-1)}>
            Voltar
          </button>
          <button type="submit" className="criar">Criar Assistência</button>
        </div>
      </form>
    </div>
  );
}

export default TecnicoCriarAssistenciaPage;
