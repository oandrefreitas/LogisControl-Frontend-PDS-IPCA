import axiosInstance from "./axiosInstance";

// Obter todas as máquinas
export const listarMaquinas = async () => {
  const response = await axiosInstance.get("/Maquina/ObterMaquinas");
  return response.data;
};

// Atualizar as máquinas
export const atualizarMaquina = async (maquinaId, maquinaAtualizada) => {
  const response = await axiosInstance.put(
    `/Maquina/AtualizarMaquina/${maquinaId}`,
    maquinaAtualizada
  );
  return response.data;
};

// Criar uma nova máquina
export const criarMaquina = async (novaMaquina) => {
  const response = await axiosInstance.post("/Maquina/CriarMaquina", novaMaquina);
  return response.data;
};
