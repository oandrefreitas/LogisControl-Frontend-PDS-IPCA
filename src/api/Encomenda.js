import axiosInstance from "./axiosInstance";


export const obterEncomendas = async () => {
  const response = await axiosInstance.get("/EncomendaCliente/ListarEncomendas");
  return response.data;
};

export const atualizarEstadoEncomenda = async (id, dados) => {
  const response = await axiosInstance.put(`/EncomendaCliente/AtualizarEstado/${id}`, dados);
  return response.data;
};


export const criarEncomenda = async (dadosEncomenda) => {
  const response = await axiosInstance.post("/EncomendaCliente/CriarEncomenda", dadosEncomenda);
  return response.data;
};

export const criarEncomendaItem = async (item) => {
  const resposta = await axiosInstance.post("/EncomendaItens/CriarEncomendaItem", item);
  return resposta.data;
};

