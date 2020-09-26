import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, TextField, MenuItem } from "@material-ui/core";
import * as axios from "axios";
import { ReactHookFormSelect } from "../widgets/Select";

const AITVO_TIPOS = [
  { value: "titulo_publico", label: "Titulos Públicos" },
  { value: "renda_fixa", label: "Fundo Renda Fixa DI" },
  { value: "credito_privado", label: "Fundo Crédito Privado" },
  { value: "fundo_imobiliario", label: "Fundo Imobiliário" },
  { value: "fundo_de_acoes", label: "Fundo de Ações" },
  { value: "acoes", label: "Ações" },
];

export const CadastrarAtivo = () => {
  const { register, handleSubmit, reset, errors, control } = useForm();
  const onSubmit = async (inputs) => {
    await axios.post(
      "https://api-invest-crud.herokuapp.com/cadastrarativos/json",
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

        <ReactHookFormSelect
          id="excecao"
          name="excecao"
          control={control}
          defaultValue={""}
          variant="outlined"
          margin="normal"
          label="Exceção"
        >
          <MenuItem value="sim">Sim</MenuItem>
          <MenuItem value="nao">Não</MenuItem>
        </ReactHookFormSelect>

        <ReactHookFormSelect
          id="tipo_ativo"
          name="tipo_ativo"
          control={control}
          defaultValue={""}
          variant="outlined"
          margin="normal"
          label="Tipo de ativo"
        >
          {AITVO_TIPOS.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </ReactHookFormSelect>

        <Button variant="contained" color="primary" type="submit">
          Cadastrar Ativo
        </Button>
      </form>
    </Container>
  );
};
