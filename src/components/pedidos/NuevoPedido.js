import React, { Component, Fragment } from 'react';
import DatosCliente from './DatosCliente';
import { Query } from 'react-apollo';
import { QUERY_PRODUCTOS } from '../../queries';
import ContenidoPedido from './ContenidoPedido';

import '../../spiner.css';

class NuevoPedido extends Component {
	render() {

		const { id } = this.props.match.params;

		return (
			<Fragment>
				<h2 className="text-center mb-4">Nuevo Pedido</h2>
				<div className="row">
					<div className="col-md-3">
						<DatosCliente
							id={ id }
						/>
					</div>
					<div className="col-md-9">
						<Query query={ QUERY_PRODUCTOS }>
							{({loading, error, data})=>{
								if (loading) return (

									<div className="spinner">
									  <div className="bounce1"></div>
									  <div className="bounce2"></div>
									  <div className="bounce3"></div>
									</div>
								);

								if (error) return `Error: ${error.message}`;

								//console.log(data.getProductos)

								return (
									<ContenidoPedido
										productos={ data.getProductos }
										id={ id }
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

export default NuevoPedido;