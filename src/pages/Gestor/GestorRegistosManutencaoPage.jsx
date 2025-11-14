import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Para capturar o pedidoId da URL
import { obterRegistosPorPedidoId } from "../../api/registoManutencao"; // Função para buscar os registos

function GestorRegistosManutencaoPage() {
  const { pedidoId } = useParams(); // Captura o pedidoId da URL
  const [registos, setRegistos] = useState([]);
  const navigate = useNavigate();

  // Buscar os registos de manutenção com base no pedidoId
  useEffect(() => {
    const fetchRegistos = async () => {
      try {
        const data = await obterRegistosPorPedidoId(pedidoId); // Função que faz a requisição dos registos
        setRegistos(data);
      } catch (error) {
        console.error("Erro ao carregar os registos:", error);
        alert("Erro ao carregar os registos de manutenção.");
      }
    };
    fetchRegistos();
  }, [pedidoId]); // Atualiza a busca quando o pedidoId mudar

  return (
    <div className="tecnico-registo-manutencao-wrapper">
      <div className="tecnico-registo-manutencao-header">
        Registos de Manutenção do Pedido {pedidoId}
      </div>

      <table className="tecnico-registo-manutencao-tabela">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {registos.map((registo, index) => (
            <tr
              key={registo.registoManutencaoId}
              className={index % 2 === 0 ? "tecnico-registo-manutencao-linha-clara" : ""}
            >
              <td>{registo.descricao}</td>
              <td>{registo.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="tecnico-registo-manutencao-botoes">
        <button 
          className="tecnico-registo-manutencao-botao-voltar"
          onClick={() => navigate(-1)} 
        >
          Voltar
        </button>
      </div>
    </div>
  );
}

export default GestorRegistosManutencaoPage;