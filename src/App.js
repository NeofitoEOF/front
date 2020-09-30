import React from 'react';
import { CadastroCliente } from './components/forms/cadastroCliente';
import { CadastrarDeposito } from './components/forms/cadastrarDeposito';
import { CadastroCorretora } from './components/forms/cadastarbancoCorretora';
import { CadastrarTransacao } from './components/forms/cadastrarTransacao';
import { CadastrarAtivo } from './components/forms/cadastarAtivos';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import { Navigator } from "./components/layout"
import { DataContextProvider } from "./components/context/ContextProvider"
import { Login } from "./components/screens/Login"
import { Dashboard, Patrimony,Profitability, Risk  } from "./components/pages";

function App() {
  const login = localStorage.getItem("login");

  if (!login) {
    return <Login />
  }

  return (
    <>
      <Router>
        <Navigator />
        <DataContextProvider>
          <Switch>
            <Route exact path={"/"} component={Dashboard} />
            <Route exact path={"/Rentabilidade"} component={Profitability} />
            <Route exact path={"/Patrimonio"} component={Patrimony} />
            <Route exact path={"/Risco"} component={Risk} />
            <Route exact path={"/ativo/cadastrar"} component={CadastrarAtivo} />
            <Route exact path={"/cliente/cadastrar"} component={CadastroCliente} />
            <Route exact path={"/deposito/cadastrar"} component={CadastrarDeposito} />
            <Route exact path={"/corretora/cadastrar"} component={CadastroCorretora} />
            <Route exact path={"/transacao/cadastrar"} component={CadastrarTransacao} />
          </Switch>
        </DataContextProvider>
      </Router>
    </>
  );
}

export default App;
