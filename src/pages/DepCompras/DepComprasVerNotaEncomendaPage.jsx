import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obterCotacaoPorPedidoCompra, obterPedidoCotacaoDetalhado } from "../../api/pedidoCotacao";
import { obterNotaEncomendaPorOrcamento } from "../../api/notaEncomenda";
import "./DepComprasVerNotaEncomendaPage.css";

function DepComprasVerNotaEncomendaPage() {
  const { id } = useParams(); // id do Pedido de Compra
  const [nota, setNota] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        console.log("A carregar cotação para pedido:", id);
        const cotacaoId = await obterCotacaoPorPedidoCompra(id);
        console.log("Cotação encontrada:", cotacaoId);

        const detalhes = await obterPedidoCotacaoDetalhado(cotacaoId);
        console.log("Detalhes da cotação:", detalhes);

        const orcamentoAceite = detalhes.orcamentos.find(o => o.estado === "Aceite");
        if (!orcamentoAceite) throw new Error("Orçamento aceite não encontrado.");

        const notaData = await obterNotaEncomendaPorOrcamento(orcamentoAceite.orcamentoID);
        setNota(notaData);
      } catch (err) {
        console.error("Erro ao carregar nota:", err);
        setErro("Erro ao carregar nota de encomenda: " + err.message);
      }
    };

    carregar();
  }, [id]);

  if (erro) return <p>{erro}</p>;
  if (!nota) return <p>A carregar...</p>;

  return (
    <div className="nota-wrapper">
      <h2>Nota de Encomenda #{nota.notaEncomendaId}</h2>
      <p><strong>Data:</strong> {new Date(nota.dataEmissao).toLocaleDateString()}</p>
      <p><strong>Estado:</strong> {nota.estado}</p>
      <p><strong>Valor Total:</strong> {nota.valorTotal.toFixed(2)} €</p>

      <table className="tabela-materiais">
        <thead>
          <tr>
            <th>Matéria-Prima</th>
            <th>Qtd</th>
            <th>Preço Unit.</th>
          </tr>
        </thead>
        <tbody>
          {nota.itens.map((i, idx) => (
            <tr key={idx}>
              <td>{i.materiaPrimaNome}</td>
              <td>{i.quantidade}</td>
              <td>{i.precoUnit.toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Informação adicional para o departamento */}
      {nota.estado === "Pendente" && (
        <p className="pendente-alerta">
          Esta nota ainda aguarda receção por parte do operador.
        </p>
      )}
      {nota.estado === "Reclamada" && (
        <p className="reclamada-alerta">
          Esta nota foi <strong>reclamada</strong>. O fornecedor deve ser contactado.
        </p>
      )}
    </div>
  );
}

export default DepComprasVerNotaEncomendaPage;
