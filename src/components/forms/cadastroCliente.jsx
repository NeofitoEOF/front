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
} from "@material-ui/core";
import InputMask from "react-input-mask";

export const CadastroCliente = () => {
  const [prospect, setProspect] = React.useState(0);
  const [select1, setSelect1] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm();

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
          <InputMask
            mask="999.999.999-99"
            alwaysShowMask={false}
            maskChar={null}
          >
            {() => (
              <TextField
                style={{ marginBottom: "1rem" }}
                name="cpf"
                label="CPF"
                pattern="[0-9]*"
                variant="outlined"
                helperText={errors.cpf && "O telefone é obrigatório"}
                error={errors.cpf}
                ref={register({
                  required: true,
                  pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                })}
              />
            )}
          </InputMask>

          <InputMask
            mask="(99) 99999-9999"
            alwaysShowMask={false}
            maskChar={null}
          >
            {() => (
              <TextField
                style={{ marginBottom: "1rem" }}
                name="telefone"
                variant="outlined"
                label="Telefone para contato"
                helperText={errors.telefone && "O telefone é obrigatório"}
                error={errors.telefone}
                ref={register({ required: true, minLength: 15 })}
              />
            )}
          </InputMask>

          <TextField
            style={{ marginBottom: "1rem" }}
            name="email"
            variant="outlined"
            label="E-mail"
            helperText={errors.email && "O E-mail é obrigatório"}
            error={errors.email}
            inputRef={register({ required: true})}
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            name="endereco"
            variant="outlined"
            label="Endereço"
            helperText={errors.endereco && "O endereço é obrigatório"}
            error={errors.endereco}
            inputRef={register({ required: true})}
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
