import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "./FornecedorNovaEntregaPage.css";

function FornecedorNovaEntregaPage() {
  const { id } = useParams(); // ID da nota
  const [nota, setNota] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNota = async () => {
      try {
        const res = await axiosInstance.get(`/notas-encomenda/${id}`);
        setNota(res.data);
      } catch (err) {
        alert("Erro ao carregar a nota de encomenda.");
      }
    };

    fetchNota();
  }, [id]);

  const confirmarNovaEntrega = async () => {
    if (!window.confirm("Confirmar envio da nova entrega?")) return;

    try {
      setLoading(true);
      await axiosInstance.post(`/notas-encomenda/${id}/nova-entrega`);
      alert("Entrega substituta confirmada com sucesso!");
      navigate("/");
    } catch (err) {
      alert("Erro ao confirmar nova entrega.");
    } finally {
      setLoading(false);
    }
  };

  if (!nota) return <p>A carregar dados...</p>;

  return (
    <div className="nova-entrega-wrapper">
      <h2>Substituição de Entrega</h2>
      <p><strong>ID Nota:</strong> {nota.notaEncomendaId}</p>
      <p><strong>Estado atual:</strong> {nota.estado}</p>
      <p><strong>Data:</strong> {new Date(nota.dataEmissao).toLocaleDateString()}</p>
      <p><strong>Valor Total:</strong> {nota.valorTotal.toFixed(2)} €</p>

      <h3>Itens da Nota</h3>
      <ul>
        {nota.itens.map((item, idx) => (
          <li key={idx}>
            {item.materiaPrimaNome} — {item.quantidade} un — {item.precoUnit.toFixed(2)} €
          </li>
        ))}
      </ul>

      <button className="confirmar-btn" disabled={loading} onClick={confirmarNovaEntrega}>
        Confirmar Nova Entrega
      </button>
    </div>
  );
}

export default FornecedorNovaEntregaPage;
