import axiosInstance from "./axiosInstance";

export const obterRegistosProducao = async () => {
  const response = await axiosInstance.get("/RegistoProducao/ListarRegistosProducao");
  return response.data;
};

export const ObterRegistoProducaoPorId = async (Id) => {
  const response = await axiosInstance.get(`/RegistoProducao/ObterRegistoProducaoPorId/${Id}`);
  return response.data;
};

export const obterRegistosPorOrdemId = async (ordemId) => {
    const response = await axiosInstance.get(`/RegistoProducao/ObterRegistosPorOrdemId/${ordemId}`);
    return response.data;
};

export const criarRegistoProducao = async (dados) => {
  const response = await axiosInstance.post("/RegistoProducao/CriarRegistoProducao", dados);
  return response.data;
};

export const atualizarEstadoEObservacoes = async (id, dados) => {
  const response = await axiosInstance.patch(`/RegistoProducao/AtualizarEstadoEObservacoesRegistoProducao/${id}`, dados);
  return response.data;
};

export const apagarRegistoProducao = async (id) => {
  const response = await axiosInstance.delete(`/RegistoProducao/ApagarRegistoProducao/${id}`);
  return response.data;
};

export async function obterProdutoIdPorOrdem(ordemProducaoId) {
  const res = await axiosInstance.get(`/OrdemProducao/${ordemProducaoId}/produtos`);
  return res.data;
}
