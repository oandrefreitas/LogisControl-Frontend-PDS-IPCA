import axiosInstance from "./axiosInstance";

// Listar todos os produtos
export const listarProdutos = async () => {
    const response = await axiosInstance.get("/Produto/ListarProdutos");
    return response.data;
  };
  
export const criarProduto = async (dados) => {
    const response = await axiosInstance.post("/Produto/CriarProduto", dados);
    return response.data;
  };

  export const atualizarProduto = async (id, dados) => {
    const response = await axiosInstance.put(`/Produto/AtualizarProduto/${id}`, dados);
    return response.data;
  };

  export const obterProdutoParaEdicao = async (id) => {
    const response = await axiosInstance.get(`/Produto/ObterProdutoParaEdicao/${id}`);
    return response.data;
  };
  


  