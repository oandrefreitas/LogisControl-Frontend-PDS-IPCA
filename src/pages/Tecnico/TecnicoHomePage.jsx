import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPedidoAquisicaoPorUtilizador } from "../../api/pedidoCompra";
import "./TecnicoHomePage.css";

function TecnicoHomePage() {

  const [pedidosAbertos, setPedidosAbertos] = useState(0);
  const [pedidosResolucao, setPedidosResolucao] = useState(0);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidos = await listarPedidoAquisicaoPorUtilizador();
        setPedidosAbertos(pedidos.filter(p => p.estado === "Aberto").length);
        setPedidosResolucao(pedidos.filter(p => p.estado === "Em Resolução").length);
      } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
      }
    };

    fetchPedidos();
  }, []);


  return (
    <div className="tecnico-home">
      <div className="atalhos">
        <Link to="/tecnico/pedidos-compra" className="atalho-card">
          <h3>Lista de Aquisições</h3>
          <p>{pedidosAbertos} pedidos Abertos</p>
          <p>{pedidosResolucao} pedidos em Análise</p>
        </Link>
        <Link to="/tecnico/assistente/criar" className="atalho-card">
          <h3>Criar Assistência</h3>
          <p>Adicionar Assistência técncica</p>
        </Link>
        <Link to="/tecnico/maquina/criar" className="atalho-card">
          <h3>Criar Máquina</h3>
          <p>Criar Nova máquina</p>
        </Link>
        <Link to="/tecnico/definicoes" className="atalho-card">
          <h3>Definições</h3>
          <p>Configurar parâmetros técnicos.</p>
        </Link>
      </div>
    </div>
  );
}

export default TecnicoHomePage;