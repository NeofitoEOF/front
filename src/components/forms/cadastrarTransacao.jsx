import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";
import * as axios from "axios";
import styled from "styled-components";

const EmptyValue = styled.div`
  height: 1.5rem;
`;

export const CadastrarTransacao = () => {
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [select3, setSelect3] = useState(false);
  const [select4, setSelect4] = useState(false);

  const [select1Value, setSelect1Value] = useState();
  const [select2Value, setSelect2Value] = useState();
  const [select3Value, setSelect3Value] = useState();
  const [select4Value, setSelect4Value] = useState();

  const [clients, setClient] = useState([]);

  (async () => {
    if (clients.length === 0) {
      await axios
        .get("https://api-invest-crud.herokuapp.com/clientes/")
        .then(({ data }) => {
          const retornar = data.clientes.map((item) => {
            return { value: item.nome, label: item.nome };
          });
          if (clients.length !== retornar.length) {
            setClient(retornar);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })();

  const [ativos, setAtivos] = useState([]);


  (async () => {
    if (ativos.length === 0) {
      await axios
        .get("https://api-invest-crud.herokuapp.com/mostrarativos/")
        .then(({ data }) => {
          if (ativos.length > data.ativos.length) {
            setAtivos(data.ativos);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (inputs) => {
    console.log(inputs);
    reset();
  };

  return (
    <Container style={{ paddingTop: "96px" }}>
      <Typography variant="h4">Cadastrar Transações</Typography>
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
            onChange={(e) => setSelect1Value(e.target.value)}
          >
            {[].map((item, index) => {
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
            Tipo de Ativo
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select2}
            onClose={() => setSelect2(false)}
            onOpen={() => setSelect2(true)}
            value={select2Value}
            onChange={(e) => setSelect2Value(e.target.value)}
          >
            {clients.map((item, index) => {
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
            Ticket do Ativo
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select3}
            onClose={() => setSelect3(false)}
            onOpen={() => setSelect3(true)}
            value={select3Value}
            onChange={(e) => setSelect3Value(e.target.value)}
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
        <div>
          <InputLabel id="demo-controlled-open-select-label">
            Nome do Ativo
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select4}
            onClose={() => setSelect4(false)}
            onOpen={() => setSelect4(true)}
            value={select4Value}
            onChange={(e) => setSelect4Value(e.target.value)}
          >
            {[].map((item, index) => {
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
          name="data"
          inputRef={register}
        />
        <TextField
          style={{ marginBottom: "1rem" }}
          variant="outlined"
          name="data"
          inputRef={register}
        />
        <Button variant="contained" color="primary" type="submit">
          Cadastrar Transação
        </Button>
      </form>
    </Container>
  );
};
