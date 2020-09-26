import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Select,
  InputLabel,
  TextField,
  MenuItem,
} from "@material-ui/core";
import * as axios from "axios";

const AITVO_TIPOS = [
  { value: "titulo_publico", label: "Titulos Públicos" },
  { value: "asdf", label: "Fundo Renda Fixa DI" },
  { value: "asd", label: "Fundo Crédito Privado" },
  { value: "asd", label: "Fundo Imobiliário" },
  { value: "asd", label: "Fundo de Ações" },
  { value: "asd", label: "Ações" },
];

export const CadastrarAtivo = () => {
  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [select1Value, setSelect1Value] = useState();
  const [select2Value, setSelect2Value] = useState();

  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = async (inputs) => {
    await axios.post(
      "https://api-invest-crud.herokuapp.com/cadastrarativos/json",
      {
        excecao: select1Value,
        ativ_input: select1Value,
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
        <TextField
          name="nome_ativo"
          label="Nome do Ativo"
          variant="outlined"
          helperText={errors.nome_ativo && "Nome do Ativo é obrigatório"}
          error={errors.nome_ativo}
          inputRef={register({ required: true })}
        />

        <TextField
          name="ticket_ativo"
          label="Ticket do Ativo"
          variant="outlined"
          helperText={errors.ticket_ativo && "Ticket do Ativo é obrigatório"}
          error={errors.ticket_ativo}
          inputRef={register({ required: true })}
        />

        <div>
          <InputLabel style={{ marginBottom: "1rem" }} id="select1">
            Exceção
          </InputLabel>
          <Select
            nome="excecao"
            inputRef={register}
            style={{ width: "100%" }}
            labelId="select1"
            id="select1"
            variant="outlined"
            label="Exceção"
            open={select1}
            onClose={() => setSelect1(false)}
            onOpen={() => setSelect1(true)}
            value={select1Value}
            onChange={(e) => setSelect1Value(e.target.value)}
          >
            <MenuItem value="sim">Sim</MenuItem>
            <MenuItem value="nao">Não</MenuItem>
          </Select>
        </div>

        <div>
          <InputLabel style={{ marginBottom: "1rem" }} id="select1">
            Tipo de ativo
          </InputLabel>
          <Select
            nome="tipo_ativo"
            inputRef={register}
            style={{ width: "100%" }}
            labelId="select2"
            id="select2"
            open={select2}
            variant="outlined"
            onClose={() => setSelect2(false)}
            onOpen={() => setSelect2(true)}
            value={select2Value}
            onChange={(e) => setSelect2Value(e.target.value)}
          >
            {AITVO_TIPOS.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <Button variant="contained" color="primary" type="submit">
          Cadastrar Ativo
        </Button>
      </form>
    </Container>
  );
};
