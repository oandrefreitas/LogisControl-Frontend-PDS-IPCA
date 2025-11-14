import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { criarProduto, obterProdutoParaEdicao, atualizarProduto } from "../../api/produtos";
import { obterMateriasPrimas } from "../../api/materiaPrima";
import "./GestorCriarProdutoPage.css";

function GestorCriarProdutoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const produtoId = location.state?.produtoId || null;

  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    quantidade: 0,
    descricao: "",
    codInterno: "",
    preco: 0,
    materiasPrimas: [{ materiaPrimaId: "", quantidadeNec: 0 }]
  });

  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    const carregarMaterias = async () => {
      try {
        const dados = await obterMateriasPrimas();
        setMaterias(dados);
      } catch (error) {
        alert("Erro ao carregar matérias-primas: " + (error.response?.data || error.message));
      }
    };

    const carregarProduto = async () => {
      try {
        if (produtoId) {
          const produto = await obterProdutoParaEdicao(produtoId);
          setFormData({
            nome: produto.nome,
            quantidade: produto.quantidade,
            descricao: produto.descricao,
            codInterno: produto.codInterno,
            preco: produto.preco,
            materiasPrimas: produto.materiasPrimas
          });
          setModoEdicao(true);
        }
      } catch (error) {
        alert("Erro ao carregar produto: " + (error.response?.data || error.message));
      }
    };

    carregarMaterias();
    carregarProduto();
  }, [produtoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMateriaChange = (index, field, value) => {
    const novas = [...formData.materiasPrimas];
    novas[index][field] = field === "quantidadeNec" ? parseInt(value) : value;
    setFormData(prev => ({ ...prev, materiasPrimas: novas }));
  };

  const adicionarMateriaPrima = () => {
    setFormData(prev => ({
      ...prev,
      materiasPrimas: [...prev.materiasPrimas, { materiaPrimaId: "", quantidadeNec: 0 }]
    }));
  };

  const removerMateriaPrima = (index) => {
    const atualizadas = formData.materiasPrimas.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, materiasPrimas: atualizadas }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicao && produtoId) {
        await atualizarProduto(produtoId, formData);
        alert("Produto atualizado com sucesso!");
      } else {
        await criarProduto(formData);
        alert("Produto criado com sucesso!");
      }
      navigate("/gestor/ListarProdutos");
    } catch (error) {
      alert("Erro ao guardar produto: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="criar-produto-wrapper">
      <h2>{modoEdicao ? "Editar Produto" : "Criar Novo Produto"}</h2>
      <form onSubmit={handleSubmit} className="formulario-criar-produto">
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "Quantidade", name: "quantidade", type: "number" },
          { label: "Descrição", name: "descricao", type: "text" },
          { label: "Código Interno", name: "codInterno", type: "text" },
          { label: "Preço", name: "preco", type: "number" }
        ].map((campo) => (
          <div className="linha-formulario-criar-produto" key={campo.name}>
            <label htmlFor={campo.name}>{campo.label}</label>
            <input
              type={campo.type}
              id={campo.name}
              name={campo.name}
              value={formData[campo.name]}
              onChange={handleChange}
              required
              className="input-criar-produto-campo"
            />
          </div>
        ))}

        <div className="secao-materias-primas">
          <h3>Matérias-Primas Necessárias</h3>
          {formData.materiasPrimas.map((mp, index) => (
            <div className="linha-formulario-criar-produto" key={index}>
              <label htmlFor={`materiaPrima-${index}`}>Matéria-Prima</label>
              <select
                id={`materiaPrima-${index}`}
                className="input-criar-produto-campo"
                value={mp.materiaPrimaId}
                onChange={(e) => handleMateriaChange(index, "materiaPrimaId", e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {materias.map((m) => (
                  <option key={m.materiaPrimaId} value={m.materiaPrimaId}>
                    {m.nome}
                  </option>
                ))}
              </select>

              <label htmlFor={`quantidade-${index}`}>Quantidade</label>
              <input
                id={`quantidade-${index}`}
                type="number"
                className="input-criar-produto-campo"
                value={mp.quantidadeNec}
                onChange={(e) => handleMateriaChange(index, "quantidadeNec", e.target.value)}
                required
              />

              <button
                type="button"
                className="botao-criar-produto-remover"
                onClick={() => removerMateriaPrima(index)}
              >
                Remover
              </button>
            </div>
          ))}

          <button
            type="button"
            className="botao-criar-produto-adicionar"
            onClick={adicionarMateriaPrima}
          >
            Adicionar Matéria-Prima
          </button>
        </div>

        <div className="botoes-criar-produto">
          <button
            type="button"
            className="voltar-produto-botao"
            onClick={() => navigate("/gestor/ListarProdutos")}
          >
            Voltar
          </button>
          <button type="submit" className="criar-produto-botao">
            {modoEdicao ? "Guardar Alterações" : "Criar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GestorCriarProdutoPage;
