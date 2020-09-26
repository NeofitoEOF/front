import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, MenuItem, TextField } from "@material-ui/core";
import * as axios from "axios";
import { useDataContext } from "../context/ContextProvider";
import { ReactHookFormSelect } from "../widgets/Select";

export const CadastrarTransacao = () => {
  const { data } = useDataContext();

  const clientes = data.clientes.map((item) => {
    return {
      label: item.nome,
      value: item.nome,
    };
  });

  const ativos = data.ativos.map((item) => {
    return {
      label: item.nome_ativo,
      value: item.nome_ativo,
    };
  });

  const {
    register,
    handleSubmit,
    reset,
    errors,
    control,
    getValues,
  } = useForm();

  const onSubmit = async (inputs) => {
    const { ativo_id: ativoSelecionado } = getValues();
    const ticker = data.ativos.find((item) => {
      return item.nome_ativo === ativoSelecionado;
    });

    await axios.post(
      "https://api-invest-crud.herokuapp.com/cadastrartransacoes/json",
      {
        ticker: ticker.nome_ativo,
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
          id="ativo_id"
          name="ativo_id"
          control={control}
          defaultValue={""}
          variant="outlined"
          margin="normal"
          label="Nome do Ativo"
        >
          {ativos.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </ReactHookFormSelect>

        <TextField
          style={{ marginBottom: "1rem" }}
          type="date"
          variant="outlined"
          name="data"
          inputRef={register({ required: true })}
          helperText={errors.data && "Data é obrigatório"}
          error={errors.data}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          type="number"
          variant="outlined"
          name="preco"
          label="Preço"
          inputRef={register({ required: true })}
          helperText={errors.preco && "Preço é obrigatório"}
          error={errors.preco}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          variant="outlined"
          name="quantidade"
          type="number"
          label="Quantidade"
          inputRef={register({ required: true })}
          helperText={errors.quantidade && "Quantidade é obrigatório"}
          error={errors.quantidade}
        />

        <Button variant="contained" color="primary" type="submit">
          Cadastrar Transação
        </Button>
      </form>
    </Container>
  );
};
