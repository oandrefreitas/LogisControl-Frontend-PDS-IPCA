import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarItem.css";

function SidebarItem({ icon: Icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar-item ${isActive ? "active" : ""}`
      }
    >
      <Icon className="sidebar-icon" />
      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItem;