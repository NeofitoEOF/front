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

export const CadastrarTransacao = () => {
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

  const ativos = data.ativos.map((item) => {
    return {
      label: item.nome_ativo,
      value: item.nome_ativo,
    };
  });

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = async (inputs) => {
    const ativoSelecionado = data.ativos.find((item) => {
      return item.nome_ativo === select2Value;
    });

    await axios.post(
      "https://api-invest-crud.herokuapp.com/cadastrartransacoes/json",
      {
        cliente: select1Value,
        ticker: ativoSelecionado.nome_ativo,
        ativo_id: ativoSelecionado.ativo_id,
        ...inputs,
      }
    );

    reset();
    setSelect1Value("");
    setSelect2Value("");
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
            onClose={() => setSelect1(false)}
            onOpen={() => setSelect1(true)}
            value={select1Value}
            variant="outlined"
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
            Nome do Ativo
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select2}
            onClose={() => setSelect2(false)}
            onOpen={() => setSelect2(true)}
            value={select2Value}
            variant="outlined"
            onChange={(e) => setSelect2Value(e.target.value)}
          >
            {ativos.map((item, index) => {
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
          type="date"
          variant="outlined"
          name="data"
          inputRef={register({ required: true })}
          helperText={errors.data && "O data é obrigatório"}
          error={errors.data}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          type="number"
          variant="outlined"
          name="preco"
          label="Preço"
          inputRef={register({ required: true })}
          helperText={errors.preco && "O preço é obrigatório"}
          error={errors.preco}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          variant="outlined"
          name="quantidade"
          type="number"
          label="Quantidade"
          inputRef={register({ required: true })}
          helperText={errors.quantidade && "O quantidade é obrigatório"}
          error={errors.quantidade}
        />

        <Button variant="contained" color="primary" type="submit">
          Cadastrar Transação
        </Button>
      </form>
    </Container>
  );
};
