import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import * as axios from "axios";
import { useDataContext } from "../context/ContextProvider";

export const CadastrarDeposito = () => {
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select1Value, setSelect1Value] = useState();
  const [select2Value, setSelect2Value] = useState();


  const { data } = useDataContext();

  const clientes = data.clientes.map((item) => {
    return {
      label: item.nome,
      value: item.nome,
    };
  });

  const bancosDoCliente = data.bancos.filter((item) => {
    return item.cliente === select1Value;
  });

  const bancos = bancosDoCliente.map((item) => {
    return {
      value: item.banco_numero,
      label: item.banco_nome,
    };
  });

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = async (inputs) => {
    const today = new Date();

    const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;

    await axios.post(
      "https://api-invest-crud.herokuapp.com/cadastrardepositos/json",
      {
        data: date,
        banco_id: select2Value,
        cliente: select1Value,
        ...inputs,
      }
    );

    setSelect1Value("");
    setSelect2Value("");
    reset();
  };

  return (
    <Container style={{ paddingTop: "96px" }}>
      <form
        style={{
          display: "grid",
          gridColumn: 1,
          gridGap: "1rem",
          marginTop: "2rem",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <InputLabel id="demo-controlled-open-select-label">
            Cliente
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select1}
            variant="outlined"
            onClose={() => setSelect1(false)}
            onOpen={() => setSelect1(true)}
            value={select1Value}
            onChange={(e) => setSelect1Value(e.target.value)}
          >
            {clientes.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </div>

        <div>
          <InputLabel id="demo-controlled-open-select-label">
            Banco do Cliente
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select2}
            variant="outlined"
            onClose={() => setSelect2(false)}
            onOpen={() => setSelect2(true)}
            value={select2Value}
            onChange={(e) => setSelect2Value(e.target.value)}
          >
            {bancos.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </div>

        <TextField
          style={{ marginBottom: "1rem" }}
          variant="outlined"
          name="deposito_resgate"
          label="R$: Deposito ou Resgate"
          inputRef={register({ required: true })}
          helperText={errors.deposito_resgate && "O valor é obrigatório"}
          error={errors.deposito_resgate}
          type="number"
        />
        <Button variant="contained" color="primary" type="submit">
          Cadastrar Transação
        </Button>
      </form>
    </Container>
  );
};
