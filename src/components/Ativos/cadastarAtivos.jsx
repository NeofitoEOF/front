import React from 'react'
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

export const  CadastrarAtivo = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (inputs) => {
        console.log(inputs)
        reset();
    }
    return (
        <div>
            <h1>Cadastrar Ativo</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                >
                <input name="nome" placeholder="Nome do Ativo" ref={register} />    
                <input name="ticket" placeholder="Ticket do Ativo" ref={register} />    

                <label> Tipo do Ativo</label>
                <select>
                    <option value=""></option>
                    <option value="Cliente">Cliente</option>
                    <option value="Possível Cliente"> Possível Cliente</option>
                </select>
                <select>
                    <option value=""></option>
                    <option value="nao">Nao</option>
                    <option value="sim"> Sim</option>
                </select>
                <input name="Ativo" placeholder="Ativo id" ref={register} />    
                <Button variant="contained" color="primary">
                Cadastrar Ativo
             </Button>
            </form>
        </div>
    )
}

