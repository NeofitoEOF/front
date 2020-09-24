import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Button, Typography, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import * as axios from "axios";

const EmptyValue = styled.div`
  height: 1.5rem;
`;

export const CadastrarTransacao = () => {
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [age, setAge] = useState("");
  const [clientesCadastrados, setClientesCadastrados] = useState([]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (inputs) => {
    console.log(inputs);
    reset();
  };

  (async () => {
    if (clientesCadastrados.length === 0) {
      await axios
        .get("https://api-invest-crud.herokuapp.com/clientes/")
        .then((res) => {
          const retornar = res.data.clientes.map((item) => {
            return { value: item.id, label: item.nome };
          });
          if (clientesCadastrados.length !== retornar.length) {
            setClientesCadastrados(retornar);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container style={{ paddingTop: "96px" }}>
      <Typography variant="h4">
        Cadastrar Transações
      </Typography>
      <form
        style={{ display: "grid", gridColumn: 1, gridGap: "1rem", marginTop: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <InputLabel style={{ marginBottom: "1rem" }} id="select1">
            Cliente
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="select1"
            id="select2"
            open={select1}
            onClose={() => setSelect1(false)}
            onOpen={() => setSelect1(true)}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <EmptyValue />
            </MenuItem>
            {clientesCadastrados.map((item, index) => {
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
          type="datetime-local"
          variant="outlined"
          inputRef={register}
        />

        <TextField
          style={{ marginBottom: "1rem" }}
          name="Preco"
          variant="outlined"
          label="Preço"
          inputRef={register}
        />
        <TextField
          style={{ marginBottom: "1rem" }}
          name="quantidade"
          variant="outlined"
          label="Quantidade"
          inputRef={register}
        />

        <div>
          <InputLabel
            style={{ marginBottom: "1rem" }}
            id="demo-controlled-open-select-label"
          >
            Ativo - Ticket
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select2}
            onClose={() => setSelect2(false)}
            onOpen={() => setSelect2(true)}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <EmptyValue />
            </MenuItem>
            <MenuItem value={10}>Cliente</MenuItem>
            <MenuItem value={20}>Possível Cliente</MenuItem>
          </Select>
        </div>

        <div>
          <InputLabel
            style={{ marginBottom: "1rem" }}
            id="demo-controlled-open-select-label"
          >
            Tipo Ativo
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select3}
            onClose={() => setSelect3(false)}
            onOpen={() => setSelect3(true)}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <EmptyValue />
            </MenuItem>
            <MenuItem value={10}>Cliente</MenuItem>
            <MenuItem value={20}>Possível Cliente</MenuItem>
          </Select>
        </div>

        <Button
          style={{ marginBottom: "1rem" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Cadastrar Transações
        </Button>
      </form>
    </Container>
  );
};
