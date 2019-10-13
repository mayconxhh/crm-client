import React, { Component, Fragment } from 'react';
import { NUEVO_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';

const initialState = {
	nombre: '',
	precio: '',
	stock: ''
}

export default class NuevoProducto extends Component {

		state = {
			...initialState
		}

		limpiarState =  () => {
			this.setState({
				...initialState
			});
		}

		actualizarState = e => {
			const { name, value } = e.target;
			//console.log(name, ':',value);

			this.setState({
				[name]: value
			});
		}

		validarForm = () =>{
			const { nombre, precio, stock } = this.state;

			const noValido = !nombre || !precio || !stock;

			//console.log(noValido);
			return noValido;
		}

		crearNuevoProducto = (e, nuevoProducto) => {
			e.preventDefault();

			// Insertando en DB 
			nuevoProducto().then(data=>{
				//console.log(data);
				this.limpiarState();

				// Redireccionando
				this.props.history.push('/productos');
			})
		}

		render() {

			const { nombre, precio, stock } = this.state;

			const input = {
				nombre,
				precio: Number(precio),
				stock: Number(stock)
			}

			return (
				<Fragment>
					<h2 className="text-center mt-4">Nuevo Cliente</h2>
					<div className="row justify-content-center">
						<Mutation
							mutation={ NUEVO_PRODUCTO }
							variables={{ input }}
						>
							{( nuevoProducto, { loading, error, data})=>{
								return (
									<form 
											className="col-md-8"
											onSubmit={ e => { this.crearNuevoProducto(e, nuevoProducto) }}
									>
										<div className="form-group">
											<label>Nombre:</label>
											<input 
												type="text"
												name="nombre" 
												className="form-control" 
												placeholder="Nombre del Producto"
												onChange={ this.actualizarState }
											/>
										</div>
										<div className="form-group">
											<label>Precio:</label>
											<div className="input-group">
												<div className="input-group-prepend">
													<div className="input-group-text">$</div>
												</div>
												<input 
													type="number" 
													name="precio" 
													className="form-control" 
													placeholder="Precio del Producto"
													onChange={ this.actualizarState }
												/>
											</div>
										</div>
										<div className="form-group">
											<label>Stock:</label>
											<input 
												type="number" 
												name="stock" 
												className="form-control" 
												placeholder="stock del Producto"
												onChange={ this.actualizarState }
											/>
										</div>
										<button 
											type="submit" 
											className="btn btn-success float-right"
											disabled={this.validarForm()}
										>
												Crear Producto
										</button>
									</form>
								);
							}}
						</Mutation>
					</div>
				</Fragment>
			);
		}
}
