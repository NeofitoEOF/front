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

export const CadastrarDeposito = () => {
  const [select1, setSelect1] = useState(false);
  const [select2, setSelect2] = useState(false);
  const [prospect,] = useState(0);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (inputs) => {
    console.log(inputs);
    reset();
  };

  const handleChange = (event) => {
    // setAge(event.target.value);
  };

  return (
    <Container style={{ paddingTop: "96px" }}>
      <Typography variant="h4">Cadastrar Depósitos e Resgates</Typography>
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
        <div>
          <InputLabel id="demo-controlled-open-select-label">
            Banco ou Corretora
          </InputLabel>
          <Select
            style={{ width: "100%" }}
            name="prospect"
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={select2}
            onClose={() => setSelect2(false)}
            onOpen={() => setSelect2(true)}
            value={prospect}
            onChange={handleChange}
          >
            <MenuItem value="cliente">Cliente</MenuItem>
            <MenuItem value="nao">Possível Cliente</MenuItem>
          </Select>
        </div>

        <TextField
          type="datetime-local"
          name="Data"
          placeholder="Data"
          inputRef={register}
          variant="outlined"
        />

        <TextField
          name="Deposito ou Resgate"
          placeholder="Deposito ou Resgate"
          inputRef={register}
          variant="outlined"
        />
        <Button variant="contained" color="primary">
          Cadastrar Transação
        </Button>
      </form>
    </Container>
  );
};
