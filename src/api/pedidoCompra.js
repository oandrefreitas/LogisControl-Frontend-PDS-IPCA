import axiosInstance from "./axiosInstance";

// Pedisto de compra de Materia Prima

// Lista todos os pedidos de compra
export const criarPedidoCompra = async (dados) => {
  const response = await axiosInstance.post("/pedidos-compra", dados);
  return response.data;
};

// Lista pedidos de compra por estado
export const listarPedidosCompraPorEstado = async (estado = "Aberto") => {
  const response = await axiosInstance.get(`/pedidos-compra?estado=${estado}`);
  return response.data;
};

export const obterPedidoCompraDetalhe = async (id) => {
  const response = await axiosInstance.get(`/pedidos-compra/${id}`);
  return response.data;
};


//Pedido de Aquisicao

// Criar novo pedido de Aquisicao
export const criarPedidoAquisicao = async (dados) => {
  const response = await axiosInstance.post("/PedidoAquisicao/CriarPedidoAquisicao", dados);
  return response.data;
};

// Lista os pedidos de compra do utilizador autenticado
export const listarPedidoAquisicaoPorUtilizador = async () => {
  const response = await axiosInstance.get("/PedidoAquisicao/ListarPedidoAquisicaoPorUtilizador");
  return response.data;
};


// Listar todos os pedidos por role
export const listarPedidosAquisicaoPorRole = async () => {
  const response = await axiosInstance.get("/PedidoAquisicao/ListarPedidosAquisicaoPorRole");
  return response.data;
};

// Atualizar estado do pedidos
export const atualizarEstadoPedidoAquisicao = async (pedidoId, estado) => {
  const response = await axiosInstance.put(`/PedidoAquisicao/AtualizarEstadoAquisicao/${pedidoId}`, {
    estado,
  });
  return response.data;
};

// Atualizar descrição do pedido
// Atualizar descrição do pedido
export const atualizarDescricaoAquisicao = async (pedidoId, novaDescricao) => {
  const response = await axiosInstance.put(`/PedidoAquisicao/AtualizarDescricaoAquisicao/${pedidoId}`, {
    novaDescricao,
  });
  return response.data;
};