import React from 'react'
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

export const  CadastrarDeposito = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (inputs) => {
        console.log(inputs)
        reset();
    }
    return (
        <div>
            <h1>Cadastrar Depósitos e Resgates</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                >
                <label> Cliente</label>
                <select>
                    <option value=""></option>
                    <option value="Cliente">Cliente</option>
                    <option value="Possível Cliente"> Possível Cliente</option>
                </select>
                <input name="Data" placeholder="Data" ref={register} />    
                <label > Banco ou Corretora</label>
                <select>
                    <option value=""></option>
                    <option value="Cliente">Cliente</option>
                    <option value="Possível Cliente"> Possível Cliente</option>
                </select>
                <input name="Deposito ou Resgate" placeholder="Deposito ou Resgate" ref={register} />     
                <Button variant="contained" color="primary">
                Cadastrar Transação
             </Button>
            </form>
        </div>
    )
}

