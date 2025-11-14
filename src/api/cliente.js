import axiosInstance from "./axiosInstance";

// Criar novo cliente
export const criarCliente = async (cliente) => {
  const response = await axiosInstance.post("/cliente/CriarCliente", cliente);
  return response.data;
};

// Obter todos os clientes
export const obterClientes = async () => {
  const response = await axiosInstance.get("/cliente/ObterClientes");
  return response.data;
};
