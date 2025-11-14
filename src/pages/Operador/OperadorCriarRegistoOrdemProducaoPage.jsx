import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obterRegistosPorOrdemId, criarRegistoProducao } from "../../api/RegistoProducao";
import { obterProdutoIdPorOrdem } from "../../api/RegistoProducao";    
import "./OperadorCriarRegistoOrdemProducao.css";

function OperadorCriarRegistoOrdemProducaoPage() {
  const { ordemId } = useParams();
  const ordemProducaoId = Number(ordemId);

  const [registos, setRegistos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [descricaoModalAberto, setDescricaoModalAberto] = useState(false);
  const [registoSelecionado, setRegistoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [formData, setFormData] = useState({
    observacoes: "",
    estado: "",
    ordemProducaoOrdemProdId: ordemProducaoId,
    produtoProdutoId: "",
  });

  useEffect(() => {
  const fetchDados = async () => {
    try {
      setCarregando(true);

      const [registosData, produtosData] = await Promise.all([
        obterRegistosPorOrdemId(ordemProducaoId),
        obterProdutoIdPorOrdem(ordemProducaoId)
      ]);

      setRegistos(registosData || []);

      if (produtosData && produtosData.length > 0) {
        setFormData((prev) => ({
          ...prev,
          produtoProdutoId:  Number(produtosData[0].produtoId) 
        }));
      }

      setErro(null);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setErro("Erro ao carregar registos ou produto associado.");
    } finally {
      setCarregando(false);
    }
  };

  fetchDados();
}, [ordemProducaoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);

  const abrirModalDescricao = (registo) => {
    setRegistoSelecionado(registo);
    setDescricaoModalAberto(true);
  };

  const fecharModalDescricao = () => {
    setDescricaoModalAberto(false);
    setRegistoSelecionado(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.produtoProdutoId) {
    alert("O produto ainda não foi carregado. Tente novamente em alguns segundos.");
    return;
  }

  try {
    await criarRegistoProducao({
      estado: formData.estado,
      observacoes: formData.observacoes,
      produtoProdutoId: formData.produtoProdutoId,
      ordemProducaoOrdemProdId: formData.ordemProducaoOrdemProdId
    });

    const dados = await obterRegistosPorOrdemId(ordemProducaoId);
    setRegistos(dados);
    setMostrarModal(false);
  } catch (error) {
    console.error("Erro ao criar registo:", error);
    alert("Erro ao criar registo: " + (error.response?.data || error.message));
  }
};


  if (carregando) return <div>Carregando...</div>;
  if (erro) return <div className="erro">{erro}</div>;

  return (
    <div className="operador-registo-ordem-wrapper">
      <div className="operador-registo-ordem-header">
        Registos da Ordem de Produção {ordemProducaoId}
      </div>

      <table className="operador-registo-ordem-tabela">
        <thead>
          <tr>
            <th>Observações</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {registos.length > 0 ? (
            registos.map((registo, index) => (
              <tr
                key={registo.registoOrdemProducaoId || index}
                className={index % 2 === 0 ? "operador-registo-ordem-linha-clara" : ""}
              >
                <td
                  className="descricao-clicavel"
                  onClick={() => abrirModalDescricao(registo)}
                  title="Clique para ver detalhes"
                >
                  <span className="descricao-texto">
                    {(registo.observacoes || "").length > 40
                      ? registo.observacoes.substring(0, 40) + "..."
                      : registo.observacoes}
                  </span>
                </td>
                <td>{registo.estado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Nenhum registo encontrado para esta ordem.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="operador-registo-ordem-botao" onClick={abrirModal}>
        Criar Registo
      </button>

      {mostrarModal && (
        <div className="operador-registo-ordem-modal-overlay">
          <div className="operador-registo-ordem-modal">
            <h3>Criar Registo</h3>
            <form onSubmit={handleSubmit} className="operador-registo-ordem-formulario">
              <div className="operador-registo-ordem-campo">
                <label className="operador-registo-ordem-label">Observação:</label>
                <textarea
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  required
                  rows={5}
                />
              </div>

              <div className="operador-registo-ordem-campo">
                <label className="operador-registo-ordem-label">Estado:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="operador-registo-ordem-select"
                >
                  <option value="" disabled>Escolha um estado...</option>
                  <option value="Iniciado">Iniciado</option>
                  <option value="Em Progresso">Em Progresso</option>
                  <option value="Pausado">Pausado</option>
                  <option value="Produzido">Produzido</option>
                </select>
              </div>

              <div className="operador-registo-ordem-botoes">
                <button type="button" onClick={fecharModal} className="cancelar">
                  Cancelar
                </button>
                <button type="submit" className="criar">
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {descricaoModalAberto && registoSelecionado && (
        <div className="operador-registo-ordem-modal-overlay">
          <div className="operador-registo-ordem-modal">
            <h3>Observações </h3>
            <div className="operador-registo-ordem-descricao-container">
              <p className="operador-registo-ordem-descricao-texto">
                {registoSelecionado.observacoes}
              </p>
            </div>
            <div className="operador-registo-ordem-botoes">
              <button onClick={fecharModalDescricao}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OperadorCriarRegistoOrdemProducaoPage;
