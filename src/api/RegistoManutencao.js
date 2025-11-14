import axiosInstance from "./axiosInstance";

export const criarRegistoManutencao = async (dados) => {
  const response = await axiosInstance.post("/RegistoManutencao/CriarRegisto", dados);
  return response.data;
};

export const obterRegistosPorPedidoId = async (pedidoId) => {
  const response = await axiosInstance.get(`/RegistoManutencao/ObterRegistosPorPedido/${pedidoId}`);
  return response.data;
};



