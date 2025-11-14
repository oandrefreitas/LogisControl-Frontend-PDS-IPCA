import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OperadorSidebar from "../components/OperadorSidebar";
import { LogOut } from "lucide-react";
import "./Layout.css";

function OperadorLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa a sessão
    localStorage.clear();
    // Redireciona para login
    navigate("/");
  };

  return (
    <div className="operador-page">
      <header className="header">
        Olá, Operador
        <LogOut className="logout-icon" onClick={handleLogout} />
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <OperadorSidebar />
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="footer">LogisControl</footer>
    </div>
  );
}

export default OperadorLayout;