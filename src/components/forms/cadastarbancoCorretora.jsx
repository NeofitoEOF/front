import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Button,
  TextField,
  Typography,
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
  const { register, handleSubmit, reset } = useForm();

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
          ref={register}
        />
        <TextField
          name="banco_nome"
          variant="outlined"
          label="Banco - Nome"
          ref={register}
        />
        <TextField
          name="agencia"
          variant="outlined"
          label="Agencia"
          ref={register}
        />
        <TextField
          name="conto_corrente"
          variant="outlined"
          label="Conta-Corrente"
          ref={register}
        />
        <TextField
          name="saldo_inicial"
          type="number"
          variant="outlined"
          label="Saldo Inicial"
          ref={register}
        />
        <Button variant="contained" color="primary">
          Cadastrar Conta
        </Button>
      </form>
    </Container>
  );
};
