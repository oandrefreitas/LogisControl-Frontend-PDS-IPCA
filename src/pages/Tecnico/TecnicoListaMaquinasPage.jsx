import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarMaquinas, atualizarMaquina } from "../../api/maquina";
import { listarAssistencias } from "../../api/assistencia";
import "./TecnicoListaMaquinasPage.css";

function TecnicoListaMaquinasPage() {
  const navigate = useNavigate();
  const [maquinas, setMaquinas] = useState([]);
  const [assistencias, setAssistencias] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [maquinaSelecionada, setMaquinaSelecionada] = useState(null);
  const [campoAEditar, setCampoAEditar] = useState("");
  const [dadosEditados, setDadosEditados] = useState({});

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [listaMaquinas, listaAssistencias] = await Promise.all([
          listarMaquinas(),
          listarAssistencias(),
        ]);
        setMaquinas(listaMaquinas);
        setAssistencias(listaAssistencias);
      } catch (error) {
        alert("Erro ao carregar dados.");
      }
    };

    fetchDados();
  }, []);

  const abrirModalEdicao = (maquina, campo) => {
    setMaquinaSelecionada(maquina);
    setCampoAEditar(campo);
    setDadosEditados({ valor: maquina[campo] });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMaquinaSelecionada(null);
    setCampoAEditar("");
    setDadosEditados({});
  };

  const handleChange = (e) => {
    setDadosEditados({ valor: e.target.value });
  };

  const guardarAlteracoes = async () => {
    try {
      const dadosAtualizados = {
        ...maquinaSelecionada,
        [campoAEditar]: campoAEditar === "linhaProd" || campoAEditar === "assistenciaExternaAssistenteId"
          ? parseInt(dadosEditados.valor, 10)
          : dadosEditados.valor,
      };

      await atualizarMaquina(maquinaSelecionada.maquinaId, dadosAtualizados);

      setMaquinas((prev) =>
        prev.map((m) =>
          m.maquinaId === maquinaSelecionada.maquinaId ? dadosAtualizados : m
        )
      );

      alert("Campo atualizado com sucesso!");
      fecharModal();
    } catch (error) {
      alert("Erro ao atualizar: " + error);
    }
  };

  const obterNomeAssistencia = (id) => {
    const assistencia = assistencias.find(a => a.assistenteId === id);
    return assistencia ? assistencia.nome : "—";
  };

  return (
    <div className="tecnico-lista-maquinas-wrapper">
      <div className="tecnico-lista-maquinas-header">Lista de Máquinas</div>

      <table className="tecnico-lista-maquinas-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Linha</th>
            <th>Assistência Externa</th>
          </tr>
        </thead>
        <tbody>
          {maquinas.map((maquina, index) => (
            <tr
              key={maquina.maquinaId}
              className={index % 2 === 0 ? "tecnico-linha-clara" : ""}
            >
              <td>
                <span
                  className="tecnico-campo-clicavel"
                  onClick={() => abrirModalEdicao(maquina, "nome")}
                >
                  {maquina.nome}
                </span>
              </td>
              <td>
                <span
                  className="tecnico-campo-clicavel"
                  onClick={() => abrirModalEdicao(maquina, "linhaProd")}
                >
                  {maquina.linhaProd}
                </span>
              </td>
              <td>
                <span
                  className="tecnico-campo-clicavel"
                  onClick={() => abrirModalEdicao(maquina, "assistenciaExternaAssistenteId")}
                >
                  {obterNomeAssistencia(maquina.assistenciaExternaAssistenteId)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="tecnico-botoes">
        <button onClick={() => navigate("/tecnico/home")}>Fechar</button>
        <button onClick={() => navigate("/tecnico/maquina/criar")}>Criar nova máquina</button>
      </div>

      {modalAberto && maquinaSelecionada && (
        <div className="tecnico-modal-overlay">
          <div className="tecnico-modal-edicao">
            <h3>Editar {campoAEditar}</h3>

            {campoAEditar === "assistenciaExternaAssistenteId" ? (
              <select value={dadosEditados.valor} onChange={handleChange}>
                {assistencias.map((a) => (
                  <option key={a.assistenteId} value={a.assistenteId}>
                    {a.nome}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={dadosEditados.valor}
                onChange={handleChange}
              />
            )}

            <div className="tecnico-botoes-modal">
              <button onClick={fecharModal}>Cancelar</button>
              <button onClick={guardarAlteracoes}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TecnicoListaMaquinasPage;
