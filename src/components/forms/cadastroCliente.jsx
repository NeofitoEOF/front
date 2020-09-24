import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Container,
  Typography
} from "@material-ui/core";

export const CadastroCliente = () => {
  const [prospect, setProspect] = React.useState(0);
  const [select1, setSelect1] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (inputs) => {
    if (prospect === 1) inputs["prospect"] = "Cliente";
    else if (prospect === 2) inputs["prospect"] = "Cliente em Potencial";

    console.log(inputs);

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

  const handleChange = (event) => {
    setProspect(event.target.value);
  };

  return (
    <>
      <Container style={{ paddingTop: "96px" }}>
        <Typography variant="h4">Cadastrar Cliente</Typography>
        <form
          style={{ display: "grid", gridColumn: 1, gridGap: "1rem", marginTop: "2rem" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <InputLabel id="demo-controlled-open-select-label">
              Cliente & Possivel Cliente
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              name="prospect"
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={select1}
              onClose={() => setSelect1(false)}
              onOpen={() => setSelect1(true)}
              value={prospect}
              onChange={handleChange}
            >
              <MenuItem value="cliente">Cliente</MenuItem>
              <MenuItem value="nao">Possível Cliente</MenuItem>
            </Select>
          </div>

          <TextField
            style={{ marginBottom: "1rem" }}
            name="nome"
            variant="outlined"
            label="Nome"
            inputRef={register}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            name="cpf"
            variant="outlined"
            label="CPF"
            inputRef={register}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            name="telefone"
            variant="outlined"
            label="Telefone"
            inputRef={register}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            name="email"
            variant="outlined"
            label="E-mail"
            inputRef={register}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            name="endereco"
            variant="outlined"
            label="Endereço"
            inputRef={register}
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
