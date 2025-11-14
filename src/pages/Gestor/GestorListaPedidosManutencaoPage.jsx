import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPedidosManutencao } from "../../api/pedidoManutencao";
import "./GestorListaPedidosManutencaoPage.css";

function GestorListaPedidosManutencaoPage() {
  const [pedidos, setPedidos] = useState([]);
  const [colunaOrdenada, setColunaOrdenada] = useState(null);
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  
  // Estado para controle do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await listarPedidosManutencao();
        setPedidos(response);
      } catch (error) {
        console.error("Erro ao carregar pedidos de manutenção:", error);
      }
    };
    fetchPedidos();
  }, []);

  const ordenarPedidos = (coluna) => {
    const novaOrdemAscendente = coluna === colunaOrdenada ? !ordemAscendente : true;
    const pedidosOrdenados = [...pedidos].sort((a, b) => {
      let valorA = a[coluna];
      let valorB = b[coluna];

      if (coluna.toLowerCase().includes("data")) {
        valorA = new Date(valorA);
        valorB = new Date(valorB);
      }

      return novaOrdemAscendente
        ? valorA > valorB
          ? 1
          : -1
        : valorA < valorB
        ? 1
        : -1;
    });

    setPedidos(pedidosOrdenados);
    setColunaOrdenada(coluna);
    setOrdemAscendente(novaOrdemAscendente);
  };

  return (
    <div className="pedidos-manutencao-wrapper">
      <div className="pedidos-manutencao-header">Todos os Pedidos de Manutenção</div>

      <table className="pedidos-manutencao-tabela">
        <thead>
          <tr>
            <th onClick={() => ordenarPedidos("pedidoManutId")}>
              <span>ID</span>
            </th>
            <th>Descrição</th>
            <th onClick={() => ordenarPedidos("dataAbertura")}>Data Abertura</th>
            <th onClick={() => ordenarPedidos("dataConclusao")}>Data Conclusão</th>
            <th onClick={() => ordenarPedidos("estado")}>Estado</th>
            <th>Maquina</th>
            <th>Operador</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr
              key={pedido.pedidoManutId}
              className={index % 2 === 0 ? "linha-clara-pedidos-manutencao" : ""}
            >
              <td>
                <Link 
                  to={`/gestor/registos-manutencao/${pedido.pedidoManutId}`}  // Link para a página de registos
                  className="coluna-clicavel-pedidos-manutencao"
                >
                  #{pedido.pedidoManutId}
                </Link>
              </td>
              <td
                className="descricao-clicavel-pedidos-manutencao"
                onClick={() => {
                  setPedidoSelecionado(pedido); // Seleciona o pedido
                  setModalAberto(true); // Abre o modal
                }}
                title="Clique para ver detalhes"
              >
                <span className="descricao-texto">
                  {pedido.descricao.length > 40
                    ? pedido.descricao.substring(0, 40) + "..." // Cortar texto e adicionar "..."
                    : pedido.descricao}
                </span>
              </td>
              <td>{new Date(pedido.dataAbertura).toLocaleDateString()}</td>
              <td>
                {pedido.dataConclusao
                  ? new Date(pedido.dataConclusao).toLocaleDateString()
                  : "—"}
              </td>
              <td>{pedido.estado}</td>
              <td>{pedido.maquinaNome}</td>
              <td>{pedido.utilizadorNome}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal: Ver Descrição */}
      {modalAberto && pedidoSelecionado && (
        <div className="modal-overlay-lista-compras">
          <div className="modal-lista-compras">
            <h3>Descrição Completa</h3>
            <textarea
              className="modal-textarea-lista-compras"
              value={pedidoSelecionado.descricao} // Exibe a descrição completa
              disabled
            />
            <div className="modal-botoes-lista-compras">
              <button onClick={() => setModalAberto(false)}>Fechar</button> {/* Fecha o modal */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestorListaPedidosManutencaoPage;