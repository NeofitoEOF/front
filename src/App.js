import React from 'react';
import { CadastroCliente } from './components/forms/cadastroCliente';
import { CadastrarDeposito } from './components/forms/cadastrarDeposito';
import { CadastroCorretora } from './components/forms/cadastarbancoCorretora';
import { CadastrarTransacao } from './components/forms/cadastrarTransacao';
import { Header } from './components/Header';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";


function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path={"/"} component={CadastroCliente} />
          <Route path={"/cadastrarDeposito"} component={CadastrarDeposito} />
          <Route path={"/cadastrobancoCorretora"} component={CadastroCorretora} />
          <Route path={"/cadastrarTransacao"} component={CadastrarTransacao} />

        </Switch>
      </Router>
    </>

  );

}

export default App;
