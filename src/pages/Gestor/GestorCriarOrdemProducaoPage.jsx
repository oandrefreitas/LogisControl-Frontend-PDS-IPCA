import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { criarOrdemProducao } from "../../api/OrdemProducao";
import { obterEncomendas } from "../../api/Encomenda";
import { listarMaquinas } from "../../api/maquina";
import { listarProdutos } from "../../api/produtos";

import "./GestorCriarOrdemProducaoPage.css";

function GestorCriarOrdemProducaoPage() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [encomendas, setEncomendas] = useState([]);

  const [ordemProducaoData, setOrdemProducaoData] = useState({
    produtoId: "",
    maquinaMaquinaId: "",
    encomendaClienteEncomendaClienteId: "",
    quantidade: "",
    estado: "Pendente",
    dataAbertura: "",
    dataConclusao: null,
  });

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const listaProdutos = await listarProdutos();
        setProdutos(listaProdutos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProdutos();
  }, []);

  useEffect(() => {
    async function fetchMaquinas() {
      try {
        const listaMaquinas = await listarMaquinas();
        setMaquinas(listaMaquinas);
      } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
      }
    }

    fetchMaquinas();
  }, []);

  useEffect(() => {
    async function fetchEncomendas() {
      try {
        const listaEncomendas = await obterEncomendas();
        setEncomendas(listaEncomendas);
      } catch (error) {
        console.error("Erro ao buscar encomendas:", error);
      }
    }

    fetchEncomendas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrdemProducaoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataAtual = new Date().toISOString();

    const ordemComDatas = {
      ...ordemProducaoData,
      dataAbertura: dataAtual,
    };

    try {
      await criarOrdemProducao(ordemComDatas);
      alert("Ordem de produção criada com sucesso!");
      navigate("/gestor/ordens-producao");
    } catch (error) {
      console.error("Erro ao criar ordem de produção:", error);
      alert("Erro ao criar ordem de produção: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="gestor-criar-ordem-producao-wrapper">
      <h2 className="gestor-criar-ordem-producao-titulo">Criar Nova Ordem de Produção</h2>

      <form className="formulario-criar-ordem-producao" onSubmit={handleSubmit}>
        <div className="linha-formulario-criar-ordem-producao">
          <label>Produto:</label>
          <select
            name="produtoId"
            value={ordemProducaoData.produtoId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.produtoId} value={produto.produtoId}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="linha-formulario-criar-ordem-producao">
          <label>Máquina:</label>
          <select
            name="maquinaMaquinaId"
            value={ordemProducaoData.maquinaMaquinaId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma máquina</option>
            {maquinas.map((maquina) => (
              <option key={maquina.maquinaId} value={maquina.maquinaId}>
                {maquina.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="linha-formulario-criar-ordem-producao">
          <label>Encomenda Cliente:</label>
          <select
            name="encomendaClienteEncomendaClienteId"
            value={ordemProducaoData.encomendaClienteEncomendaClienteId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma encomenda</option>
            {encomendas.map((enc) => (
              <option key={enc.encomendaClienteId} value={enc.encomendaClienteId}>
                {enc.codigo || `Encomenda #${enc.encomendaClienteId}`}
              </option>
            ))}
          </select>
        </div>

        <div className="linha-formulario-criar-ordem-producao">
          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={ordemProducaoData.quantidade}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="botoes-criar-ordem-producao">
          <button type="button" onClick={() => navigate(-1)}>
            Cancelar
          </button>
          <button type="submit">Criar Ordem de Produção</button>
        </div>
      </form>
    </div>
  );
}

export default GestorCriarOrdemProducaoPage;
