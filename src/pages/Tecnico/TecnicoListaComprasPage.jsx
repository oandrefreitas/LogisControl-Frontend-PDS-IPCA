import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarPedidoAquisicaoPorUtilizador,
  atualizarDescricaoAquisicao,
} from "../../api/pedidoCompra";
import "./TecnicoListaComprasPage.css";

function TecnicoListaComprasPage() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [colunaOrdenada, setColunaOrdenada] = useState(null);
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Função para ordenar pedidos
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

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await listarPedidoAquisicaoPorUtilizador();
        setPedidos(response);
      } catch (error) {
        console.error("Erro ao carregar pedidos de compra:", error);
      }
    };

    fetchPedidos();
  }, []);

  const abrirModal = (index, pedido) => {
    setPedidoSelecionado({ ...pedido, index });
    setDescricaoEditada(pedido.descricao);
    setModoEdicao(false);
    setModalAberto(true);
  };

  const ativarModoEdicao = () => {
    const nome = pedidoSelecionado.nomeUtilizador;
    const dataHora = new Date().toLocaleString("pt-PT");
    const novaDescricao = `${descricaoEditada}\n\n${nome} em ${dataHora}: `;
    setDescricaoEditada(novaDescricao);
    setModoEdicao(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPedidoSelecionado(null);
    setDescricaoEditada("");
    setModoEdicao(false);
  };

  const guardarDescricao = async () => {
    try {
      await atualizarDescricaoAquisicao(pedidoSelecionado.pedidoCompraId, descricaoEditada);
      const novosPedidos = [...pedidos];
      novosPedidos[pedidoSelecionado.index].descricao = descricaoEditada;
      setPedidos(novosPedidos);
      fecharModal();
      alert("Descrição atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar descrição:", error);
      alert("Erro ao atualizar descrição.");
    }
  };

  return (
    <div className="lista-compras-wrapper">
      <div className="lista-compras-header">Lista Pedidos de Aquisição</div>

      <div className="lista-compras-filtro-wrapper">
        <label htmlFor="filtro-estado">Filtrar:</label>
        <select
          id="filtro-estado"
          className="lista-compras-dropdown"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Pendente">Pendente</option>
          <option value="Aceite">Aceite</option>
          <option value="Recusado">Recusado</option>
        </select>
      </div>

      <table className="lista-compras-tabela">
        <thead>
          <tr>
            <th onClick={() => ordenarPedidos("pedidoCompraId")}>
              <span className="coluna-clicavel-lista-compra">ID</span>
            </th>
            <th>Descrição</th>
            <th onClick={() => ordenarPedidos("dataAbertura")}>
              <span className="coluna-clicavel-lista-compra">Data Abertura</span>
            </th>
            <th onClick={() => ordenarPedidos("dataConclusao")}>
              <span className="coluna-clicavel-lista-compra">Data Conclusão</span>
            </th>
            <th onClick={() => ordenarPedidos("estado")}>
              <span className="coluna-clicavel-lista-compra">Estado</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {pedidos
            .filter((pedido) => filtroEstado === "Todos" || pedido.estado === filtroEstado)
            .map((pedido, index) => (
              <tr
                key={pedido.pedidoCompraId}
                className={index % 2 === 0 ? "linha-clara-lista-compras" : ""}
              >
                <td>#{pedido.pedidoCompraId}</td>
                <td
                  className="descricao-popup-lista-compras"
                  onClick={() => abrirModal(index, pedido)}
                  title="Clique para ver detalhes"
                >
                  <span className="descricao-clicavel-lista-compras">
                    {pedido.descricao.length > 40
                      ? pedido.descricao.substring(0, 40) + "..."
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
              </tr>
            ))}
        </tbody>
      </table>

      <div className="botoes-lista-compras">
        <button onClick={() => navigate("/tecnico/home")}>Voltar</button>
        <button onClick={() => navigate("/tecnico/criar-pedido-compra")}>Criar Novo Pedido</button>
      </div>

      {modalAberto && pedidoSelecionado && (
        <div className="modal-overlay-lista-compras">
          <div className="modal-lista-compras">
            <h3>Detalhes do Pedido</h3>
            <textarea
              className="modal-textarea-lista-compras"
              value={descricaoEditada}
              onChange={(e) => setDescricaoEditada(e.target.value)}
              disabled={pedidoSelecionado.estado !== "Aberto"}
              onFocus={() => {
                if (
                  pedidoSelecionado.estado === "Aberto" &&
                  !modoEdicao
                ) {
                  const nome = localStorage.getItem("nome") || "Utilizador";
                  const dataHora = new Date().toLocaleString("pt-PT");
                  const novaLinha = `\n\n${nome} em ${dataHora}: `;
                  setDescricaoEditada((prev) => prev + novaLinha);
                  setModoEdicao(true);

                  // Mover o cursor para o fim após update
                  setTimeout(() => {
                    const ta = document.querySelector(".modal-textarea-lista-compras");
                    if (ta) ta.selectionStart = ta.selectionEnd = ta.value.length;
                  }, 0);
                }
              }}
            />
            <div className="modal-botoes-lista-compras">
              <button onClick={fecharModal}>Fechar</button>
              {pedidoSelecionado.estado === "Aberto" && (
                <button onClick={guardarDescricao}>Guardar</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TecnicoListaComprasPage;