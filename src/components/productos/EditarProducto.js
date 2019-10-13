import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { PRODUCTO_QUERY } from '../../queries';
import FormularioEditarProducto from './FormularioEditarProducto';

class EditarProducto extends Component {
	state = { }

	render() {

		// Tomar el id para editar
		const { id } = this.props.match.params;

		return (
			<Fragment>
				<div>
					<h2 className="text-center mt-4">Editar producto</h2>
					<div className="row justify-content-center">
						<Query query={ PRODUCTO_QUERY } variables={{ id }}>
							{({ loading, error, data, refetch }) => {
								if (loading) return "Cargando..!";
								if (error) return `Error: ${error.message}`;

								console.log(data);
								return (
									<FormularioEditarProducto
										producto={ data }
										id={ id }
										refetch={ refetch } 
									/>
								);
							}}
						</Query>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default EditarProducto;