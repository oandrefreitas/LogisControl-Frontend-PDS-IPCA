import React, { useEffect, useState } from "react";
import { receberNotaEncomenda, listarTodasNotasPendentes } from "../../api/notaEncomenda";
import "./OperadorVerTodasNotasPendentesPage.css";

function OperadorVerTodasNotasPendentesPage() {
  const [notas, setNotas] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const carregarNotas = async () => {
      try {
        const res = await listarTodasNotasPendentes(); // novo método
        setNotas(res);
      } catch (err) {
        alert("Erro ao carregar notas de encomenda.");
      }
    };

    carregarNotas();
  }, []);

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
      <h2>Todas as Notas de Encomenda Pendentes</h2>

      {notas.length === 0 ? (
        <p>Não há notas pendentes para receber.</p>
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
                  <div className="botoes-pedido">
                    <button
                      disabled={loadingId === nota.notaEncomendaId}
                      className="criar"
                      onClick={() => processarNota(nota.notaEncomendaId, true)}
                    >
                      Boas Condições
                    </button>
                    <button
                      disabled={loadingId === nota.notaEncomendaId}
                      className="voltar"
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

export default OperadorVerTodasNotasPendentesPage;
