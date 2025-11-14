import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarAssistencias, atualizarAssistencia } from "../../api/assistencia";
import "./TecnicoListaAssistenciasPage.css";

function TecnicoListaAssistenciasPage() {
  const navigate = useNavigate();
  const [assistencias, setAssistencias] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [assistenciaSelecionada, setAssistenciaSelecionada] = useState(null);
  const [campoAEditar, setCampoAEditar] = useState("");
  const [dadosEditados, setDadosEditados] = useState({});
  

  useEffect(() => {
    const fetchAssistencias = async () => {
      try {
        const data = await listarAssistencias();
        setAssistencias(data);
      } catch (error) {
        alert("Erro ao carregar assistências externas.");
      }
    };

    fetchAssistencias();
  }, []);

  const abrirModalEdicao = (assistencia, campo) => {
    setAssistenciaSelecionada(assistencia);
    setCampoAEditar(campo);
    setDadosEditados({ valor: assistencia[campo] });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setAssistenciaSelecionada(null);
    setCampoAEditar("");
    setDadosEditados({});
  };

  const handleChange = (e) => {
    let value = e.target.value;
  
    // Limita os campos "nif" e "telefone" a 9 dígitos
    if (campoAEditar === "nif" || campoAEditar === "telefone") {
      value = value.replace(/\D/g, "").slice(0, 9);
    }
  
    setDadosEditados({ valor: value });
  };

  

  const guardarAlteracoes = async () => {
    try {
      const dadosAtualizados = {
        ...assistenciaSelecionada,
        [campoAEditar]:
          campoAEditar === "nif" || campoAEditar === "telefone"
            ? parseInt(dadosEditados.valor, 10)
            : dadosEditados.valor,
      };

      await atualizarAssistencia(assistenciaSelecionada.assistenteId, dadosAtualizados);

      setAssistencias((prev) =>
        prev.map((a) =>
          a.assistenteId === assistenciaSelecionada.assistenteId ? dadosAtualizados : a
        )
      );

      alert("Campo atualizado com sucesso!");
      fecharModal();
    } catch (error) {
      alert("Erro ao atualizar: " + error);
    }
  };

  return (
    <div className="tecnico-lista-assistencias-wrapper">
    <div className="tecnico-lista-assistencias-header">Lista de Empresas de Assistência</div>
  
    <table className="tecnico-lista-assistencias-tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>NIF</th>
          <th>Telefone</th>
          <th>Morada</th>
        </tr>
      </thead>
      <tbody>
        {assistencias.map((assistencia, index) => (
          <tr
            key={assistencia.assistenteId}
            className={index % 2 === 0 ? "tecnico-linha-clara" : ""}
          >
            <td>
              <span
                className="tecnico-campo-clicavel"
                onClick={() => abrirModalEdicao(assistencia, "nome")}
              >
                {assistencia.nome}
              </span>
            </td>
            <td>
              <span
                className="tecnico-campo-clicavel"
                onClick={() => abrirModalEdicao(assistencia, "nif")}
              >
                {assistencia.nif}
              </span>
            </td>
            <td>
              <span
                className="tecnico-campo-clicavel"
                onClick={() => abrirModalEdicao(assistencia, "telefone")}
              >
                {assistencia.telefone}
              </span>
            </td>
            <td>
              <span
                className="tecnico-campo-clicavel"
                onClick={() => abrirModalEdicao(assistencia, "morada")}
              >
                {assistencia.morada}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
    <div className="tecnico-botoes">
      <button onClick={() => navigate("/tecnico/home")}>Fechar</button>
      <button onClick={() => navigate("/tecnico/assistente/criar")}>Criar nova assistência</button>
    </div>
  
    {modalAberto && assistenciaSelecionada && (
  <div className="tecnico-modal-overlay">
    <div className="tecnico-modal-edicao">
      <h3>Editar {campoAEditar.charAt(0).toUpperCase() + campoAEditar.slice(1)}</h3>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={dadosEditados.valor}
        onChange={handleChange}
        placeholder={`Novo valor para ${campoAEditar}`}
      />
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

export default TecnicoListaAssistenciasPage;
