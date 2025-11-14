import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUtilizador } from "../api/utilizador";
import "./LoginPage.css";
import background from "../assets/background.jpg";

function LoginPage() {
  const [numFuncionario, setNumFuncionario] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!numFuncionario || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const dados = await loginUtilizador({
        numFuncionario: Number(numFuncionario),
        password,
      });
      
    // Verificações rigorosas
    if (!dados.token || !dados.role || dados.estado === false) {
      alert("Credenciais inválidas ou conta inativa.");
      return;
    }

    // Armazenar token e info
    localStorage.setItem("token", dados.token);
    localStorage.setItem("user", JSON.stringify({
      id: dados.utilizadorId || dados.id || dados.numFuncionario,
      nome: dados.nome,
      role: dados.role
    }));

    // Redirecionar conforme o papel do utilizador
    switch (dados.role) {
      case "Gestor":
        navigate("/gestor/home");
        break;
      case "Operador":
        navigate("/operador/home");
        break;
      case "Tecnico":
        navigate("/tecnico/home");
        break;
      case "DepCompras":
        navigate("/depcompras/home");
        break;
      default:
        alert("Perfil desconhecido.");
        break;
    }
  } catch (error) {
    // Captura e apresenta erro personalizado
    const msg =
      error.response?.data || "Erro ao comunicar com o servidor.";
    alert("Login falhou: " + msg);
  }
};

  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      <div className="login-card">
        <h1 className="logo-title">
          LogisControl <span role="img" aria-label="caixa">📦</span>
        </h1>
        <h2>Login</h2>

        <div className="form-group">
          <label>Nº Funcionário</label>
          <input
            type="text"
            value={numFuncionario}
            onChange={(e) => setNumFuncionario(e.target.value)}
            placeholder="Ex: 4"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </div>

        <div className="remember-me">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <span>Remember me</span>
        </div>

        <div className="buttons">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;