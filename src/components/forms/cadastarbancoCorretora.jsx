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
          name="banco_numero"
          variant="outlined"
          type="number"
          label="Banco - Número"
          helperText={errors.banco_numero && "O número do banco é obrigatório"}
          error={errors.banco_numero}
          ref={register({ required: true })}
        />
        <TextField
          name="banco_nome"
          variant="outlined"
          label="Banco - Nome"
          helperText={errors.banco_nome && "O nome do banco é obrigatório"}
          error={errors.banco_nome}
          ref={register({ required: true })}
        />
        <TextField
          name="agencia"
          variant="outlined"
          label="Agencia"
          helperText={errors.agencia && "O agência é obrigatório"}
          error={errors.agencia}
          ref={register({ required: true })}
        />
        <TextField
          name="conta_corrente"
          variant="outlined"
          label="Conta-Corrente"
          helperText={errors.conta_corrente && "O conta corrente é obrigatório"}
          error={errors.conta_corrente}
          ref={register({ required: true })}
        />
        <TextField
          name="saldo_inicial"
          type="number"
          variant="outlined"
          label="Saldo Inicial"
          helperText={errors.saldo_inicial && "O saldo inicial é obrigatório"}
          error={errors.saldo_inicial}
          ref={register({ required: true })}
        />
        <Button variant="contained" color="primary">
          Cadastrar Conta
        </Button>
      </form>
    </Container>
  );
};
