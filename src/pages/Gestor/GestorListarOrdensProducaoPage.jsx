import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterOrdensProducao, atualizarOrdemProducao } from "../../api/OrdemProducao";
import { listarMaquinas } from "../../api/maquina";
import "./GestorListarOrdensProducaoPage.css";

const estadosPossiveis = ["Cancelada", "Aberta"];

function GestorListarOrdensProducaoPage() {
  const navigate = useNavigate();
  const [ordens, setOrdens] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState({});
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    fetchOrdens();
    fetchMaquinas();
  }, []);

  async function fetchOrdens() {
    try {
      const ordensData = await obterOrdensProducao();
      setOrdens(ordensData);

      const inicial = {};
      ordensData.forEach((ordem) => {
        inicial[ordem.ordemProdId] = ordem.estado;
      });
      setEstadoSelecionado(inicial);
    } catch (error) {
      console.error("Erro ao buscar ordens de produção:", error);
    }
  }

  async function fetchMaquinas() {
    try {
      const maquinasData = await listarMaquinas();
      setMaquinas(maquinasData);
    } catch (error) {
      console.error("Erro ao buscar máquinas:", error);
    }
  }

  const handleAlterarEstado = async (id, novoEstado) => {
    const ordemAtual = ordens.find((ordem) => ordem.ordemProdId === id);

    if (!ordemAtual) {
      console.error("Ordem não encontrada.");
      return;
    }


    const ordemAtualizada = {
      estado: novoEstado,
      quantidade: ordemAtual.quantidade,
      dataAbertura: ordemAtual.dataAbertura,
      dataConclusao: novoEstado === "Cancelada" ? new Date().toISOString() : ordemAtual.dataConclusao || null, //colocar data final
      maquinaMaquinaId: ordemAtual.maquinaMaquinaId,
      encomendaClienteEncomendaClienteId: ordemAtual.encomendaClienteEncomendaClienteId,
    };

    try {
      await atualizarOrdemProducao(id, ordemAtualizada);
      alert("Estado da ordem de produção atualizado com sucesso.");
      fetchOrdens();
    } catch (error) {
      console.error("Erro ao atualizar estado:", error);
      alert("Erro ao atualizar estado da ordem de produção.");
    }
  };

  const obterNomeMaquina = (id) => {
    const maquina = maquinas.find((m) => m.maquinaId === id);
    return maquina ? maquina.nome : id;
  };

  return (
    <div className="gestor-listar-ordens-wrapper">
      <h2>Ordens de Produção</h2>

      <table className="tabela-ordens">
        <thead>
          <tr>
            <th>ID</th>
            <th>Encomenda</th>
            <th>Quantidade</th>
            <th>Data Abertura</th>
            <th>Data Conclusão</th>
            <th>Máquina</th>
            <th>Estado Atual</th>
            <th>Alterar Estado</th>
          </tr>
        </thead>
        <tbody>
          {ordens.length > 0 ? (
            ordens.map((ordem) => (
              <tr key={ordem.ordemProdId}>
                <td>{ordem.ordemProdId}</td>
                <td style={{ minWidth: "100px", textAlign: "center", whiteSpace: "nowrap" }}>
                  {ordem.encomendaClienteEncomendaClienteId}
                </td>
                <td>{ordem.quantidade}</td>
                <td>{new Date(ordem.dataAbertura).toLocaleDateString()}</td>
                <td>{ordem.dataConclusao ? new Date(ordem.dataConclusao).toLocaleDateString() : "-"}</td>
                <td>{obterNomeMaquina(ordem.maquinaMaquinaId)}</td>
                <td>{ordem.estado}</td>
                <td>
                  <select
                    value={estadoSelecionado[ordem.ordemProdId] || ""}
                    onChange={(e) => {
                      const novoEstado = e.target.value;
                      setEstadoSelecionado((prev) => ({
                        ...prev,
                        [ordem.ordemProdId]: novoEstado,
                      }));
                      handleAlterarEstado(ordem.ordemProdId, novoEstado);
                    }}
                  >
                    {estadosPossiveis.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Não Existem Ordens de Produção.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GestorListarOrdensProducaoPage;
