import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  obterPedidoCotacaoComToken,
  criarOrcamento,
  adicionarItemOrcamento,
} from "../../api/pedidoCotacao";
import "./FornecedorSubmeterOrcamentoPage.css";

function FornecedorSubmeterOrcamentoPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [cotacao, setCotacao] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchCotacao = async () => {
      try {
        const rawData = await obterPedidoCotacaoComToken(id, token);
        console.log("RAW cotação recebida:", rawData);

        // Normalizar nomes de propriedades
        const header = rawData.header || rawData.Header;
        const itens = rawData.itens || rawData.Itens || [];

        if (!Array.isArray(itens) || itens.length === 0) {
          setErro("Nenhum item disponível para cotação.");
          return;
        }

        setCotacao({ header, itens });

        const respostasIniciais = itens.map((item) => ({
          materiaPrimaId: item.materiaPrimaID ?? item.MateriaPrimaID,
          quantidade: item.quantidade ?? item.Quantidade,
          precoUnit: 0,
          prazoEntrega: 0,
        }));

        setRespostas(respostasIniciais);
      } catch (err) {
        console.error("Erro ao carregar cotação:", err);
        setErro("Erro ao carregar cotação: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCotacao();
  }, [id, token]);

  const handleChange = (index, campo, valor) => {
    const novas = [...respostas];
    novas[index][campo] = valor;
    setRespostas(novas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orcamentoId = await criarOrcamento(cotacao.header.pedidoCotacaoID);

      for (const item of respostas) {
        await adicionarItemOrcamento(orcamentoId, {
          MateriaPrimaID: item.materiaPrimaId,
          Quantidade: item.quantidade,
          PrecoUnit: parseFloat(item.precoUnit) || 0,
          PrazoEntrega: parseInt(item.prazoEntrega) || 0,
        });
      }

      alert("Orçamento submetido com sucesso!");
    } catch (err) {
      alert("Erro ao submeter orçamento: " + err.message);
    }
  };

  if (loading) return <p>A carregar dados...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="fornecedor-wrapper">
      <h2>Responder ao Pedido de Cotação</h2>
      <p><strong>Descrição:</strong> {cotacao.header.descricao}</p>
      <p><strong>Data:</strong> {new Date(cotacao.header.data).toLocaleDateString()}</p>

      <form onSubmit={handleSubmit} className="orcamento-form">
        <table>
          <thead>
            <tr>
              <th>Matéria-Prima</th>
              <th>Quantidade</th>
              <th>Preço Unitário (€)</th>
              <th>Prazo Entrega (dias)</th>
            </tr>
          </thead>
          <tbody>
            {cotacao.itens.map((item, index) => {
              const resposta = respostas[index] || {};
              return (
                <tr key={item.materiaPrimaID ?? item.MateriaPrimaID}>
                  <td>{item.materiaPrimaNome ?? item.MateriaPrimaNome}</td>
                  <td>{item.quantidade ?? item.Quantidade}</td>
                  <td>
                    <input
                      type="number"
                      required
                      min="0"
                      value={resposta.precoUnit}
                      onChange={(e) =>
                        handleChange(index, "precoUnit", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      required
                      min="1"
                      value={resposta.prazoEntrega}
                      onChange={(e) =>
                        handleChange(index, "prazoEntrega", e.target.value)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="botoes-fornecedor">
          <button type="submit">Submeter Orçamento</button>
        </div>
      </form>
    </div>
  );
}

export default FornecedorSubmeterOrcamentoPage;