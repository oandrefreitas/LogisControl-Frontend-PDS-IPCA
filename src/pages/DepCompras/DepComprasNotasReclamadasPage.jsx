import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./DepComprasNotasReclamadasPage.css";

function DepComprasNotasReclamadasPage() {
  const [notas, setNotas] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const res = await axiosInstance.get("/notas-encomenda/reclamadas");
        setNotas(res.data);
      } catch (err) {
        alert("Erro ao carregar notas reclamadas.");
      }
    };

    fetchNotas();
  }, []);

  const contactarFornecedor = async (notaId) => {
    if (!window.confirm("Deseja contactar o fornecedor para nova entrega?")) return;

    try {
      setLoadingId(notaId);
      await axiosInstance.post(`/notas-encomenda/${notaId}/enviar-email-substituicao`);
      alert("Fornecedor notificado com sucesso.");
    } catch (err) {
      alert("Erro ao contactar fornecedor.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="reclamadas-wrapper">
      <h2>Notas de Encomenda Reclamadas</h2>
      {notas.length === 0 ? (
        <p>Não existem notas reclamadas no momento.</p>
      ) : (
        <table className="tabela-reclamadas">
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
            {notas.map((nota) => (
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
                  <button
                    disabled={loadingId === nota.notaEncomendaId}
                    onClick={() => contactarFornecedor(nota.notaEncomendaId)}
                  >
                    Contactar Fornecedor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DepComprasNotasReclamadasPage;
