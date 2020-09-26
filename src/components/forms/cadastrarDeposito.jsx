import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  MenuItem,
  TextField,
} from "@material-ui/core";
import * as axios from "axios";
import { useDataContext } from "../context/ContextProvider";
import { ReactHookFormSelect } from "../widgets/Select";

export const CadastrarDeposito = () => {
  const {
    register,
    handleSubmit,
    reset,
    errors,
    control,
    getValues,
  } = useForm();

  const { data } = useDataContext();

  const clientes = data.clientes.map((item) => {
    return {
      label: item.nome,
      value: item.nome,
    };
  });

  const bancosDoCliente = data.bancos.filter((item) => {
    const { cliente } = getValues();
    return item.cliente === cliente;
  });

  const bancos = bancosDoCliente.map((item) => {
    return {
      value: item.banco_numero,
      label: item.banco_nome,
    };
  });

  const onSubmit = async (inputs) => {
    const today = new Date();

    const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`;

    await axios.post(
      "https://api-invest-crud.herokuapp.com/cadastrardepositos/json",
      {
        data: date,
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
        <ReactHookFormSelect
          id="cliente"
          name="cliente"
          control={control}
          defaultValue={""}
          variant="outlined"
          margin="normal"
          label="Cliente"
        >
          {clientes.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </ReactHookFormSelect>

        <ReactHookFormSelect
          id="banco_id"
          name="banco_id"
          control={control}
          defaultValue={""}
          variant="outlined"
          margin="normal"
          label="Banco do Cliente"
        >
          {bancos.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </ReactHookFormSelect>

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
