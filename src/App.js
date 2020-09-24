import React from 'react';
import { CadastroCliente } from './components/forms/cadastroCliente';
import { CadastrarDeposito } from './components/forms/cadastrarDeposito';
import { CadastroCorretora } from './components/forms/cadastarbancoCorretora';
import { CadastrarTransacao } from './components/forms/cadastrarTransacao';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import { Navigator } from "./components/layout"

function App() {
  return (
    <>
      <Router>
        <Navigator />
        <Switch>
          <Route exact path={"/cliente/cadastrar"} component={CadastroCliente} />
          <Route path={"/deposito/cadastrar"} component={CadastrarDeposito} />
          <Route path={"/corretora/cadastrar"} component={CadastroCorretora} />
          <Route path={"/transacao/cadastrar"} component={CadastrarTransacao} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
