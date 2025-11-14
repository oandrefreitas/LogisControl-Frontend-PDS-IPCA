import axiosInstance from "./axiosInstance";

// Obter todos os utilizadores
export const obterUtilizadores = async () => {
  const response = await axiosInstance.get("/Utilizador/ObterUtilizadores");
  return response.data;
};

// Criar um novo utilizador
export const criarUtilizador = async (dados) => {
  const response = await axiosInstance.post("/Utilizador/CriarUtilizador", dados);
  return response.data;
};

// Atualizar role e estado de um utilizador
export const atualizarUtilizador = async (id, dados) => {
  const response = await axiosInstance.put(`/Utilizador/AtualizarEstadoRole/${id}`, dados);
  return response.data;
};

//Atualizar perfil do utilizador
export const atualizarPerfil = async (dados) => {
  const response = await axiosInstance.put("/Utilizador/AtualizarPerfil", dados);
  return response.data;
};

//Obter perfil de utilizador
export const obterPerfilUtilizador = async () => {
  const response = await axiosInstance.get("/Utilizador/ObterPerfil");
  return response.data;
};

// Login de utilizador
export const loginUtilizador = async (payload) => {
  return axiosInstance.post("/Login/login", payload).then(res => res.data);
};


// Reset da password de um utilizador (por número de funcionário)
export const resetPasswordUtilizador = async (dados) => {
  const response = await axiosInstance.put("/Utilizador/ResetPassword", dados);
  return response.data;
};
