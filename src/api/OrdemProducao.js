import axiosInstance from "./axiosInstance";

// Criar nova Ordem de Produção
export const criarOrdemProducao = async (dados) => {
  const response = await axiosInstance.post("/OrdemProducao/CriarOrdemProducao", dados);
  return response.data;
};

// Listar todas as Ordens de Produção
export const obterOrdensProducao = async () => {
  const response = await axiosInstance.get("/OrdemProducao/ListarOrdensProducao");
  return response.data;
};

// Atualizar Ordem de Produção
export const atualizarOrdemProducao = async (id, dados) => {
  const response = await axiosInstance.put(`/OrdemProducao/AtualizarOrdemProducao/${id}`, dados);
  return response.data;
};

// Apagar Ordem de Produção
export const apagarOrdemProducao = async (id) => {
  const response = await axiosInstance.delete(`/OrdemProducao/ApagarOrdemProducao/${id}`);
  return response.data;
};

// Atualizar Estado da Ordem de Produção
export const atualizarEstado = async (id, novoEstado) => {
  const response = await axiosInstance.put(`/OrdemProducao/AtualizarEstado/${id}`, { estado: novoEstado });
  return response.data;
};
