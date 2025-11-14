import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  listarPedidosManutencao,
  atualizarPedidoManutencao,
} from "../../api/pedidoManutencao";
import "./TecnicoPedidosManutencaoPage.css";

function TecnicoPedidosManutencaoPage() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [novoEstado, setNovoEstado] = useState("");
  const [editado, setEditado] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalDescricaoAberto, setModalDescricaoAberto] = useState(false); // Novo estado para o modal de descrição
  const [abaAtual, setAbaAtual] = useState("Em Espera");
  const [colunaOrdenada, setColunaOrdenada] = useState(null);
  const [ordemAscendente, setOrdemAscendente] = useState(true);

  const navigate = useNavigate();

  const fetchPedidos = useCallback(async () => {
    try {
      const data = await listarPedidosManutencao();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  }, []);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const ordenarPedidos = useCallback((coluna) => {
    const ascendente = coluna === colunaOrdenada ? !ordemAscendente : true;

    const pedidosOrdenados = [...pedidos].sort((a, b) => {
      let valorA = a[coluna];
      let valorB = b[coluna];

      if (coluna.toLowerCase().includes("data")) {
        valorA = valorA ? new Date(valorA).getTime() : 0;
        valorB = valorB ? new Date(valorB).getTime() : 0;
      }

      if (valorA < valorB) return ascendente ? -1 : 1;
      if (valorA > valorB) return ascendente ? 1 : -1;
      return 0;
    });

    setPedidos(pedidosOrdenados);
    setColunaOrdenada(coluna);
    setOrdemAscendente(ascendente);
  }, [pedidos, colunaOrdenada, ordemAscendente]);

  const abrirModal = (pedido, estadoDestino) => {
    setPedidoSelecionado(pedido);
    setNovoEstado(estadoDestino);
    setDescricaoEditada(estadoDestino === "Recusado" ? pedido.descricao : "");
    setEditado(false);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPedidoSelecionado(null);
    setDescricaoEditada("");
    setNovoEstado("");
    setEditado(false);
  };

  const guardarAlteracoes = async () => {
    if (novoEstado === "Recusado" && !descricaoEditada.trim()) {
      alert("Por favor, insira uma justificação.");
      return;
    }

    try {
      const nome = localStorage.getItem("nome") || "Utilizador";
      const dataHora = new Date().toLocaleString("pt-PT");

      const novaDescricao =
        novoEstado === "Recusado"
          ? descricaoEditada
          : `${pedidoSelecionado.descricao}\n\n${nome} em ${dataHora}: Estado alterado para ${novoEstado}`;

      const atualizado = {
        descricao: novaDescricao,
        estado: novoEstado,
        dataAbertura: pedidoSelecionado.dataAbertura,
        dataConclusao: novoEstado === "Concluido" ? new Date().toISOString() : pedidoSelecionado.dataConclusao,
        maquinaMaquinaId: pedidoSelecionado.maquinaMaquinaId,
        utilizadorUtilizadorId: pedidoSelecionado.utilizadorUtilizadorId,
      };

      await atualizarPedidoManutencao(pedidoSelecionado.pedidoManutId, atualizado);

      setPedidos((prevPedidos) =>
        prevPedidos.map((p) =>
          p.pedidoManutId === pedidoSelecionado.pedidoManutId
            ? { ...p, ...atualizado }
            : p
        )
      );

      await fetchPedidos();

      fecharModal();
      alert("Estado atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      alert("Erro ao atualizar pedido.");
    }
  };

  const pedidosFiltrados = pedidos.filter((p) => p.estado === abaAtual);

  const handleIdClick = (pedidoManutId) => {
    if (abaAtual === "Aceite") {
      navigate(`/tecnico/registos-manutencao/${pedidoManutId}`);
    }
  };

  return (
    <div className="lista-manutencao-wrapper">
      <div className="lista-manutencao-header">Pedidos de Manutenção</div>

      <div className="tabs-pedidos">
        {["Em Espera", "Aceite", "Recusado", "Concluido"].map((estado) => (
          <span
            key={estado}
            className={`tab-texto ${abaAtual === estado ? "ativo" : ""}`}
            onClick={() => setAbaAtual(estado)}
          >
            {estado}
          </span>
        ))}
      </div>

      <table className="lista-manutencao-tabela">
        <thead>
          <tr>
            <th onClick={() => ordenarPedidos("pedidoManutId")}>ID</th>
            <th>Descrição</th>
            <th onClick={() => ordenarPedidos("dataAbertura")}>Data Abertura</th>
            {abaAtual !== "Em Espera" && (
              <th onClick={() => ordenarPedidos("dataConclusao")}>Data Conclusão</th>
            )}
            <th>Máquina</th>
            <th>Operador</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidosFiltrados.length > 0 ? pedidosFiltrados.map((pedido, index) => (
            <tr
              key={pedido.pedidoManutId}
              className={index % 2 === 0 ? "linha-clara-lista-manutencao" : ""}
            >
              <td
                style={{
                  cursor: abaAtual === "Aceite" ? "pointer" : "default",
                  textDecoration: abaAtual === "Aceite" ? "underline" : "none",
                  color: abaAtual === "Aceite" ? "#007bff" : "inherit",
                }}
                onClick={() => handleIdClick(pedido.pedidoManutId)}
              >
                #{pedido.pedidoManutId}
              </td>
              <td
                className="descricao-clicavel"
                onClick={() => {
                  setPedidoSelecionado(pedido);
                  setModalDescricaoAberto(true);
                }}
                title="Clique para ver detalhes"
              >
                <span className="descricao-texto">
                  {pedido.descricao.length > 40
                    ? pedido.descricao.substring(0, 40) + "..."
                    : pedido.descricao}
                </span>
              </td>
              <td>{new Date(pedido.dataAbertura).toLocaleDateString("pt-PT")}</td>
              {abaAtual !== "Em Espera" && (
                <td>
                  {pedido.dataConclusao
                    ? new Date(pedido.dataConclusao).toLocaleDateString("pt-PT")
                    : "—"}
                </td>
              )}
              <td>{pedido.maquinaNome}</td>
              <td>{pedido.utilizadorNome}</td>
              <td>
                {abaAtual === "Em Espera" ? (
                  <div className="Gestao-utilizadores-dropdown-wrapper Gestao-utilizadores-dropdown-role">
                    <select
                      className="Gestao-utilizadores-dropdown-acao"
                      value={pedido.estado}
                      onChange={(e) => abrirModal(pedido, e.target.value)}
                    >
                      <option value="Em Espera">Em Espera</option>
                      <option value="Aceite">Aceite</option>
                      <option value="Recusado">Recusado</option>
                    </select>
                  </div>
                ) : (
                  <span className={`estado-texto estado-${pedido.estado.toLowerCase()}`}>
                    {pedido.estado}
                  </span>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Nenhum pedido encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal: Alterar Estado (existente) */}
      {modalAberto && pedidoSelecionado && (
        <div className="modal-overlay-lista-manutencao">
          <div className="modal-lista-manutencao">
            <h3>Alterar Estado</h3>

            {novoEstado === "Recusado" ? (
              <textarea
                className="modal-textarea-lista-manutencao"
                value={descricaoEditada}
                onChange={(e) => setDescricaoEditada(e.target.value)}
                onFocus={() => {
                  if (!editado) {
                    const nome = localStorage.getItem("nome") || "Utilizador";
                    const dataHora = new Date().toLocaleString("pt-PT");
                    const novaLinha = `\n\n${nome} em ${dataHora}:`;
                    setDescricaoEditada((prev) => prev + novaLinha);
                    setEditado(true);
                  }
                }}
              />
            ) : (
              <p>
                Tem certeza que deseja alterar para <strong>{novoEstado}</strong>?
              </p>
            )}

            <div className="modal-botoes-lista-manutencao">
              <button onClick={fecharModal}>Cancelar</button>
              <button onClick={guardarAlteracoes}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      {/* Novo Modal: Ver Descrição Completa */}
      {modalDescricaoAberto && pedidoSelecionado && (
        <div className="modal-overlay-lista-manutencao">
          <div className="modal-lista-manutencao">
            <h3>Descrição Completa</h3>
            <textarea
              className="modal-textarea-lista-manutencao"
              value={pedidoSelecionado.descricao}
              readOnly
            />
            <div className="modal-botoes-lista-manutencao">
              <button onClick={() => setModalDescricaoAberto(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TecnicoPedidosManutencaoPage;