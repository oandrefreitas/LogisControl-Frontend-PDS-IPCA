import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarPedidosAquisicaoPorRole } from "../../api/pedidoCompra"; 
import { obterPedidosAtrasados } from "../../api/pedidoManutencao";
import "./GestorHomePage.css";

function GestorHomePage() {

  const [pedidosAbertos, setPedidosAbertos] = useState(0);
  const [numPedidosAtrasados, setNumPedidosAtrasados] = useState(0);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidos = await listarPedidosAquisicaoPorRole(); 
        const abertos = pedidos.filter(p => p.estado === "Pendente").length;
        setPedidosAbertos(abertos);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      }
    };

    fetchPedidos();
  }, []);

  useEffect(() => {
    const carregarPedidosAtrasados = async () => {
      try {
        const pedidos = await obterPedidosAtrasados(); 
        setNumPedidosAtrasados(pedidos.length); 
      } catch (error) {
        console.error("Erro ao obter pedidos em atraso:", err);
      }
    };
  
    carregarPedidosAtrasados();
  }, []);


  return (
    <div className="gestor-home">
      <div className="atalhos">
        <Link to="/gestor/listar-produto" className="atalho-card">
          <h3>Ordens de Produção</h3>
          <p>Gerir e consultar ordens de produção.</p>
        </Link>
        <Link to="/gestor/pedidos-compra" className="atalho-card">
          <h3>Pedidos Aquisição</h3>
          <p>{pedidosAbertos} Pedidos Pendentes</p>
        </Link>
        <Link to="/gestor/pedidos-manutencao" className={`atalho-card ${numPedidosAtrasados > 0 ? "atrasos" : ""}`}>
          <h3>Tickets Manutenção</h3>
          <p>Existem <strong>{numPedidosAtrasados}</strong> pedidos por resolver há mais de uma semana.</p>
        </Link>
        <Link to="/gestor/definicoes" className="atalho-card">
          <h3>Definições</h3>
          <p>Configurar parâmetros da aplicação.</p>
        </Link>
      </div>
    </div>
  );
}

export default GestorHomePage;