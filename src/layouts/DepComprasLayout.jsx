import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import DepComprasSidebar from "../components/DepComprasSidebar";
import "./Layout.css";

function DepComprasLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="depcompras-page">
      <header className="header">
        Olá, Dep. Compras
        <LogOut className="logout-icon" onClick={handleLogout} />
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <DepComprasSidebar />
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="footer">LogisControl</footer>
    </div>
  );
}

export default DepComprasLayout;