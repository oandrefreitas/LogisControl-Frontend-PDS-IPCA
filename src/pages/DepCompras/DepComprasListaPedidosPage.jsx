import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { listarPedidosCompraPorEstado } from "../../api/pedidoCompra";
import "./DepComprasListaPedidosPage.css";
import { obterCotacaoPorPedidoCompra } from "../../api/pedidoCotacao";

function DepComprasListaPedidosPage() {
  const [estado, setEstado] = useState("Aberto");
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  const carregar = async () => {
    try {
      const dados = await listarPedidosCompraPorEstado(estado);
      setPedidos(dados);
    } catch (err) {
      alert("Erro ao carregar pedidos de compra.");
    }
  };

  useEffect(() => {
    carregar();
  }, [estado]);

  const location = useLocation();

useEffect(() => {
  if (location.state?.refresh) {
    carregar();
    // Limpar o state para não ficar preso
    window.history.replaceState({}, document.title);
  }
}, [location.state]);


  const handleGerarCotacao = (pedidoId) => {
    navigate(`/depcompras/compras/${pedidoId}/cotacao`);
  };

  return (
    <div className="depcompras-pedidos-wrapper">
      <h2>Pedidos de Compra</h2>

      <div className="filtros">
        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Aberto">Aberto</option>
          <option value="EmCotacao">Em Cotação</option>
          <option value="ComOrcamentos">Com Orçamentos</option>
          <option value="Concluido">Concluído</option>
        </select>
      </div>

      <table className="tabela-pedidos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Estado</th>
            <th>Data</th>
            <th>Utilizador</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.pedidoCompraId}>
              <td>{p.pedidoCompraId}</td>
              <td>{p.descricao}</td>
              <td>{p.estado}</td>
              <td>{new Date(p.dataAbertura).toLocaleDateString()}</td>
              <td>{p.nomeUtilizador}</td>
              <td>
                {p.estado === "Aberto" && (
                  <button onClick={() => handleGerarCotacao(p.pedidoCompraId)}>
                    Pedir Cotação
                  </button>
                )}
                {estado === "ComOrcamentos" && (
                  <button onClick={() =>
                    navigate(`/depcompras/compras/${p.pedidoCompraId}/orcamentos`)
                  }>
                    Ver Orçamentos
                  </button>
                )}
                {p.estado === "Concluido" && (
                  <button onClick={() =>
                    navigate(`/depcompras/compras/${p.pedidoCompraId}/nota`)
                  }>
                    Ver Nota de Encomenda
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepComprasListaPedidosPage;