import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import GestorSidebar from "../components/GestorSidebar";
import "./Layout.css";

function GestorLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa a sessão
    localStorage.clear();
    // Redireciona para login
    navigate("/");
  };

  return (
    <div className="gestor-page">
      <header className="header">
        Olá, Gestor
        <LogOut className="logout-icon" onClick={handleLogout} />
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <GestorSidebar />
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="footer">LogisControl</footer>
    </div>
  );
}

export default GestorLayout;