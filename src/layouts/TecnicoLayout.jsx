import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import TecnicoSidebar from "../components/TecnicoSidebar";
import "./Layout.css";

function TecnicoLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="tecnico-page">
      <header className="header">
        Olá, Técnico
        <LogOut className="logout-icon" onClick={handleLogout} />
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <TecnicoSidebar />
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="footer">LogisControl</footer>
    </div>
  );
}

export default TecnicoLayout;