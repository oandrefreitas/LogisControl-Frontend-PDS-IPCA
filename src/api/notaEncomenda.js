import axiosInstance from "./axiosInstance";

export const receberNotaEncomenda = async (notaId, emBoasCondicoes) => {
  const res = await axiosInstance.patch(`/notas-encomenda/${notaId}/receber`, {
    emBoasCondicoes,
  });
  return res.data;
};

export const obterNotaEncomendaPorOrcamento = async (orcamentoId) => {
  const res = await axiosInstance.get(`/notas-encomenda/por-orcamento/${orcamentoId}`);
  return res.data;
};

export const listarNotasPendentesPorMateria = async (materiaId) => {
  const res = await axiosInstance.get(`/notas-encomenda/pendentes/por-materia/${materiaId}`);
  return res.data;
};

export const listarTodasNotasPendentes = async () => {
  const res = await axiosInstance.get(`/notas-encomenda/pendentes`);
  return res.data;
};