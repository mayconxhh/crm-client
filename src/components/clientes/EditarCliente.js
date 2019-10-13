import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../queries';
import FormularioEditarCliente from './FromularioEditarCliente';

export default class EditarCliente extends Component {
	state = {

	};
	render() {
		// tomando ID de contacto a editar
		const { id } = this.props.match.params;
		console.log(id);
		return (
			<Fragment>
				<h2 className="text-center mt-4">Editar Cliente</h2>
				<div className="row justify-content-center">
					<Query query={CLIENTE_QUERY} variables={{id}} >
						{({ loading, error, data, refetch })=>{
							if (loading) return "Cargando..!";
							if (error) return `Error: ${error.message}`;

							console.log(data);
							return (
								<FormularioEditarCliente
									cliente={ data.getCliente }
									id={ id }
									refetch={ refetch }
								/>
							);
						}}
					</Query>
				</div>
			</Fragment>
		);
	}
}