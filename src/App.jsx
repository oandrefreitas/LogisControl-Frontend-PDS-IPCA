import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Login e Gestão de Perfil
import LoginPage from "./pages/LoginPage";
import GerirPerfilPage from "./pages/GerirPerfilPage";

// Layouts
import GestorLayout from "./layouts/GestorLayout";
import OperadorLayout from "./layouts/OperadorLayout";
import TecnicoLayout from "./layouts/TecnicoLayout";
import DepComprasLayout from "./layouts/DepComprasLayout";
import FornecedorLayout from "./layouts/FornecedorLayout";

//Home Pages de cada utilizador
import GestorHomePage from "./pages/Gestor/GestorHomePage";
import OperadorHome from "./pages/Operador/OperadorHomePage";
import TecnicoHome from "./pages/Tecnico/TecnicoHomePage";
import DepComprasHome from "./pages/DepCompras/DepComprasHomePage";

// Definições de cada utilizador
import GestorDefinicoesPage from "./pages/Gestor/GestorDefinicoesPage";
import DepComprasDefinicoesPage from "./pages/DepCompras/DepComprasDefinicoesPage";
import OperadorDefinicoesPage from "./pages/Operador/OperadorDefinicoesPage";
import TecnicoDefinicoesPage from "./pages/Tecnico/TecnicoDefinicoesPage";

//Utilizadores
import GestorUtilizadoresPage from "./pages/Gestor/GestorUtilizadoresPage";
import GestorCriarUtilizadorPage from "./pages/Gestor/GestorCriarUtilizadorPage";

//Pedistos de Compra
import TecnicoPedidoCompraPage from "./pages/Tecnico/TecnicoPedidoCompraPage";
import TecnicoListaComprasPage from "./pages/Tecnico/TecnicoListaComprasPage";
import GestorListaPedidosCompraPage from "./pages/Gestor/GestorListaPedidosCompraPage";
import OperadorCriarPedidoCompraPage from "./pages/Operador/OperadorCriarPedidoCompraPage";
import DepComprasListaPedidosPage from "./pages/DepCompras/DepComprasListaPedidosPage";
import DepComprasAtribuirCotacaoPage from "./pages/DepCompras/DepComprasAtribuirCotacaoPage";
import DepComprasVerNotaEncomendaPage from "./pages/DepCompras/DepComprasVerNotaEncomendaPage";
import OperadorVerTodasNotasPendentesPage from "./pages/Operador/OperadorVerTodasNotasPendentesPage";
import FornecedorNovaEntregaPage from "./pages/Fornecedor/FornecedorNovaEntregaPage";
import DepComprasNotasReclamadasPage from "./pages/DepCompras/DepComprasNotasReclamadasPage";

//Orçamento
import DepComprasVerOrcamentosPage from "./pages/DepCompras/DepComprasVerOrcamentosPage";
import FornecedorSubmeterOrcamentoPage from "./pages/Fornecedor/FornecedorSubmeterOrcamentoPage";

//Pedidos de Manutenção
import OperadorListaPedidosManutencaoPage from "./pages/Operador/OperadorListaPedidosManutencaoPage";
import OperadorCriarPedidoManutencaoPage from "./pages/Operador/OperadorCriarPedidoManutencaoPage";
import TecnicoPedidosManutencaoPage from "./pages/Tecnico/TecnicoPedidosManutencaoPage";
import GestorListaPedidosManutencaoPage from "./pages/Gestor/GestorListaPedidosManutencaoPage";
import TecnicoRegistoManutencaoPage from "./pages/Tecnico/TecnicoRegistoManutencaoPage";
import GestorRegistosManutencaoPage from "./pages/Gestor/GestorRegistosManutencaoPage";

//Máquinas
import TecnicoMaquinaPage from "./pages/Tecnico/TecnicoListaMaquinasPage";

//Assistências
import TecnicoAssistente from "./pages/Tecnico/TecnicoAssistentePage";
import TecnicoListaAssistenciasPage from "./pages/Tecnico/TecnicoListaAssistenciasPage";
import TecnicoCriarAssistenciaPage from "./pages/Tecnico/TecnicoCriarAssistenciaPage";
import TecnicoCriarMaquinaPage from "./pages/Tecnico/TecnicoCriarMaquinaPage";

//Materias Primas
import OperadorArmazemPage from "./pages/Operador/OperadorArmazemPage";
import GestorMateriasPrimasPage from "./pages/Gestor/GestorMateriasPrimasPage";
import GestorCriarMateriaPrimaPage from "./pages/Gestor/GestorCriarMateriaPrimaPage";
import OperadorReceberPorMateriaPage from "./pages/Operador/OperadorReceberPorMateriaPage";

// Produtos
import GestorListaProdutosPage from "./pages/Gestor/GestorListaProdutosPage";
import GestorCriarProdutoPage from "./pages/Gestor/GestorCriarProdutoPage"; 

//Fornecedores
import GestorListaFornecedoresPage from "./pages/Gestor/GestorListaFornecedoresPage";
import GestorCriarFornecedorPage from "./pages/Gestor/GestorCriarFornecedorPage";

//Clientes
import GestorListaClientesPage from "./pages/Gestor/GestorListaClientesPage";
import GestorCriarClientePage from "./pages/Gestor/GestorCriarClientePage";


import GestorCriarEncomendaPage from './pages/Gestor/GestorCriarEncomendaPage';
import GestorListarEncomendasPage from "./pages/Gestor/GestorListarEncomendasPage";
import GestorCriarOrdemProducaoPage from './pages/Gestor/GestorCriarOrdemProducaoPage';
import GestorListarOrdensProducaoPage from "./pages/Gestor/GestorListarOrdensProducaoPage";


import OperadorListarOrdensProducaoPage from "./pages/Operador/OperadorListarOrdensProducaoPage";
import OperadorCriarRegistoOrdemProducaoPage from "./pages/Operador/OperadorCriarRegistoOrdemProducaoPage";
import './App.css'

function App() {
  console.log("App carregado");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/gestor" element={<GestorLayout />}>
          <Route path="home" element={<GestorHomePage />} />
          <Route path="definicoes" element={<GestorDefinicoesPage />} />
          <Route path="utilizadores" element={<GestorUtilizadoresPage />} />
          <Route path="novo-utilizador" element={<GestorCriarUtilizadorPage />} />
          <Route path="gerir-perfil" element={<GerirPerfilPage />} />
          <Route path="pedidos-manutencao" element={<GestorListaPedidosManutencaoPage />} />
          <Route path="pedidos-compra" element={<GestorListaPedidosCompraPage />} />
          <Route path="/gestor/registos-manutencao/:pedidoId" element={<GestorRegistosManutencaoPage />} />
          <Route path="materia-prima" element={<GestorMateriasPrimasPage />} />
          <Route path="materia-prima/criar" element={<GestorCriarMateriaPrimaPage />} />
          <Route path="/gestor/fornecedores" element={<GestorListaFornecedoresPage />} />
          <Route path="/gestor/criar-fornecedor" element={<GestorCriarFornecedorPage />} /> 
          <Route path="ListarProdutos" element={<GestorListaProdutosPage />} />
          <Route path="criar-produto" element={<GestorCriarProdutoPage />} />
          <Route path="clientes" element={<GestorListaClientesPage />} />
          <Route path="criar-cliente" element={<GestorCriarClientePage />} />
          <Route path="nova-encomenda" element={<GestorCriarEncomendaPage />} />
          <Route path="listar-encomenda" element={<GestorListarEncomendasPage />} />
          <Route path="novo-produto" element={<GestorCriarOrdemProducaoPage />} />
          <Route path="listar-produto" element={<GestorListarOrdensProducaoPage />} />
        </Route>

        <Route path="/operador" element={<OperadorLayout />}>
          <Route path="home" element={<OperadorHome />} />
          <Route path="gerir-perfil" element={<GerirPerfilPage />} />
          <Route path="definicoes" element={<OperadorDefinicoesPage />} />
          <Route path="manutencao" element={<OperadorListaPedidosManutencaoPage />} />
          <Route path="criar-pedido-manutencao" element={<OperadorCriarPedidoManutencaoPage />} />
          <Route path="armazem" element={<OperadorArmazemPage />} />
          <Route path="/operador/pedido-compra/criar/:id" element={<OperadorCriarPedidoCompraPage />} />
          <Route path="receber-materiais/:materiaPrimaId" element={<OperadorReceberPorMateriaPage />} />
          <Route path="receber-materiais" element={<OperadorVerTodasNotasPendentesPage />} />
          <Route path="listar-producao" element={<OperadorListarOrdensProducaoPage />} />
          <Route path="/operador/registo-producao/:ordemId" element={<OperadorCriarRegistoOrdemProducaoPage />} />

        </Route>

        <Route path="/tecnico" element={<TecnicoLayout />}>
          <Route path="home" element={<TecnicoHome />} />
          <Route path="definicoes" element={<TecnicoDefinicoesPage />} />
          <Route path="pedidos-compra" element={<TecnicoListaComprasPage />} />
          <Route path="criar-pedido-compra" element={<TecnicoPedidoCompraPage />} />
          <Route path="gerir-perfil" element={<GerirPerfilPage />} />
          <Route path="manutencao" element={<TecnicoPedidosManutencaoPage />} />
          <Route path="listar-maquinas" element={<TecnicoMaquinaPage />} />
          <Route path="assistencia" element={<TecnicoAssistente />} />
          <Route path="listar-assistencias" element={<TecnicoListaAssistenciasPage />} />
          <Route path="assistente/criar" element={<TecnicoCriarAssistenciaPage />} />
          <Route path="maquina/criar" element={<TecnicoCriarMaquinaPage />} />
          <Route path="/tecnico/registos-manutencao/:pedidoId" element={<TecnicoRegistoManutencaoPage />} /> 
          <Route path="/tecnico/registos-manutencao/:pedidoId" element={<TecnicoRegistoManutencaoPage />} /> 
        </Route>

        <Route path="/depcompras" element={<DepComprasLayout />}>
          <Route path="home" element={<DepComprasHome />} />
          <Route path="definicoes" element={<DepComprasDefinicoesPage />} />
          <Route path="gerir-perfil" element={<GerirPerfilPage />} />
          <Route path="compras" element={<DepComprasListaPedidosPage />} />
          <Route path="/depcompras/compras/:id/cotacao" element={<DepComprasAtribuirCotacaoPage />} />
          <Route path="/depcompras/compras/:id/orcamentos" element={<DepComprasVerOrcamentosPage />} />
          <Route path="/depcompras/compras/:id/nota" element={<DepComprasVerNotaEncomendaPage />} />
          <Route path="notas-reclamadas" element={<DepComprasNotasReclamadasPage />} />
        </Route>

        <Route path="/fornecedor" element={<FornecedorLayout />}>
          <Route path="cotacao/:id" element={<FornecedorSubmeterOrcamentoPage />} />
          <Route path="nova-entrega/:id" element={<FornecedorNovaEntregaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;