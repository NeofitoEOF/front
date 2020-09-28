import React, { createContext, useMemo, useContext, useState } from "react";
import * as axios from "axios";

const Context = createContext(null);

export const useDataContext = () => {
  const context = useContext(Context);

  if (context === null) {
    throw new Error("You probably forgot to put <DataContext>.");
  }

  return context;
};

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState();
  const providerValue = useMemo(() => ({ data }), [data]);

  if (!data) {
    (async () => {
      const { data: dataClientes } = await axios.get(
        "https://api-invest-crud.herokuapp.com/clientes/"
      );

      const { data: dataAtivos } = await axios.get(
        "https://api-invest-crud.herokuapp.com/mostrarativos/"
      );

      const { data: dataBancos } = await axios.get(
        "https://api-invest-crud.herokuapp.com/bancos/"
      );

      setData({
        clientes: dataClientes.clientes,
        ativos: dataAtivos.ativos,
        bancos: dataBancos.contas_bancarias,
      });
    })();
  }

  return (
    <Context.Provider value={providerValue}>
      {children}
    </Context.Provider>
  );
};
