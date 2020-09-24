import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Button,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import styled from "styled-components";
import * as axios from "axios";

const EmptyValue = styled.div`
  height: 1.5rem;
`;

export const CadastroCorretora = () => {
  const [select1, setSelect1] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [age, setAge] = useState("");
  const [clientesCadastrados, setClientesCadastrados] = useState([]);

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

  const onSubmit = async (inputs) => {
    console.log(inputs);
    reset();
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container style={{ paddingTop: "96px" }}>
      <Typography variant="h4">Cadastrar Banco / Corretora</Typography>
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
        <TextField name="Banco" placeholder="Banco - Número" ref={register} />
        <TextField name="Nome" placeholder="Banco Nome" ref={register} />
        <TextField name="Agencia" placeholder="Agencia" ref={register} />
        <TextField name="Conta" placeholder="Conta-Corrente" ref={register} />
        <TextField name="Data" placeholder="Data" ref={register} />
        <TextField name="saldo" placeholder="Saldo Inicial" ref={register} />
        <Button variant="contained" color="primary">
          Cadastrar Conta
        </Button>
      </form>
    </Container>
  );
};
