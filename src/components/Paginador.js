import React, { Component } from 'react';

export default class Paginador extends Component {
	state = {
		paginador: {
			paginas: Math.ceil(Number(this.props.total / this.props.limite))
		}
	}

	render() {

		const { actual } = this.props;
		const btnAnterior = ( actual > 1 ) ? <button onClick={ this.props.paginaAnterior }  type="button" className="btn btn-success mr-2">&laquo; Anterior</button> : '';

		const { paginas } = this.state.paginador;
		const btnSiguiente = ( actual !== paginas ) ? <button onClick={ this.props.paginaSiguiente }  type="button" className="btn btn-success ml-2">Siguiente &raquo;</button> : '';

		return (
			<div className="mt-5 mb-3 d-flex justify-content-center">
				{ btnAnterior }
				{ btnSiguiente }
			</div>
		);
	}
}
