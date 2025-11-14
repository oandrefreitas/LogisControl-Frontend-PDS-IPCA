import axiosInstance from "./axiosInstance";

// Criar nova assistência externa
export const criarAssistencia = async (assistencia) => {
  const response = await axiosInstance.post("/assistenciaexterna/CriarAssistencia", assistencia);
  return response.data;
};

// Listar todas as assistências externas
export const listarAssistencias = async () => {
  const response = await axiosInstance.get("/assistenciaexterna/ObterAssistencias");
  return response.data;
};

export const atualizarAssistencia = async (assistenteId, dadosAtualizados) => {
  const response = await axiosInstance.put(
    `/assistenciaexterna/AtualizarAssistencia/${assistenteId}`,
    dadosAtualizados
  );
  return response.data;
};

// Obter assistência associada a um pedido de manutenção
export const obterAssistenciaPorPedidoId = async (pedidoId) => {
  const response = await axiosInstance.get(`/assistenciaexterna/ObterAssistenciaPorPedido/${pedidoId}`);
  return response.data;
};