import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from '../../mutations';
import Error from '../Alertas/Error';
import { withRouter, Redirect } from 'react-router-dom';

const initialState = {
  usuario: '',
  password: '',
  repetirPassword: '',
  nombre: '',
  rol: ''
}

class Registro extends Component {
  state= {
    ...initialState
  }

  actualizarState = e =>{
    const { name, value } = e.target;
    
    this.setState({
      [name]: value
    });

  }

  validarForm = () => {
    const { usuario, password, repetirPassword, rol, nombre } = this.state;

    const noValido = !usuario || !password || password !== repetirPassword || !rol || !nombre;

    return noValido;
  }

  crearRegistro = (e, nuevoUsuario )=>{
    e.preventDefault();

    nuevoUsuario().then(data=>{
      console.log(data);
      this.limpiarState();
      this.props.history.push('/login');
    })
  }

  limpiarState = () =>{
    this.setState({
      ...initialState
    })
  }

  render() {
    //console.log(this.props.session.getUsuario.rol)
    const rolUser = this.props.session.getUsuario.rol;

    const redireccion = ( rolUser !== 'ADMINISTRADOR') ? <Redirect to="/clientes" /> : '';

    const { usuario, password, repetirPassword, rol, nombre } = this.state;

    const input = {
      usuario,
      password,
      rol,
      nombre
    }

    return (
      <Fragment>
        {redireccion}
        <h1 className="text-center mb-5">Nuevo Usuario</h1>
        <div className="row  justify-content-center">
          <Mutation
            mutation={ NUEVO_USUARIO }
            variables={{ input }}
          >
            {( nuevoUsuario, {loading, error, data})=>{
              return (
                <form 
                  className="col-md-8"
                  onSubmit={ e => this.crearRegistro( e, nuevoUsuario ) }
                >
                  
                  { error && <Error error={error} /> }

                  <div className="form-group">
                    <label>Usuario</label>
                    <input
                      value={ usuario }
                      type="text" 
                      name="usuario" 
                      className="form-control" 
                      placeholder="Nombre Usuario"
                      onChange={ this.actualizarState }
                    />
                    <small className="form-text text-muted">
                      ( Sin espaciosy sin caracteres especiales )
                    </small>
                  </div>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      value={ nombre }
                      type="text" 
                      name="nombre" 
                      className="form-control" 
                      placeholder="Nombre Completo"
                      onChange={ this.actualizarState }
                    />
                    <small className="form-text text-muted">
                      ( Agrega nombres y apellidos completos )
                    </small>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Password</label>
                      <input 
                        value={ password }
                        type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password"
                        onChange={ this.actualizarState }
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Repetir Password</label>
                      <input 
                        value={ repetirPassword   }
                        type="password" 
                        name="repetirPassword" 
                        className="form-control" 
                        placeholder="Repetir Password"
                        onChange={ this.actualizarState }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Rol: </label>
                    <select
                      value={ rol }
                      name="rol"
                      className="form-control"
                      onChange={ this.actualizarState }
                    >
                      <option value="">Elegir...</option>
                      <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                      <option value="VENDEDOR">VENDEDOR</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="btn btn-success float-right"
                    disabled={ loading || this.validarForm() }
                  >
                    Crear Usuario
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

export default withRouter(Registro);