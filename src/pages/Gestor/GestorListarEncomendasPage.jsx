import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import {
  obterEncomendas,
  atualizarEstadoEncomenda,
} from "../../api/Encomenda";
import { criarOrdemProducao } from "../../api/OrdemProducao";
import { listarMaquinas } from "../../api/maquina";
import "./GestorListarEncomendasPage.css";

function GestorListarEncomendasPage() {
  const navigate = useNavigate();
  const [encomendas, setEncomendas] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState({});
  const [modalAberto, setModalAberto] = useState(false);
  const [encomendaSelecionada, setEncomendaSelecionada] = useState(null);
  const [maquinas, setMaquinas] = useState([]);
  const [maquinaSelecionada, setMaquinaSelecionada] = useState("");

  useEffect(() => {
    fetchEncomendas();
  }, []);

  async function fetchEncomendas() {
    try {
      const encomendasData = await obterEncomendas();
      setEncomendas(encomendasData);

      const inicial = {};
      encomendasData.forEach((encomenda) => {
        inicial[encomenda.encomendaClienteId] = encomenda.estado;
      });
      setEstadoSelecionado(inicial);
    } catch (error) {
      console.error("Erro ao buscar encomendas:", error);
    }
  }

  async function abrirModal(encomenda) {
    try {
      const maquinasDisponiveis = await listarMaquinas();
      setMaquinas(maquinasDisponiveis);
      setEncomendaSelecionada(encomenda);
      setMaquinaSelecionada("");
      setModalAberto(true);
    } catch (error) {
      console.error("Erro ao carregar máquinas:", error);
      alert("Erro ao carregar máquinas disponíveis.");
    }
  }

  function fecharModal() {
    setModalAberto(false);
    setEncomendaSelecionada(null);
    setMaquinaSelecionada("");
  }

  async function handleCriarOrdem() {
    if (!maquinaSelecionada) {
      alert("Por favor selecione uma máquina.");
      return;
    }

    const novaOrdem = {
      estado: "Aberta",
      quantidade: encomendaSelecionada.quantidade,
      dataAbertura: new Date().toISOString(),
      dataConclusao: null,
      maquinaMaquinaId: parseInt(maquinaSelecionada),
      encomendaClienteEncomendaClienteId: encomendaSelecionada.encomendaClienteId,
    };

    try {
      await criarOrdemProducao(novaOrdem);
      alert("Ordem de produção criada com sucesso.");
      fecharModal();
      fetchEncomendas();
    } catch (error) {
      console.error("Erro ao criar ordem de produção:", error);
      alert("Erro ao criar a ordem de produção.");
    }
  }

  return (
    <div className="gestor-listar-encomendas-wrapper">
      <h2>Encomendas</h2>

      <table className="tabela-encomendas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Data da Encomenda</th>
            <th>Status</th>
            <th>Ações</th>
            <th>Ordem Produção</th>
          </tr>
        </thead>
        <tbody>
          {encomendas.length > 0 ? (
            encomendas.map((encomenda) => (
              <tr key={encomenda.encomendaClienteId}>
                <td>{encomenda.encomendaClienteId}</td>
                <td>{encomenda.nomeCliente}</td>
                <td>{new Date(encomenda.dataEncomenda).toLocaleDateString()}</td>
                <td>{encomenda.estado}</td>
                <td>
                  <select
                    disabled={encomenda.estado === "Concluída"}
                    value={estadoSelecionado[encomenda.encomendaClienteId] || ""}
                    onChange={async (e) => {
                      const novoEstado = e.target.value;

                      setEstadoSelecionado((prev) => ({
                        ...prev,
                        [encomenda.encomendaClienteId]: novoEstado,
                      }));

                      try {
                        await atualizarEstadoEncomenda(
                          encomenda.encomendaClienteId,
                          { estado: novoEstado }
                        );
                        alert("Estado da encomenda atualizado com sucesso.");
                        fetchEncomendas();
                      } catch (error) {
                        console.error("Erro ao atualizar estado:", error);
                        alert("Erro ao atualizar estado da encomenda.");
                      }
                    }}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Concluída">Concluída</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </td>
                <td>
                  <button
                    className="botao-icone"
                    title="Criar Ordem de Produção"
                    onClick={() => abrirModal(encomenda)}
                    disabled={encomenda.estado === "Concluída"}
                  >
                    <ClipboardList size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Não há encomendas cadastradas.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="botao-criar-wrapper">
        <button
          className="botao-criar-encomenda"
          onClick={() => navigate("/gestor/nova-encomenda")}
        >
          Criar Encomenda
        </button>
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Criar Ordem de Produção</h3>

            <div className="modal-conteudo">
              <select
                value={maquinaSelecionada}
                onChange={(e) => setMaquinaSelecionada(e.target.value)}
              >
                <option value="">-- Selecione uma máquina --</option>
                {maquinas.map((maq) => (
                  <option key={maq.maquinaId} value={maq.maquinaId}>
                    {maq.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-botoes">
              <button onClick={handleCriarOrdem}>Confirmar</button>
              <button onClick={fecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestorListarEncomendasPage;