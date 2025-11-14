import axiosInstance from "./axiosInstance";

// Enviar pedido de cotação para um fornecedor
export const criarPedidoCotacao = async (pedidoId, fornecedorId) => {
  const response = await axiosInstance.post(
    `/pedidos-cotacao/${pedidoId}/cotacao?fornecedorId=${fornecedorId}`
  );
  return response.data;
};

// Obter a última cotação associada a um pedido de compra
export const obterCotacaoPorPedidoCompra = async (pedidoCompraId) => {
  const response = await axiosInstance.get(`/pedidos-cotacao/por-compra/${pedidoCompraId}`);
  return response.data.pedidoCotacaoId;
};

// Obter o detalhe da cotação (admin)
export const obterPedidoCotacaoDetalhado = async (id) => {
  const response = await axiosInstance.get(`/pedidos-cotacao/${id}`);
  return response.data;
};

// Obter detalhe da cotação (fornecedor)
export const obterPedidoCotacaoComToken = async (id, token) => {
  const response = await axiosInstance.get(`/pedidos-cotacao/${id}/fornecedor?token=${token}`);
  return response.data;
};

// Criar orçamento (cabeçalho)
export const criarOrcamento = async (pedidoCotacaoId) => {
  const res = await axiosInstance.post("/orcamentos", {
    PedidoCotacaoID: pedidoCotacaoId,
    Estado: "Respondido",
  });
  return res.data.orcamentoId ?? res.data.OrcamentoId;
};

// Adicionar item ao orçamento
export const adicionarItemOrcamento = async (orcamentoId, item) => {
  if (
    !item.MateriaPrimaID ||
    typeof item.Quantidade !== "number" || item.Quantidade <= 0 ||
    typeof item.PrecoUnit !== "number" || item.PrecoUnit < 0 ||
    typeof item.PrazoEntrega !== "number" || item.PrazoEntrega <= 0
  ) {
    throw new Error("Dados do item de orçamento inválidos.");
  }

  console.log("A enviar item:", item);

  await axiosInstance.post(`/orcamentos/${orcamentoId}/itens`, item);
};
