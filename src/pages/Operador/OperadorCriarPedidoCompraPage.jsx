import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { criarPedidoCompra } from "../../api/pedidoCompra";
import { obterMateriaPrimaPorId } from "../../api/materiaPrima";
import "./OperadorCriarPedidoCompraPage.css";

function OperadorCriarPedidoCompraPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [materia, setMateria] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const carregarMateria = async () => {
      try {
        const dados = await obterMateriaPrimaPorId(id);
        setMateria(dados);
      } catch (err) {
        alert("Erro ao carregar matéria-prima.");
      }
    };

    carregarMateria();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Utilizador não autenticado.");
      return;
    }
  
    const user = JSON.parse(userStr);
    const utilizadorId = user.id || user.utilizadorId;
  
    if (!utilizadorId) {
      alert("ID do utilizador não encontrado.");
      return;
    }
  
    if (!quantidade || quantidade <= 0) {
      alert("Insira uma quantidade válida.");
      return;
    }
  
    try {
      await criarPedidoCompra({
        descricao,
        utilizadorId,
        itens: [
          {
            materiaPrimaId: materia.materiaPrimaId,
            quantidade: quantidade,
          },
        ],
      });
      alert("Pedido criado com sucesso!");
      navigate("/operador/armazem");
    } catch (err) {
      alert("Erro ao criar pedido: " + (err.response?.data || err.message));
    }
  };
  
  if (!materia) return <p>A carregar...</p>;

  return (
    <div className="pedido-wrapper">
      <h2>Pedido de Compra - {materia.nome}</h2>
      <form onSubmit={handleSubmit} className="pedido-form">
        <div className="form-linha">
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Motivo do pedido..."
            required
          />
        </div>

        <div className="form-linha">
          <label>Quantidade a pedir</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="botoes-pedido">
          <button type="button" className="voltar" onClick={() => navigate("/operador/armazem")}>
            Voltar
          </button>
          <button type="submit" className="criar">
            Submeter Pedido
          </button>
        </div>
      </form>
    </div>
  );
}

export default OperadorCriarPedidoCompraPage;