import React from 'react';
import { Link } from 'react-router-dom';

const BotonRegistro = ({session}) => {

	const { rol } = session.session.getUsuario;

	//console.log(rol)

	if (rol!=='ADMINISTRADOR') return null;

  return (
    <Link
    	className="nav-link btn btn-link ml-2"
    	to="/registro"
    >Crear Usuario</Link>
  )
}

export default BotonRegistro;