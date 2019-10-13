import React, { Fragment  } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Header from './components/layout/Header';

import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';

import NuevoProducto from './components/productos/NuevoProducto';
import Productos from './components/productos/Productos';
import EditarProducto from './components/productos/EditarProducto';

import NuevoPedido from './components/pedidos/NuevoPedido';
import PedidosCliente from './components/pedidos/PedidosCliente';

import Panel from './components/Panel/Panel';
import Registro from './components/Auth/Registro';
import Login from './components/Auth/Login';

import Session from './components/Session';
import { ProtectedRoute } from './components/protected.route';
import { NoProtectedRoute } from './components/noprotected.route';

const App = ({ refetch, session })=>{

  //console.log(session);
  const { getUsuario } = session;

  const mensaje = (getUsuario) ? `Bienvenido: ${getUsuario.nombre}` : null;

  return (
    <Router>
      <Fragment>
        <Header session={session}/>
        <div className="container">
          <p className="text-right">{ mensaje }</p>
          <Switch>
            <ProtectedRoute exact path="/" component={Clientes} session={ session }/>
            <ProtectedRoute exact path="/clientes" component={Clientes} session={ session }/>
            <ProtectedRoute exact path="/clientes/nuevo" component={NuevoCliente}  session={session} />
            <ProtectedRoute exact path="/clientes/editar/:id" component={EditarCliente} />
            <ProtectedRoute exact path="/productos" component={ Productos } />
            <ProtectedRoute exact path="/productos/nuevo" component={NuevoProducto} />
            <ProtectedRoute exact path="/productos/editar/:id" component={EditarProducto} />
            <ProtectedRoute exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
            <ProtectedRoute exact path="/pedidos/:id" component={PedidosCliente} />
            <ProtectedRoute exact path="/panel" component={Panel} />
            <ProtectedRoute exact path="/registro" component={Registro} session={session } />
            <NoProtectedRoute exact path="/login" component={Login} refetch={refetch} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}


const RootSession = Session(App);
export { RootSession }

// <Route exact path="/clientes" render={()=> <Clientes  session={session} /> } />