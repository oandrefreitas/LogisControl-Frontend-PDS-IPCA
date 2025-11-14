import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarPedidoAquisicao } from "../../api/pedidoCompra";
import "./TecnicoPedidoCompraPage.css";

function TecnicoNovoPedidoPage() {
  const navigate = useNavigate();

  const nome = localStorage.getItem("nome") || "Utilizador";
  const [descricao, setDescricao] = useState("");
  const [editado, setEditado] = useState(false);

  const handleFocus = () => {
    if (!editado) {
      const dataHora = new Date().toLocaleString("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      const linha = `${nome} em ${dataHora}:`;
      setDescricao((prev) => prev + (prev ? "\n\n" : "") + linha);
      setEditado(true);
    }
  };

  const handleGuardar = async () => {
    try {
      await criarPedidoAquisicao({ descricao });
      alert("Pedido criado com sucesso!");
      navigate("/tecnico/pedidos-compra");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Erro ao criar pedido.");
    }
  };

  return (
    <div className="novo-pedido-wrapper">
      <div className="novo-pedido-header">Criar Pedido de Compra</div>

      <textarea
        className="novo-pedido-textarea"
        placeholder="Descreve o pedido de compra..."
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        onFocus={handleFocus}
      />

      <div className="novo-pedido-botoes">
        <button onClick={() => navigate("/tecnico/pedidos-compra")}>Voltar</button>
        <button onClick={handleGuardar}>Guardar</button>
      </div>
    </div>
  );
}

export default TecnicoNovoPedidoPage;
