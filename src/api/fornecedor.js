import axiosInstance from "./axiosInstance";

export const criarFornecedor = async (dados) => {
  const response = await axiosInstance.post("/Fornecedor/CriarFornecedor", dados);
  return response.data;
};

export const obterFornecedores = async () => {
    const response = await axiosInstance.get("/Fornecedor/ObterFornecedores");
    return response.data;
  };
  