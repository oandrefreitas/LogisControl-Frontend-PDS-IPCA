import axiosInstance from "./axiosInstance";

// Criar nova matéria-prima
export const criarMateriaPrima = async (dados) => {
  const response = await axiosInstance.post("/MateriaPrima", dados);
  return response.data;
};

// Obter todas as matérias-primas
export const obterMateriasPrimas = async () => {
  const response = await axiosInstance.get("/MateriaPrima");
  return response.data;
};

export const obterMateriaPrimaPorId = async (id) => {
  const response = await axiosInstance.get(`/MateriaPrima/${id}`);
  return response.data;
};