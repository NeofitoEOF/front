import React from 'react'
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

export const CadastroCorretora = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (inputs) => {
        console.log(inputs)
        reset();
    }
    return (
        <div>
            <h1>Cadastrar Banco / Corretora</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <label> Cliente</label>                
                <select>
                    <option value=""></option>
                    <option value="Cliente">Cliente</option>
                    <option value="Possível Cliente"> Possível Cliente</option>
                </select>
                <input name="Banco" placeholder="Banco - Número" ref={register} />
                <input name="Nome" placeholder="Banco Nome" ref={register} />
                <input name="Agencia" placeholder="Agencia" ref={register} />
                <input name="Conta" placeholder="Conta-Corrente" ref={register} />
                <input name="Data" placeholder="Data" ref={register} />    
                <input name="saldo" placeholder="Saldo Inicial" ref={register} />
                <Button variant="contained" color="primary">
                Cadastrar Conta
             </Button>
            </form>
        </div>
    )
}

