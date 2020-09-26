import React from "react";
import { Container, TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { register, handleSubmit } = useForm();

  const doLogin = (inputs) => {
    console.log(inputs);
    localStorage.setItem("login", true);
    window.location = "/";
  };

  return (
    <Container
      style={{ display: "grid", placeItems: "center", height: "100vh" }}
    >
      <form
        style={{ display: "grid", gridGap: "1rem" }}
        onSubmit={handleSubmit(doLogin)}
      >
        <TextField
          variant="outlined"
          label="E-mail"
          type="email"
          inputRef={register({ required: true })}
        />
        <TextField
          variant="outlined"
          label="Senha"
          type="password"
          autoComplete="current-password"
          inputRef={register({ required: true })}
        />
        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </form>
    </Container>
  );
};
