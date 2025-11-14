import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obterOrdensProducao } from "../../api/OrdemProducao";
import { listarMaquinas } from "../../api/maquina";
import "./OperadorListarOrdensProducaoPage.css";

function OperadorListarOrdensProducaoPage() {
  const [ordens, setOrdens] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    fetchOrdens();
    fetchMaquinas();
  }, []);

  async function fetchOrdens() {
    try {
      const ordensData = await obterOrdensProducao();
      const ordensAbertas = ordensData.filter((ordem) => ordem.estado.toLowerCase() === "aberta");
      setOrdens(ordensAbertas);
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

  const obterNomeMaquina = (id) => {
    const maquina = maquinas.find((m) => m.maquinaId === id);
    return maquina ? maquina.nome : id;
  };

  return (
    <div className="operador-listar-ordens-wrapper">
      <h2>Ordens de Produção Abertas</h2>

      <table className="tabela-ordens-operador">
        <thead>
          <tr>
            <th>ID</th>
            <th>Encomenda</th>
            <th>Quantidade</th>
            <th>Data Abertura</th>
            <th>Data Conclusão</th>
            <th>Máquina</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ordens.length > 0 ? (
            ordens.map((ordem) => (
              <tr key={ordem.ordemProdId}>
                <td>
                  <Link to={`/operador/registo-producao/${ordem.ordemProdId}`} className="link-id">
                    {ordem.ordemProdId}
                  </Link>
                </td>
                <td>{ordem.encomendaClienteEncomendaClienteId}</td>
                <td>{ordem.quantidade}</td>
                <td>{new Date(ordem.dataAbertura).toLocaleDateString()}</td>
                <td>{ordem.dataConclusao ? new Date(ordem.dataConclusao).toLocaleDateString() : "-"}</td>
                <td>{obterNomeMaquina(ordem.maquinaMaquinaId)}</td>
                <td>{ordem.estado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Nenhuma ordem aberta encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OperadorListarOrdensProducaoPage;
