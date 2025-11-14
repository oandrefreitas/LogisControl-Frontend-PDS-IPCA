import React, { useEffect, useState } from "react";
import {
  listarPedidosAquisicaoPorRole,
  atualizarEstadoPedidoAquisicao,
  atualizarDescricaoAquisicao,
} from "../../api/pedidoCompra";
import "./GestorListaPedidosCompraPage.css";

function GestorListaPedidosCompraPage() {
  const [pedidos, setPedidos] = useState([]);
  const [modalEstadoAberto, setModalEstadoAberto] = useState(false);
  const [modalDescricaoAberto, setModalDescricaoAberto] = useState(false);
  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [editado, setEditado] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [novoEstado, setNovoEstado] = useState("");
  const [colunaOrdenada, setColunaOrdenada] = useState(null);
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [abaAtual, setAbaAtual] = useState("Aberto");

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await listarPedidosAquisicaoPorRole();
        setPedidos(data);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    };
    fetchPedidos();
  }, []);

  const ordenarPedidos = (coluna) => {
    const ascendente = coluna === colunaOrdenada ? !ordemAscendente : true;
    const pedidosOrdenados = [...pedidos].sort((a, b) => {
      let valorA = a[coluna];
      let valorB = b[coluna];

      if (coluna.toLowerCase().includes("data")) {
        valorA = valorA ? new Date(valorA) : new Date(0);
        valorB = valorB ? new Date(valorB) : new Date(0);
      }

      return ascendente
        ? valorA > valorB
          ? 1
          : -1
        : valorA < valorB
        ? 1
        : -1;
    });

    setPedidos(pedidosOrdenados);
    setColunaOrdenada(coluna);
    setOrdemAscendente(ascendente);
  };

  const abrirModalDescricao = (pedido) => {
    setPedidoSelecionado(pedido);
    setModalDescricaoAberto(true);
  };

  const abrirModalEdicao = (pedido, estadoDestino) => {
    setPedidoSelecionado(pedido);
    setNovoEstado(estadoDestino);
    if (estadoDestino === "Recusado") {
      setDescricaoEditada(pedido.descricao);
      setEditado(false);
    }
    setModalEstadoAberto(true);
  };

  const fecharModalDescricao = () => {
    setModalDescricaoAberto(false);
    setPedidoSelecionado(null);
  };

  const fecharModalEstado = () => {
    setModalEstadoAberto(false);
    setPedidoSelecionado(null);
    setNovoEstado("");
    setDescricaoEditada("");
    setEditado(false);
  };

  const guardarAlteracoes = async () => {
    if (novoEstado === "Recusado" && !descricaoEditada.trim()) {
      alert("Por favor, insere uma justificação.");
      return;
    }

    try {
      const nome = localStorage.getItem("nome") || "Utilizador";
      const dataHora = new Date().toLocaleString("pt-PT");
      const novaDescricao =
        novoEstado === "Recusado"
          ? descricaoEditada
          : `${pedidoSelecionado.descricao}\n\n${nome} em ${dataHora}: Alterado para ${novoEstado}`;

      await atualizarEstadoPedidoAquisicao(pedidoSelecionado.pedidoCompraId, novoEstado);
      await atualizarDescricaoAquisicao(pedidoSelecionado.pedidoCompraId, novaDescricao);

      setPedidos((prev) =>
        prev.map((p) =>
          p.pedidoCompraId === pedidoSelecionado.pedidoCompraId
            ? {
                ...p,
                estado: novoEstado,
                descricao: novaDescricao,
                dataConclusao:
                  novoEstado === "Aceite" || novoEstado === "Recusado"
                    ? new Date().toISOString()
                    : null,
              }
            : p
        )
      );

      fecharModalEstado();
      alert("Estado e descrição atualizados.");
    } catch (error) {
      console.error("Erro ao guardar alterações:", error);
      alert("Erro ao guardar alterações.");
    }
  };

  const pedidosFiltrados = pedidos.filter((p) => p.estado === abaAtual);

  return (
    <div className="lista-compras-wrapper">
      <div className="lista-compras-header">Lista de Pedidos de Aquisição</div>

      {/* Tabs */}
      <div className="tabs-pedidos">
        {["Aberto", "Aceite", "Recusado"].map((estado) => (
          <span
            key={estado}
            className={`tab-texto ${abaAtual === estado ? "ativo" : ""}`}
            onClick={() => setAbaAtual(estado)}
          >
            {estado === "Aberto" ? "Em Análise" : estado}
          </span>
        ))}
      </div>

      {/* Tabela */}
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
            {abaAtual !== "Aberto" && (
              <th onClick={() => ordenarPedidos("dataConclusao")}>
                <span className="coluna-clicavel-lista-compra">Data Conclusão</span>
              </th>
            )}
            <th>Utilizador</th>
            <th onClick={() => ordenarPedidos("estado")}>
              <span className="coluna-clicavel-lista-compra">Estado</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {pedidosFiltrados.map((pedido, index) => (
            <tr
              key={pedido.pedidoCompraId}
              className={index % 2 === 0 ? "linha-clara-lista-compras" : ""}
            >
              <td>#{pedido.pedidoCompraId}</td>
              <td>
                <span
                  className="descricao-clicavel-lista-compras"
                  onClick={() => abrirModalDescricao(pedido)}
                >
                  {pedido.descricao.length > 40
                    ? pedido.descricao.substring(0, 40) + "..."
                    : pedido.descricao}
                </span>
              </td>
              <td>{new Date(pedido.dataAbertura).toLocaleDateString("pt-PT")}</td>
              {abaAtual !== "Aberto" && (
                <td>
                  {pedido.dataConclusao
                    ? new Date(pedido.dataConclusao).toLocaleDateString("pt-PT")
                    : "—"}
                </td>
              )}
              <td>{pedido.nomeUtilizador}</td>
              <td>
                {abaAtual === "Aberto" ? (
                  <div className="Gestao-utilizadores-dropdown-wrapper Gestao-utilizadores-dropdown-role">
                    <select
                      className="Gestao-utilizadores-dropdown-acao"
                      value={pedido.estado}
                      onChange={(e) =>
                        abrirModalEdicao(pedido, e.target.value)
                      }
                    >
                      <option value="Aberto">Aberto</option>
                      <option value="Aceite">Aceite</option>
                      <option value="Recusado">Recusado</option>
                    </select>
                  </div>
                ) : (
                  <span
                    className={`estado-texto estado-${pedido.estado.toLowerCase()}`}
                  >
                    {pedido.estado}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal: Ver Descrição */}
      {modalDescricaoAberto && pedidoSelecionado && (
        <div className="modal-overlay-lista-compras">
          <div className="modal-lista-compras">
            <h3>Descrição Completa</h3>
            <textarea
              className="modal-textarea-lista-compras"
              value={pedidoSelecionado.descricao}
              disabled
            />
            <div className="modal-botoes-lista-compras">
              <button onClick={fecharModalDescricao}>Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Alterar Estado */}
      {modalEstadoAberto && pedidoSelecionado && (
        <div className="modal-overlay-lista-compras">
          <div className="modal-lista-compras">
            <h3>Alterar Estado</h3>
            {novoEstado === "Recusado" ? (
              <textarea
                className="modal-textarea-lista-compras"
                value={descricaoEditada}
                onChange={(e) => setDescricaoEditada(e.target.value)}
                onFocus={() => {
                  if (!editado) {
                    const nome =
                      localStorage.getItem("nome") || "Utilizador";
                    const dataHora = new Date().toLocaleString("pt-PT");
                    const novaLinha = `\n\n${nome} em ${dataHora}: `;
                    setDescricaoEditada((prev) => prev + novaLinha);
                    setEditado(true);
                    setTimeout(() => {
                      const ta = document.querySelector(
                        ".modal-textarea-lista-compras"
                      );
                      if (ta)
                        ta.selectionStart = ta.selectionEnd = ta.value.length;
                    }, 0);
                  }
                }}
              />
            ) : (
              <p>
                Tem a certeza que deseja alterar para{" "}
                <strong>{novoEstado}</strong>?
              </p>
            )}
            <div className="modal-botoes-lista-compras">
              <button onClick={fecharModalEstado}>Cancelar</button>
              <button onClick={guardarAlteracoes}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestorListaPedidosCompraPage;