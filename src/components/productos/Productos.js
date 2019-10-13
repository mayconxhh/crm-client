import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { QUERY_PRODUCTOS } from '../../queries';
import { ELIMINAR_PRODUCTO } from '../../mutations';
import  { Link } from 'react-router-dom';
import Exito from '../Alertas/Exito';
import Paginador from '../Paginador'

class Productos extends Component {

	limite = 5;

	state = {
		alerta : {
			mostrar: false,
			mensaje: ''
		},
		paginador: {
			offset: 0,
			actual: 1
		}
	}

	paginaAnterior = ()=>{
		this.setState({
			paginador:{
				offset: this.state.paginador.offset - this.limite,
				actual: this.state.paginador.actual - 1
			}
		});
	}

	paginaSiguiente = ()=>{
		this.setState({
			paginador:{
				offset: this.state.paginador.offset + this.limite,
				actual: this.state.paginador.actual + 1
			}
		});
	}

	render() {

		const { alerta: { mostrar, mensaje } } = this.state;

		const alerta = (mostrar) ? <Exito mensaje={ mensaje } /> : '';

		return (
			<Fragment>
				<div>
					<h2 className="text-center mt-4">Productos</h2>
					{ alerta }
					<Query query={ QUERY_PRODUCTOS } pollInterval={500} variables={{ limite: this.limite, offset: this.state.paginador.offset }}>
						{({ loading, error, data, startPolling, stopPolling }) =>{
							if (loading) return "Cargando..!";
							if (error) return `Error: ${error.message}`;

							//console.log(data);

							return (
								<Fragment>
									<table className="table">
										<thead>
											<tr className="table-primary">
												<th scope="col">Nombre</th>
												<th scope="col">Precio</th>
												<th scope="col">Stock</th>
												<th scope="col">Editar</th>
												<th scope="col">Eliminar</th>
											</tr>
										</thead>
										<tbody>
											{ data.getProductos.map((item)=>{
												const { id, stock } = item;

												let clase = (stock < 50) ? 'table-danger text-light': '';

												return (
													<tr key={ id } className={ clase }>
														<td> { item.nombre } </td>
														<td> { item.precio } </td>
														<td> { item.stock } </td>
														<td>
															<Link
																to={ `productos/editar/${id}` }
																className="btn btn-warning"
															>
																Editar
															</Link>
														</td>
														<td>
															<Mutation
																mutation={ ELIMINAR_PRODUCTO }
																onCompleted={ (data)=> {
																	//console.log(data);
																	this.setState({
																		alerta: {
																			mostrar: true,
																			mensaje: data.eliminarProducto
																		}
																	}, () => {
																		setTimeout( () => {
																			this.setState({
																				alerta: {
																					mostrar: false,
																					mensaje: ''
																				}
																			})
																		}, 3000)
																	});
																}}
															>
																{
																	eliminarProducto => (
																		<button
																			type="button"
																			className="btn btn-danger"
																			onClick={ () => {
																				if(window.confirm('¿Seguro que deseas eliminar este producto?')){
																					eliminarProducto({
																						variables: { id }
																					}) 
																				}
																			}}
																		>
																			&times; Eliminar
																		</button>
																	)
																}
															</Mutation>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
									<Paginador
										actual={ this.state.paginador.actual }
										total={ data.totalProductos }
										limite={ this.limite }
										paginaAnterior={ this.paginaAnterior }
										paginaSiguiente={ this.paginaSiguiente }
									/>
								</Fragment>
							);
						}}
					</Query>
				</div>
			</Fragment>
		)
	}
}

export default Productos;