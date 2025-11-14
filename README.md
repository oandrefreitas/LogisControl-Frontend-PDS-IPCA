//******************************PORTUGUÊS******************************//

# LogisControl-Frontend - PDS-IPCA

Aplicação web desenvolvida em React + Vite para a plataforma LogisControl. Oferece uma interface dinâmica e responsiva para a gestão integrada de produção, manutenção, compras, armazém e administração de utilizadores, comunicando diretamente com a API LogisControl-Backend.

## Funcionalidades principais

* Autenticação e gestão de sessão com JWT.
* Interfaces distintas para diferentes perfis (Gestor, Operador, Compras, Técnico).
* Gestão visual de:
  * Produtos, matérias-primas, máquinas, utilizadores.
  * Ordens de produção e registos de produção.
  * Tickets de manutenção.
  * Pedidos de compra, cotações e encomendas.
* Dashboards e listagens dinâmicas com consumo de API.
* Componentes reutilizáveis e hooks personalizados (ex.: `useFetchUser`, `useCart`).
* Organização modular (pages, components, context, hooks).
* Comunicação com backend via fetch/axios.

## Conexão ao Backend
Este frontend comunica com a API disponível no repositório **LogisControl-Backend**.

//******************************ENGLISH******************************//

# LogisControl-Frontend - PDS-IPCA

Web application built with React + Vite for the LogisControl platform. Provides a dynamic interface for managing production, maintenance, procurement, warehouse operations, and user administration, fully integrated with the LogisControl-Backend API.

## Main Features

* Authentication and session handling using JWT.
* Role-based interfaces (Manager, Operator, Procurement, Technician).
* Visual management of:
  * Products, raw materials, machines, users.
  * Production orders and production logs.
  * Maintenance tickets.
  * Purchase requests, quotations, and orders.
* Dynamic dashboards and data tables consuming the REST API.
* Reusable components and custom hooks (e.g., `useFetchUser`, `useCart`).
* Modular folder structure (pages, components, context, hooks).
* API communication via fetch/axios.

## Backend Connection
This frontend communicates with the REST API available in the **LogisControl-Backend** repository.
