import React from 'react'
import { useForm } from "react-hook-form";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


export const CadastrarTransacao = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (inputs) => {
    console.log(inputs)
    reset();
  }

  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", paddingTop: "96px" }}>
        <h1 style={{ margin: "auto" }}>Cadastrar Transações</h1>
        <form
         style={{ display: "flex", flexDirection: "column", Width: 1}} onSubmit={handleSubmit(onSubmit)}
        >
          <InputLabel style={{ marginBottom: "1rem" }} id="demo-controlled-open-select-label">Cliente</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            <MenuItem value={10}>Cliente</MenuItem>
            <MenuItem value={20}>Possível Cliente</MenuItem>

          </Select>
          <TextField style={{marginBottom: "1rem"}} type="datetime-local" variant="outlined" inputRef={register} />

          <TextField style={{marginBottom: "1rem"}} name="Preco" variant="outlined" label="Preço" inputRef={register} />
          <TextField style={{marginBottom: "1rem"}} name="quantidade" variant="outlined" label="Quantidade" inputRef={register} />
          <InputLabel style={{ marginBottom: "1rem" }} id="demo-controlled-open-select-label">Ativo - Ticket</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            <MenuItem value={10}>Cliente</MenuItem>
            <MenuItem value={20}>Possível Cliente</MenuItem>

          </Select>
          <InputLabel style={{ marginBottom: "1rem" }} id="demo-controlled-open-select-label">Tipo Ativo</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em></em>
            </MenuItem>
            <MenuItem value={10}>Cliente</MenuItem>
            <MenuItem value={20}>Possível Cliente</MenuItem>

          </Select>
          <Button style={{marginBottom: "1rem"}} variant="contained" color="primary" type="submit">Cadastrar Transações</Button>
        </form>
      </div>
    </>
  )
}