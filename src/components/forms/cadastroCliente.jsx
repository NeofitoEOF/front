import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  Container,
} from "@material-ui/core";
import { ReactHookFormSelect } from "../widgets/Select";

export const CadastroCliente = () => {
  const { register, handleSubmit, reset, control, errors } = useForm();

  const onSubmit = async (inputs) => {
    axios
      .post(
        "https://api-invest-crud.herokuapp.com/cadastrarclientes/json",
        inputs
      )
      .then((res) => {
        alert("Cadastro realizado");
      })
      .catch((error) => {
        alert("Houve um erro ao cadastrar");
      });
    reset();
  };

  return (
    <>
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
            id="prospect"
            name="prospect"
            control={control}
            defaultValue={""}
            variant="outlined"
            margin="normal"
            label="Cliente ou Possivel Cliente"
          >
            <MenuItem value="Cliente">Cliente</MenuItem>
            <MenuItem value="Cliente em Potencial">Possível Cliente</MenuItem>
          </ReactHookFormSelect>

          <TextField
            style={{ marginBottom: "1rem" }}
            name="nome"
            variant="outlined"
            label="Nome"
            helperText={errors.nome && "Nome é obrigatório"}
            error={errors.nome}
            inputRef={register({ required: true })}
          />

          <TextField
            style={{ marginBottom: "1rem" }}
            name="cpf"
            variant="outlined"
            label="CPF"
            helperText={errors.cpf && "CPF é obrigatório"}
            error={errors.cpf}
            inputRef={register({
              required: true,
              pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            })}
          />

          <TextField
            style={{ marginBottom: "1rem" }}
            name="telefone"
            variant="outlined"
            label="Telefone"
            helperText={errors.telefone && "Telefone é obrigatório"}
            error={errors.telefone}
            inputRef={register({ required: true, minLength: 15 })}
          />

          <TextField
            style={{ marginBottom: "1rem" }}
            name="email"
            variant="outlined"
            type="email"
            label="E-mail"
            helperText={errors.email && "E-mail é obrigatório"}
            error={errors.email}
            inputRef={register({ required: true })}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            name="endereco"
            variant="outlined"
            label="Endereço"
            helperText={errors.endereco && "Endereço é obrigatório"}
            error={errors.endereco}
            inputRef={register({ required: true })}
          />

          <Button
            style={{ marginBottom: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Cadastrar Cliente
          </Button>
        </form>
      </Container>
    </>
  );
};
