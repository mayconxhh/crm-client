import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CLIENTES_QUERY } from '../../queries';
import { ELIMINAR_CLIENTE } from '../../mutations';
import Exito from '../Alertas/Exito';
import Paginador from '../Paginador'

class Clientes extends Component {

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

  render(){

    const { alerta: { mostrar, mensaje } } = this.state;
    const alerta = (mostrar) ? <Exito mensaje={ mensaje } /> : '';

    const { rol } = this.props.session.getUsuario;

    const idVendedor = (rol==='VENDEDOR') ? this.props.session.getUsuario.id : '';

    return (
      <Query query={CLIENTES_QUERY} pollInterval={500} variables={{ limite: this.limite, offset: this.state.paginador.offset, vendedor: idVendedor }}>
        {({ loading, error, data, startPolling, stopPolling }) =>{
          if (loading) return "Cargando..!";
          if (error) return `Error: ${error.message}`;

          //console.log(data);

          return (
            <Fragment>
              <h2 className="text-center">Listado de Clientes</h2>
              { alerta }
              <ul className="list-group mt-4">
                { data.getClientes.map(item=>{
                  const id = item.id;
                  return(
                    <li key={ item.id } className="list-group-item">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-md-7 d-flex justify-content-between align-items-center">
                          { item.nombre } { item.apellido } - { item.empresa }
                        </div>
                        <div className="col-md-5 d-flex justify-content-end">
                          <Link to={`/pedidos/nuevo/${id}`} className="btn btn-warning d-block d-md-inline-block mr-2">
                            &#43; Nuevo Pedido
                          </Link>
                          <Link to={`/pedidos/${id}`} className="btn btn-primary d-block d-md-inline-block mr-2">
                            Ver Pedidos
                          </Link>
                          <Link to={`/clientes/editar/${id}`} className="btn btn-success d-block d-md-inline-block">
                          Editar Cliente
                          </Link>
                          <Mutation
                            mutation={ ELIMINAR_CLIENTE }
                            onCompleted={ (data)=> {
                                  //console.log(data);
                              this.setState({
                                alerta: {
                                  mostrar: true,
                                  mensaje: data.eliminarCliente
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
                            { eliminarCliente =>(
                              <button
                                type="button"
                                className="btn btn-danger  d-block d-md-inline-block ml-2"
                                onClick={ ()=>{
                                  if(window.confirm('Seguro que deseas eliminar este cliente?')){
                                    eliminarCliente({ variables: { id } });
                                  }
                                }}
                              >
                                &times; Eliminar
                              </button>
                            )}
                          </Mutation>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Paginador
                actual={ this.state.paginador.actual }
                total= { data.totalClientes }
                limite={ this.limite }
                paginaAnterior={ this.paginaAnterior }
                paginaSiguiente={ this.paginaSiguiente }
              />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default Clientes;