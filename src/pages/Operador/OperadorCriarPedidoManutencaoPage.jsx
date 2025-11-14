import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criarPedidoManutencao } from "../../api/pedidoManutencao";
import { listarMaquinas } from "../../api/maquina";
import "./OperadorCriarPedidoManutencaoPage.css";

function OperadorCriarPedidoManutencao() {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [maquinaId, setMaquinaId] = useState("");
  const [maquinas, setMaquinas] = useState([]);

  // Carrega as máquinas disponíveis no dropdown
  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const response = await listarMaquinas();
        setMaquinas(response);
      } catch (error) {
        console.error("Erro ao carregar máquinas:", error);
      }
    };

    fetchMaquinas();
  }, []);

  const handleCriar = async () => {
    if (!descricao || !maquinaId) {
      alert("Preenche todos os campos!");
      return;
    }
  
    try {
      const novoPedido = {
        Descricao: descricao,
        MaquinaMaquinaId: parseInt(maquinaId),
        DataAbertura: new Date().toISOString(),
        Estado: "Em Espera", 
        DataConclusao: null  
      };
  
      console.log("A enviar pedido de manutenção:", novoPedido);
  
      await criarPedidoManutencao(novoPedido);
      alert("Pedido de manutenção criado com sucesso!");
      navigate("/operador/manutencao");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      alert("Erro ao criar pedido de manutenção.");
    }
  };

  return (
    <div className="criar-pedido-manutencao-page">
      <h2 className="criar-pedido-manutencao-titulo">Novo Pedido de Manutenção</h2>

      <div className="criar-pedido-manutencao-form">
        <label>Descrição do Problema</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreve o problema encontrado..."
        />

        <label>Máquina Associada</label>
        <select value={maquinaId} onChange={(e) => setMaquinaId(e.target.value)}>
          <option value="">-- Selecionar Máquina --</option>
          {maquinas.map((m) => (
            <option key={m.maquinaId} value={m.maquinaId}>
              {m.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="criar-pedido-manutencao-botoes">
        <button onClick={() => navigate("/operador/manutencao")}>Cancelar</button>
        <button onClick={handleCriar}>Criar Pedido</button>
      </div>
    </div>
  );
}

export default OperadorCriarPedidoManutencao;
