 import React from 'react'
 import { useForm } from "react-hook-form";
 import { Button } from '@material-ui/core';
 import TextField from '@material-ui/core/TextField';
 import Select from '@material-ui/core/Select';
 import MenuItem from '@material-ui/core/MenuItem';
 import InputLabel from '@material-ui/core/InputLabel';
 import axios from 'axios';
 
 export const CadastroCliente = () => {
  const [prospect, setProspect] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (inputs) => {
     if(prospect === 1)
      inputs['prospect'] = "Cliente"
     else if(prospect === 2)
      inputs['prospect'] = "Cliente em Potencial"

      console.log(inputs)

     axios.post("https://api-invest-crud.herokuapp.com/cadastrarclientes/json", inputs )
     .then(res => {
         alert("Cadastro realizado");
     })
     .catch(error => {
         alert("Houve um erro ao cadastrar");
     });
     reset();
   };

   // fetch("https://api-invest-crud.herokuapp.com/mostrarativos/")
   //   .then(response => response.text())
   //   .then(result => console.log(result))
   //   .catch(error => console.log('error', error));

   const handleChange = (event) => {
     setProspect(event.target.value);
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
         <h1 style={{ margin: "auto" }}>Cadastrar Cliente</h1>
         <form
           style={{ display: "flex", flexDirection: "column", Width: 1 }} onSubmit={handleSubmit(onSubmit)}
         >
           <TextField style={{ marginBottom: "1rem" }} name="nome" variant="outlined" label="Nome" inputRef={register} />
           <TextField style={{ marginBottom: "1rem" }} name="cpf" variant="outlined" label="CPF" inputRef={register} />
           <TextField style={{ marginBottom: "1rem" }} name="telefone" variant="outlined" label="Telefone" inputRef={register} />
           <TextField style={{ marginBottom: "1rem" }} name="email" variant="outlined" label="E-mail" inputRef={register} />
           <TextField style={{ marginBottom: "1rem" }} name="endereco" variant="outlined" label="Endereço" inputRef={register} />
           <InputLabel id="demo-controlled-open-select-label">Cliente & Possivel Cliente</InputLabel>
           <Select name="prospect"
             labelId="demo-controlled-open-select-label"
             id="demo-controlled-open-select"
             open={open}
             onClose={handleClose}
             onOpen={handleOpen}
             value={prospect}
             onChange={handleChange}
           >
             <MenuItem value={0}>
               <em></em>
             </MenuItem>
             <MenuItem value={1}>Cliente</MenuItem>
             <MenuItem value={2}>Possível Cliente</MenuItem>

           </Select>

           {/* <button type="submit" ></button> */}
           <Button style={{ marginBottom: "1rem" }} variant="contained" color="primary" type="submit" >Cadastrar Cliente</Button>
           {/* <Button tpye="submit" color="primary">
                     Primary
                 </Button> */}

         </form>
       </div>
     </>
   )
 }
