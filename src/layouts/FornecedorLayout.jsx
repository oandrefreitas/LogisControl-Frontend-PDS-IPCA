import React from "react";
import { Outlet } from "react-router-dom";

function FornecedorLayout() {
  return (
    <div style={{ padding: "2rem", minHeight: "100vh", background: "#f2f2f2" }}>
      <Outlet />
    </div>
  );
}

export default FornecedorLayout;
