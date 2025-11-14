import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obterPedidoCompraDetalhe } from "../../api/pedidoCompra";
import { obterFornecedores } from "../../api/fornecedor";
import { criarPedidoCotacao } from "../../api/pedidoCotacao";
import "./DepComprasAtribuirCotacaoPage.css";

function DepComprasAtribuirCotacaoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [fornecedores, setFornecedores] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const pedidoInfo = await obterPedidoCompraDetalhe(id);
        const listaFornecedores = await obterFornecedores();
        setPedido(pedidoInfo);
        setFornecedores(listaFornecedores);
      } catch (err) {
        alert("Erro ao carregar dados: " + err.message);
      }
    };
    carregar();
  }, [id]);

  const handleToggle = (fid) => {
    setSelecionados((prev) =>
      prev.includes(fid)
        ? prev.filter((x) => x !== fid)
        : [...prev, fid]
    );
  };

  const handleSubmit = async () => {
    if (selecionados.length === 0) {
      alert("Seleciona pelo menos um fornecedor.");
      return;
    }

    try {
      for (const fid of selecionados) {
        await criarPedidoCotacao(id, fid);
      }
      alert("Pedidos de cotação enviados!");
      navigate("/depcompras/compras");
    } catch (err) {
      alert("Erro ao enviar cotações: " + err.message);
    }
  };

  if (!pedido) return <p>A carregar...</p>;

  return (
    <div className="cotacao-wrapper">
      <h2>
        Pedido #{pedido.pedidoCompraId} - {pedido.descricao}
      </h2>
      <p>
        <strong>Estado:</strong> {pedido.estado}
      </p>
      <p>
        <strong>Data:</strong>{" "}
        {new Date(pedido.dataAbertura).toLocaleDateString()}
      </p>
      <p>
        <strong>Solicitado por:</strong> {pedido.nomeUtilizador}
      </p>

      <h3>Selecionar Fornecedores</h3>
      <table className="tabela-materias">
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((f) => (
            <tr key={f.fornecedorId}>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={selecionados.includes(f.fornecedorId)}
                  onChange={() => handleToggle(f.fornecedorId)}
                />
              </td>
              <td>{f.nome}</td>
              <td>{f.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="botoes-cotacao">
        <button className="voltar" onClick={() => navigate("/depcompras/compras")}>
          Voltar
        </button>
        <button className="enviar" onClick={handleSubmit}>
          Enviar Pedido de Cotação
        </button>
      </div>
    </div>
  );
}

export default DepComprasAtribuirCotacaoPage;