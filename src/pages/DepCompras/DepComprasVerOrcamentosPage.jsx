import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "./DepComprasVerOrcamentosPage.css";

function DepComprasVerOrcamentosPage() {
  const { id: pedidoCompraId } = useParams();
  const navigate = useNavigate();
  const [cotacao, setCotacao] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        // Primeiro: obter o PedidoCotacaoId associado
        const cotacaoRes = await axiosInstance.get(`/pedidos-cotacao/por-compra/${pedidoCompraId}`);
        const pedidoCotacaoId = cotacaoRes.data.pedidoCotacaoId;

        // Segundo: obter os detalhes da cotação com o ID correto
        const res = await axiosInstance.get(`/pedidos-cotacao/${pedidoCotacaoId}`);
        setCotacao(res.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar cotação: " + err.message);
      }
    };
    carregar();
  }, [pedidoCompraId]);

  const aceitarOrcamento = async (orcId) => {
    try {
      await axiosInstance.post(`/orcamentos/${orcId}/aceitar`);
      alert("Orçamento aceite com sucesso!");
      navigate("/depcompras/compras", { state: { refresh: true } });
    } catch (err) {
      alert("Erro ao aceitar orçamento: " + err.message);
    }
  };

  if (erro) return <p>{erro}</p>;
  if (!cotacao) return <p>A carregar...</p>;

  const header = cotacao.header;
  const orcamentos = cotacao.orcamentos || [];
  const itens = cotacao.itens || [];

  return (
    <div className="orcamentos-wrapper">
      <h2>Orçamentos para Pedido de Cotação #{header.pedidoCotacaoID}</h2>
      {orcamentos.length === 0 ? (
        <p>Nenhum orçamento recebido ainda.</p>
      ) : (
        orcamentos.map((orc) => {
          const itensOrcamento = itens.filter(i => i.orcamentoID === orc.orcamentoID);
          return (
            <div key={orc.orcamentoID} className="orcamento-card">
              <h3>Orçamento #{orc.orcamentoID}</h3>
              <p><strong>Data:</strong> {new Date(orc.data).toLocaleDateString()}</p>
              <p><strong>Estado:</strong> {orc.estado}</p>

              <table>
                <thead>
                  <tr>
                    <th>Matéria-Prima</th>
                    <th>Qtd</th>
                    <th>Preço Unit.</th>
                    <th>Prazo Entrega</th>
                  </tr>
                </thead>
                <tbody>
                  {itensOrcamento.map((i, idx) => (
                    <tr key={idx}>
                      <td>{i.materiaPrimaNome}</td>
                      <td>{i.quantidade}</td>
                      <td>{i.precoUnit} €</td>
                      <td>{i.prazoEntrega} dias</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {orc.estado === "Respondido" && (
                <button onClick={() => aceitarOrcamento(orc.orcamentoID)}>
                  Aceitar Este Orçamento
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default DepComprasVerOrcamentosPage;