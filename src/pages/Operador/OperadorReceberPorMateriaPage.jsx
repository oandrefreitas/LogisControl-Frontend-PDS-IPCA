import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { receberNotaEncomenda } from "../../api/notaEncomenda";
import "./OperadorReceberPorMateriaPage.css";

function OperadorReceberPorMateriaPage() {
  const { materiaPrimaId } = useParams();
  const [notas, setNotas] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const res = await axiosInstance.get(`/notas-encomenda/pendentes/por-materia/${materiaPrimaId}`);
        setNotas(res.data);
      } catch (err) {
        alert("Erro ao carregar notas para esta matéria-prima.");
      }
    };
    carregar();
  }, [materiaPrimaId]);

  const processarNota = async (id, emBoasCondicoes) => {
    try {
      setLoadingId(id);
      await receberNotaEncomenda(id, emBoasCondicoes);
      alert("Receção registada com sucesso.");
      setNotas(prev => prev.filter(n => n.notaEncomendaId !== id));
    } catch (err) {
      alert("Erro ao atualizar nota: " + err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="pedido-wrapper">
      <h2>Receber Materiais da Matéria-Prima #{materiaPrimaId}</h2>

      {notas.length === 0 ? (
        <p>Sem entregas pendentes para esta matéria-prima.</p>
      ) : (
        <table className="tabela-materias">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Valor Total (€)</th>
              <th>Itens</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {notas.map(nota => (
              <tr key={nota.notaEncomendaId}>
                <td>{nota.notaEncomendaId}</td>
                <td>{new Date(nota.dataEmissao).toLocaleDateString()}</td>
                <td>{nota.valorTotal.toFixed(2)}</td>
                <td>
                  <ul>
                    {nota.itens.map((item, idx) => (
                      <li key={idx}>
                        {item.materiaPrimaNome} — {item.quantidade} un — {item.precoUnit} €
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <div className="botoes-pedido">
                    <button
                      className="criar"
                      disabled={loadingId === nota.notaEncomendaId}
                      onClick={() => processarNota(nota.notaEncomendaId, true)}
                    >
                      Boas Condições
                    </button>
                    <button
                      className="voltar"
                      disabled={loadingId === nota.notaEncomendaId}
                      onClick={() => processarNota(nota.notaEncomendaId, false)}
                    >
                      Danificado
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OperadorReceberPorMateriaPage;
