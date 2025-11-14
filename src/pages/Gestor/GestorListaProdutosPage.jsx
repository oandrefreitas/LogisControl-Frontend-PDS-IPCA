import React, { useEffect, useState } from "react";
import { listarProdutos } from "../../api/produtos";
import { useNavigate } from "react-router-dom";
import "./GestorListaProdutosPage.css";

function GestorListaProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const data = await listarProdutos();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    carregarProdutos();
  }, []);

  const irParaEditarProduto = (produto) => {
    navigate("/gestor/criar-produto", { state: { produto } });
  };

  return (
    <div className="produtos-wrapper">
      <h2 className="produtos-header">Lista de Produtos</h2>
      <table className="produtos-tabela">
        <thead>
          <tr>
            <th>Código Interno</th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Descrição</th>
            <th>Preço (€)</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.codInterno}>
              <td>{produto.codInterno}</td>
              <td
                onClick={() => navigate("/gestor/criar-produto", { state: { produtoId: produto.produtoId } })}
              >
                {produto.nome}
              </td>
              <td>{produto.quantidade}</td>
              <td>{produto.descricao}</td>
              <td>{produto.preco}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="Gestao-utilizadores-botoes">
        <button
          onClick={() => navigate("/gestor/definicoes")}
          className="Gestao-utilizadores-botao-voltar"
        >
          Voltar
        </button>
        <button
          onClick={() => navigate("/gestor/criar-produto")}
          className="Gestao-utilizadores-botao-criar"
        >
          Criar Produto
        </button>
      </div>
    </div>
  );
}

export default GestorListaProdutosPage;
