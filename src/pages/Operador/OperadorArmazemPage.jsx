import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obterMateriasPrimas } from "../../api/materiaPrima";
import "./OperadorArmazemPage.css";

function OperadorArmazemPage() {
  const [materias, setMaterias] = useState([]);
  const [selecionada, setSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await obterMateriasPrimas();
        setMaterias(dados);
      } catch (err) {
        alert("Erro ao carregar matérias-primas");
      }
    };
    carregar();
  }, []);

  const handleSelecionar = (id) => {
    setSelecionada(id);
  };

  const iniciarPedido = () => {
    if (!selecionada) return;
    navigate(`/operador/pedido-compra/criar/${selecionada}`);
  };

  const verRececoesPorMateria = () => {
    if (!selecionada) return;
    navigate(`/operador/receber-materiais/${selecionada}`);
  };

  const verTodasNotas = () => {
    navigate(`/operador/receber-materiais`);
  };

  return (
    <div className="materia-prima-wrapper">
      <h2>Gestão de Armazém</h2>
      <table className="tabela-materia-prima">
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Categoria</th>
            <th>Cód. Interno</th>
            <th>Preço (€)</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.materiaPrimaId}>
              <td>
                <input
                  type="radio"
                  name="selecionada"
                  checked={selecionada === m.materiaPrimaId}
                  onChange={() => handleSelecionar(m.materiaPrimaId)}
                />
              </td>
              <td>{m.nome}</td>
              <td>{m.quantidade}</td>
              <td>{m.categoria}</td>
              <td>{m.codInterno}</td>
              <td>{m.preco.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-materia">
        <button
          className="criar"
          onClick={iniciarPedido}
          disabled={!selecionada}
        >
          Criar Pedido de Compra
        </button>

        <button
          className="receber"
          onClick={verRececoesPorMateria}
          disabled={!selecionada}
        >
          Receber Materiais
        </button>

        <button
          className="ver-todas"
          onClick={verTodasNotas}
        >
          Ver Todas as Notas Pendentes
        </button>
      </div>
    </div>
  );
}

export default OperadorArmazemPage;
