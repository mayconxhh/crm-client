import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CerrarSession from './CerrarSession';
import BotonRegistro from './BotonRegistro';

const Header = ({session}) => {

	//console.log(session)

	let barra = ( session.getUsuario ) ? <NavegacionAutenticado session={ session } /> : <NavegacionNoAutenticado />

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
			<div className="container">
				
				{ barra }
				
			</div>
		</nav>
	);
};

const NavegacionNoAutenticado = () =>(
	<h1 to="/" className="navbar-brand text-light font-weight-bold">
		CRM
	</h1>
)

const NavegacionAutenticado = (session) =>(
	<Fragment>
		<Link to="/" className="navbar-brand text-light font-weight-bold">
				CRM
			</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navegacion">
			<ul className="navbar-nav ml-auto text-right">
				<li className="nav-item dropdown">
					<button
						className="nav-link dropdown-toggle btn btn-link btn-block"
						data-toggle="dropdown"
					>Cliente</button>
					<div
						className="dropdown-menu mt-2"
						aria-labelledby="navegacion"
					>
						<Link to="/clientes" className="dropdown-item">
						Clientes
						</Link>
						<Link to="/clientes/nuevo" className="dropdown-item">
						Nuevo Cliente
						</Link>
					</div>
				</li>
				<li className="nav-item dropdown">
					<button
						className="nav-link dropdown-toggle btn btn-link btn-block"
						data-toggle="dropdown"
					>Producto</button>
					<div
						className="dropdown-menu mt-2"
						aria-labelledby="navegacion"
					>
						<Link to="/productos" className="dropdown-item">
						Productos
						</Link>
						<Link to="/productos/nuevo" className="dropdown-item">
						Nuevo Producto
						</Link>
					</div>
				</li>
				<BotonRegistro session={ session }/>
				<CerrarSession />
			</ul>
		</div>
	</Fragment>
)

export default Header;