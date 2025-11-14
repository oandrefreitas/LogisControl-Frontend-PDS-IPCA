import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarPedidosManutencaoPorUtilizador, reabrirPedidoManutencao } from "../../api/pedidoManutencao";
import "./OperadorListaPedidosManutencaoPage.css";

function OperadorManutencaoPage() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [colunaOrdenada, setColunaOrdenada] = useState(null);
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [justificacao, setJustificacao] = useState("");


  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await listarPedidosManutencaoPorUtilizador();
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

      if (valorA < valorB) return novaOrdemAscendente ? -1 : 1;
      if (valorA > valorB) return novaOrdemAscendente ? 1 : -1;
      return 0;
    });

    setPedidos(pedidosOrdenados);
    setColunaOrdenada(coluna);
    setOrdemAscendente(novaOrdemAscendente);
  };

  const reabrirPedido = async () => {
      if (!justificacao.trim()) {
        alert("Por favor, insira uma justificação para reabrir o pedido.");
        return;
      }
    
      try {
        await reabrirPedidoManutencao({
          pedidoManutId: pedidoSelecionado.pedidoManutId,
          justificacao: justificacao
        });
    
        alert("Pedido reaberto com sucesso.");
        setModalAberto(false);
        setJustificacao("");
    
        const updatedPedidos = await listarPedidosManutencaoPorUtilizador();
        setPedidos(updatedPedidos);
      } catch (error) {
        alert("Erro ao reabrir o pedido.");
        console.error(error);
      }
    };
    
  return (
    <div className="pedidos-manutencao-wrapper">
      <div className="pedidos-manutencao-header">Pedidos de Manutenção</div>

      <table className="pedidos-manutencao-tabela">
        <thead>
          <tr>
            <th onClick={() => ordenarPedidos("pedidoManutId")}>
              <span className="coluna-clicavel-pedidos-manutencao">ID</span>
            </th>
            <th style={{ width: '25%' }}>Descrição</th> {/* Coluna mais estreita */}
            <th onClick={() => ordenarPedidos("dataAbertura")}>
              <span className="coluna-clicavel-pedidos-manutencao">Data Abertura</span>
            </th>
            <th onClick={() => ordenarPedidos("dataConclusao")}>
              <span className="coluna-clicavel-pedidos-manutencao">Data Conclusão</span>
            </th>
            <th onClick={() => ordenarPedidos("estado")}>
              <span className="coluna-clicavel-pedidos-manutencao">Estado</span>
            </th>
            <th>Máquina</th>
            <th>Operador</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr
              key={pedido.pedidoManutId}
              className={index % 2 === 0 ? "linha-clara-pedidos-manutencao" : ""}
            >
              <td>#{pedido.pedidoManutId}</td>
              <td
                className="descricao-clicavel"
                onClick={() => {
                  setPedidoSelecionado(pedido);
                  setModalAberto(true);
                }}
                title="Clique para ver detalhes"
              >
                <span className="descricao-texto">
                  {pedido.descricao.length > 50
                    ? pedido.descricao.substring(0, 50) + "..."
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

      {modalAberto && pedidoSelecionado && (
  <div className="modal-overlay-pedidos-manutencao">
    <div className="modal-pedidos-manutencao">
      <h3>Descrição Completa</h3>
      <textarea
        className="modal-textarea-pedidos-manutencao"
        value={pedidoSelecionado.descricao}
        disabled
      />

      {pedidoSelecionado.estado === "Concluido" && (
        <>
          <textarea
            className="modal-textarea-pedidos-manutencao"
            placeholder="Justificação da reabertura"
            value={justificacao}
            onChange={(e) => setJustificacao(e.target.value)}
          />
          <div className="modal-botoes">
            <button onClick={() => setModalAberto(false)}>Cancelar</button>
            <button onClick={reabrirPedido}>Reabrir Pedido</button>
          </div>
        </>
      )}

      {pedidoSelecionado.estado !== "Concluido" && (
        <div className="modal-botoes">
          <button onClick={() => setModalAberto(false)}>Fechar</button>
        </div>
      )}
    </div>
  </div>
)}


      <div className="botoes-pedidos-manutencao">
        <button onClick={() => navigate("/operador/home")}>Voltar</button>
        <button onClick={() => navigate("/operador/criar-pedido-manutencao")}>
          Criar Novo Pedido
        </button>
      </div>
    </div>
  );
}

export default OperadorManutencaoPage;