import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listarProdutos } from "../../api/produtos";
import { criarEncomenda, criarEncomendaItem } from "../../api/Encomenda";
import { obterClientes } from "../../api/cliente";
import "./GestorCriarEncomendaPage.css";

function GestorCriarEncomendaPage() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [encomendaData, setEncomendaData] = useState({
    nomeCliente: "",
    dataEncomenda: new Date().toISOString().split("T")[0],
    estado: "Pendente"
  });

  const [item, setItem] = useState({
    produtoId: "",
    quantidade: 1
  });

  const [encomendaId, setEncomendaId] = useState(null);
  const [itensAdicionados, setItensAdicionados] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const clientesData = await obterClientes();
        const produtosData = await listarProdutos();
        setClientes(clientesData);
        setProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchDados();
  }, []);

  const handleEncomendaChange = (e) => {
    const { name, value } = e.target;
    setEncomendaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const criarNovaEncomenda = async (e) => {
    e.preventDefault();

    try {
      const resposta = await criarEncomenda(encomendaData);
      setEncomendaId(resposta.encomendaClienteId);
    } catch (error) {
      console.error("Erro ao criar encomenda:", error);
      alert("Erro ao criar encomenda: " + (error.response?.data || error.message));
    }
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();

    if (!encomendaId) {
      alert("Crie primeiro a encomenda.");
      return;
    }

    try {
      await criarEncomendaItem({
        produtoId: parseInt(item.produtoId),
        quantidade: parseInt(item.quantidade),
        encomendaClienteEncomendaClienteId: encomendaId
      });

      const nomeProduto = produtos.find(p => p.produtoId.toString() === item.produtoId)?.nome;
      setItensAdicionados(prev => [...prev, { ...item, nome: nomeProduto }]);
      setItem({ produtoId: "", quantidade: 1 });

      alert("Produto adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="gestor-criar-encomenda-wrapper">
      <h2 className="gestor-criar-encomenda-titulo">Criar Nova Encomenda</h2>

      {!encomendaId && (
        <form className="gestor-criar-encomenda-form" onSubmit={criarNovaEncomenda}>
          <div className="gestor-criar-encomenda-linha">
            <label>Nome Cliente:</label>
            <select
              name="nomeCliente"
              value={encomendaData.nomeCliente}
              onChange={handleEncomendaChange}
              required
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="gestor-criar-encomenda-linha">
            <label>Data:</label>
            <input
              type="date"
              name="dataEncomenda"
              value={encomendaData.dataEncomenda}
              onChange={handleEncomendaChange}
              required
            />
          </div>

          <div className="gestor-criar-encomenda-botoes">
            <button type="submit">Criar Encomenda</button>
            <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      )}

      {encomendaId && (
        <>
          <form className="gestor-criar-encomenda-form" onSubmit={adicionarProduto}>
            <h3>Adicionar Produtos</h3>

            <div className="gestor-criar-encomenda-linha">
              <label>Produto:</label>
              <select
                name="produtoId"
                value={item.produtoId}
                onChange={handleItemChange}
                required
              >
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.produtoId} value={produto.produtoId}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="gestor-criar-encomenda-linha">
              <label>Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                min="1"
                value={item.quantidade}
                onChange={handleItemChange}
                required
              />
            </div>

            <div className="gestor-criar-encomenda-botoes">
              <button type="submit">Adicionar Produto</button>
              <button type="button" onClick={() => navigate("/gestor/listar-encomenda")}>
                Finalizar
              </button>
            </div>
          </form>

                    {itensAdicionados.length > 0 && (
            <div className="gestor-encomenda-itens-lista">
              <h4>Produtos já adicionados:</h4>
              <table className="tabela-itens">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {itensAdicionados.map((p, index) => (
                    <tr key={`${p.produtoId}-${index}`}>
                      <td>{index + 1}</td>
                      <td>{p.nome}</td>
                      <td>{p.quantidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GestorCriarEncomendaPage;