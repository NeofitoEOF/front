import React from 'react'
import { useForm } from "react-hook-form";
// import Button from '@material-ui/core/Button';

export const  CadastroCliente = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (inputs) => {
        console.log(inputs)
        reset();
    }

var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api-invest-crud.herokuapp.com/depositos/',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

    
    return (
        <div>
            <h1>Cadastrar Cliente</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                >
                <input name="Nome" placeholder="Nome" ref={register} />
                <input name="CPF" placeholder="CPF" ref={register} />
                <input name="Telefone" placeholder="Telefone" ref={register} />
                <input name="Endereço" placeholder="Endereço" ref={register} />
                <input type="email" name="email" placeholder="E-mail"  ref={register}/>
                <label> Propost</label>
                <select>
                    <option value=""></option>
                    <option value="Cliente">Cliente</option>
                    <option value="Possível Cliente"> Possível Cliente</option> 
                </select>
                <button type="submit" >Cadastrar Cliente</button>
                {/* <Button tpye="submit" color="primary">
                    Primary
                </Button> */}
            </form>
        </div>
    )
}

