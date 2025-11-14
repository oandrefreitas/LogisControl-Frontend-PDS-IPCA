import axiosInstance from "./axiosInstance";

// Criar novo pedido de manutenção
export const criarPedidoManutencao = async (dados) => {
  const response = await axiosInstance.post("/PedidoManutencao/CriarPedido", dados);
  return response.data;
};

// Listar todos os pedidos de manutenção
export const listarPedidosManutencao = async () => {
  const response = await axiosInstance.get("/PedidoManutencao/ObterPedidos");
  return response.data;
};

// Listar pedidos de manutenção do utilizador autenticado
export const listarPedidosManutencaoPorUtilizador = async () => {
  const response = await axiosInstance.get("/PedidoManutencao/ListarPedidosManutencaoPorUtilizador");
  return response.data;
};

// Obter um pedido de manutenção por ID
export const obterPedidoManutencaoPorId = async (id) => {
  const response = await axiosInstance.get(`/PedidoManutencao/ObterPedido/${id}`);
  return response.data;
};

// Atualizar pedido de manutenção existente
export const atualizarPedidoManutencao = async (id, dadosAtualizados) => {
  const response = await axiosInstance.put(`/PedidoManutencao/AtualizarPedido/${id}`, dadosAtualizados);
  return response.data;
};

// Obter pedidos de manutenção atrasados
export const obterPedidosAtrasados = async () => {
  const response = await axiosInstance.get("/PedidoManutencao/PedidosAtrasados");
  return response.data;
};

//Reabrir pedido de manutenção
export const reabrirPedidoManutencao = async (dados) => {
  const response = await axiosInstance.put("/PedidoManutencao/ReabrirPedido", dados);
  return response.data;
};