import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import styled from "styled-components";
import * as axios from "axios";
import { useDataContext } from "../context/ContextProvider";

const EmptyValue = styled.div`
  height: 1.5rem;
`;

export const CadastroCorretora = () => {
  const [select1, setSelect1] = useState(false);
  const [select1Value, setSelect1Value] = useState();
  const { register, handleSubmit, reset, errors } = useForm();

  const { data } = useDataContext();

  const clientes = data.clientes.map((item) => {
    return {
      label: item.nome,
      value: item.nome,
    };
  });

  const onSubmit = async (inputs) => {
    await axios.post(
      "https://api-invest-crud.herokuapp.com/cadastrarbancos/json",
      {
        cliente: select1Value,
        ...inputs,
      }
    );

    setSelect1Value("");
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
          <InputLabel style={{ marginBottom: "1rem" }} id="select1">
            Cliente
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="select1"
            id="select1"
            variant="outlined"
            open={select1}
            onClose={() => setSelect1(false)}
            onOpen={() => setSelect1(true)}
            value={select1Value}
            onChange={(e) => setSelect1Value(e.target.value)}
          >
            <MenuItem value="">
              <EmptyValue />
            </MenuItem>
            {clientes.map((item, index) => {
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
          name="banco_nome"
          variant="outlined"
          label="Banco - Nome"
          helperText={errors.banco_nome && "Banco - Nome é obrigatório"}
          error={errors.banco_nome}
          inputRef={register({ required: true })}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          name="agencia"
          variant="outlined"
          label="Agencia"
          helperText={errors.agencia && "Agencia é obrigatório"}
          error={errors.agencia}
          inputRef={register({ required: true })}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          name="conta_corrente"
          variant="outlined"
          label="Conta-Corrente"
          helperText={errors.conta_corrente && "Conta-Corrente é obrigatório"}
          error={errors.conta_corrente}
          inputRef={register({ required: true })}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          name="saldo_inicial"
          variant="outlined"
          label="Saldo Inicial"
          helperText={errors.saldo_inicial && "Saldo Inicial é obrigatório"}
          error={errors.saldo_inicial}
          inputRef={register({ required: true })}
        />
        <Button variant="contained" color="primary">
          Cadastrar Conta
        </Button>
      </form>
    </Container>
  );
};
