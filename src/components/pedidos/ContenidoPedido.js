import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';

class ContenidoPedido extends Component {

	state = {
		productos: [],
		total: 0
	}

	seleccionarProducto = (productos) => {

		if (productos && productos.length > 0) {
			productos.map((producto)=>{
				if (!producto.cantidad) return producto.cantidad=1;
				return null;
			});
		}

		this.setState({
			productos
		}, () => this.actualizarTotal());
	}

	actualizarCantidad = (cantidad, index) =>{
		//console.log(cantidad)

		// leer state de productos
		const productos = this.state.productos;
		productos[index].cantidad = Number(cantidad);

		//Atualizar productos

		// validacion

		// agregar a state
		this.setState({
			productos
		}, () => this.actualizarTotal() );
	}

	actualizarTotal = () =>{
		const productos = this.state.productos;

		// cuando todos los productos estan en 0
		if( !productos || productos.length <= 0 ) {
			this.setState({
				total: 0
			});

			return;
		}

		let nuevoTotal = 0;

		// cuando se agrega productos
		productos.map(producto=> nuevoTotal+=(producto.cantidad*producto.precio))

		this.setState({
			total:  nuevoTotal
		});
	}

	eliminarProducto = (id)=>{
		const productos = this.state.productos;

		const productosRestantes = productos.filter(producto => producto.id !== id);

		this.setState({
			productos: productosRestantes
		}, () => this.actualizarTotal() ) 
	}

	render() {
		return (
			<Fragment>
				<Select
					options={ this.props.productos }
					isMulti={ true }
					components={ Animated() }
					placeholder={ 'Seleccionar productos...' }
					getOptionValue={ (options) => options.id }
					getOptionLabel={ (options) => options.nombre }
					onChange={ this.seleccionarProducto }
					value={ this.state.productos }
				/>
				<Resumen
					productos={ this.state.productos }
					actualizarCantidad={ this.actualizarCantidad }
					eliminarProducto={ this.eliminarProducto }
					cantidadValida={ this.cantidadValida }
				/>
				<p  className="font-weight-bold float-right">
					Total:
					<span className="font-weight-normal mt-3 ml-2">
						$ { this.state.total }
					</span>
				</p>
				
				<GenerarPedido
					productos={ this.state.productos }
					total={ this.state.total }
					idCliente={ this.props.id }
				/>

			</Fragment>
		)
	}
}

export default ContenidoPedido;