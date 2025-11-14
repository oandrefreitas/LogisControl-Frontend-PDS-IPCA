import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obterRegistosPorPedidoId, criarRegistoManutencao } from "../../api/registoManutencao";
import { obterAssistenciaPorPedidoId } from "../../api/assistencia";
import "./TecnicoRegistoManutencaoPage.css";

function TecnicoRegistoManutencaoPage() {
  const { pedidoId } = useParams(); 
  const navigate = useNavigate();
  const pedidoManutencaoId = Number(pedidoId);

  const [registos, setRegistos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [descricaoModalAberto, setDescricaoModalAberto] = useState(false);
  const [registoSelecionado, setRegistoSelecionado] = useState(null);
  const [assistenciaNome, setAssistenciaNome] = useState(null);

  const [formData, setFormData] = useState({
    descricao: "",
    estado: "",
    pedidoManutencaoPedidoManutId: pedidoManutencaoId,
    assistenciaExternaAssistenteId: null,
    usarAssistencia: false
  });

  useEffect(() => {
    const fetchRegistos = async () => {
      try {
        const data = await obterRegistosPorPedidoId(pedidoManutencaoId);
        setRegistos(data);
      } catch (error) {
        alert("Erro ao carregar registos de manutenção.");
      }
    };
    fetchRegistos();
  }, []);

  const abrirModal = () => setMostrarModal(true);

  const fecharModal = () => {
    setMostrarModal(false);
    setFormData({
      descricao: "",
      estado: "",
      pedidoManutencaoPedidoManutId: pedidoManutencaoId,
      assistenciaExternaAssistenteId: null,
      usarAssistencia: false
    });
    setAssistenciaNome(null);
  };

  const abrirModalDescricao = (registo) => {
    setRegistoSelecionado(registo);
    setDescricaoModalAberto(true);
  };

  const fecharModalDescricao = () => {
    setDescricaoModalAberto(false);
    setRegistoSelecionado(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = async (e) => {
    const checked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      usarAssistencia: checked,
      assistenciaExternaAssistenteId: null
    }));

    setAssistenciaNome(null);

    if (checked) {
      try {
        const data = await obterAssistenciaPorPedidoId(pedidoManutencaoId);
        if (data) {
          setAssistenciaNome(data.nome);
          setFormData((prev) => ({
            ...prev,
            assistenciaExternaAssistenteId: data.assistenteId,
          }));
        } else {
          alert("A máquina não tem assistência externa associada.");
        }
      } catch (error) {
        alert("Erro ao obter assistência externa.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarRegistoManutencao({
        descricao: formData.descricao,
        estado: formData.estado,
        pedidoManutencaoPedidoManutId: pedidoManutencaoId,
        assistenciaExternaAssistenteId: formData.usarAssistencia ? formData.assistenciaExternaAssistenteId : null
      });
      alert("Registo criado com sucesso!");
      fecharModal();
      const data = await obterRegistosPorPedidoId(pedidoManutencaoId);
      setRegistos(data);
    } catch (error) {
      alert("Erro ao criar registo: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="tecnico-registo-manutencao-wrapper">
      <div className="tecnico-registo-manutencao-header">
        Registos de Manutenção do Pedido {pedidoManutencaoId}
      </div>

      <table className="tecnico-registo-manutencao-tabela">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {registos.map((registo, index) => (
            <tr
              key={registo.registoManutencaoId}
              className={index % 2 === 0 ? "tecnico-registo-manutencao-linha-clara" : ""}
            >
              <td
                className="descricao-clicavel"
                onClick={() => abrirModalDescricao(registo)}
                title="Clique para ver detalhes"
              >
                <span className="descricao-texto">
                  {registo.descricao.length > 40
                    ? registo.descricao.substring(0, 40) + "..."
                    : registo.descricao}
                </span>
              </td>
              <td>{registo.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="tecnico-registo-manutencao-botao" onClick={abrirModal}>
        Criar Registo
      </button>

      {mostrarModal && (
        <div className="tecnico-registo-manutencao-modal-overlay">
          <div className="tecnico-registo-manutencao-modal">
            <h3>Criar Registo</h3>
            <form onSubmit={handleSubmit} className="tecnico-registo-manutencao-formulario">
              <div className="tecnico-registo-manutencao-campo">
                <label className="tecnico-registo-manutencao-label">Descrição:</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="tecnico-registo-manutencao-campo">
                <label className="tecnico-registo-manutencao-label">Estado:</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="tecnico-registo-manutencao-select"
                >
                  <option value="" disabled>Escolha um estado...</option>
                  <option value="Externo">Externo</option>
                  <option value="Compras">Compras</option>
                  <option value="Reparação">Reparação</option>
                  <option value="Resolvido">Resolvido</option>
                </select>
              </div>

              <div className="tecnico-registo-manutencao-campo tecnico-registo-manutencao-checkbox-wrapper">
                <label className="tecnico-registo-manutencao-checkbox-label">
                  Assistência externa?
                  <input
                    type="checkbox"
                    checked={formData.usarAssistencia}
                    onChange={handleCheckbox}
                    className="tecnico-registo-manutencao-checkbox"
                  />
                </label>
              </div>

              {assistenciaNome && (
                <div className="tecnico-registo-manutencao-assistencia-nome">
                  Assistência selecionada: <strong>{assistenciaNome}</strong>
                </div>
              )}

              <div className="tecnico-registo-manutencao-botoes">
                <button type="button" onClick={fecharModal}>Cancelar</button>
                <button type="submit">Criar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {descricaoModalAberto && registoSelecionado && (
        <div className="tecnico-registo-manutencao-modal-overlay">
          <div className="tecnico-registo-manutencao-modal">
            <h3>Descrição</h3>
            <div className="tecnico-registo-manutencao-descricao-container">
              <p className="tecnico-registo-manutencao-descricao-texto">
                {registoSelecionado.descricao}
              </p>
            </div>
            <div className="tecnico-registo-manutencao-botoes">
              <button onClick={fecharModalDescricao}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TecnicoRegistoManutencaoPage;