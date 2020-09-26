import React from "react";
import { useForm } from "react-hook-form";
import { Container, Button, TextField, MenuItem } from "@material-ui/core";
import * as axios from "axios";
import { useDataContext } from "../context/ContextProvider";
import { ReactHookFormSelect } from "../widgets/Select";

export const CadastroCorretora = () => {
  const { register, handleSubmit, reset, errors, control } = useForm();

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
      inputs
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
