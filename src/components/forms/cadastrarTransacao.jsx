import React from 'react'
import { useForm } from "react-hook-form";


export const CadastrarTransacao = () => {
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = async (inputs) => {
		console.log(inputs)
		reset();
	}

	return (
		<div>
			<h1>Cadastrar Transações</h1>
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
				<input name="Preco" placeholder="Preço" ref={register} />
				<input name="quantidade" placeholder="Quantidade" ref={register} />
				<label> Ativo - Ticket</label>
				<select>
					<option value=""></option>
					<option value="Cliente">Cliente</option>
					<option value="Possível Cliente"> Possível Cliente</option>
				</select>
				<label > Tipo Ativo</label>
				<select>
					<option value=""></option>
					<option value="Cliente">Cliente</option>
					<option value="Possível Cliente"> Possível Cliente</option>
				</select>
				<button type="button">Cadastrar Transações </button>     
			</form>
		</div>
	)
}
