import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const cerrarSesionUsuario = (cliente, history) =>{
  localStorage.removeItem('ui', '');

  cliente.resetStore();

  history.push('/login');
}

const CerrarSession = ({history}) => (
  <ApolloConsumer>
    { cliente => {
      return (
        <button
          className="btn btn-light ml-md-3 mt-2 mt-md-0"
          onClick={() => cerrarSesionUsuario(cliente, history)}
        >
          Cerrar Sesión
        </button>
      ) 
    }}
  </ApolloConsumer>
)

export default withRouter(CerrarSession);