import React from 'react';
import { Query, Mutation } from 'react-apollo';
import ResumenProducto from './ResumenProducto';

import { PRODUCTO_QUERY } from '../../queries';
import { ACTUALIZAR_PEDIDO } from '../../mutations';

const style = {borderWidth: "4px"};

const Pedido = (props) => {

  const { estado, fecha, id, total, pedidos } = props.pedido;
  const anteriorEstado = estado;

  const nuevafecha = new Date(Number(fecha));

  let clase;
  if (estado==="COMPLETADO") {
    clase="border-success"
  } else if(estado==="PENDIENTE") {
    clase="border-light";
  } else {
    clase="border-danger"
  }

  return (
    <div className="col-md-4">
      <div className={`card mb-3 ${clase}`} style={style}>
        <div className="card-body">
          <p className="card-text font-weight-bold ">Estado:
            <Mutation
              mutation={ ACTUALIZAR_PEDIDO }
            >
              { actualizarPedido=>(
                <select
                  className="form-control my-3"
                  value={ estado }
                  onChange={ (e) =>{
                    //console.log(e.target.value);
                    const input = {
                      anteriorEstado,
                      id,
                      cliente: props.cliente,
                      fecha,
                      pedidos,
                      total,
                      estado: e.target.value
                    }

                    // console.log(input)
                    actualizarPedido({
                      variables: {input}
                    });

                  }}
                >
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="COMPLETADO">COMPLETADO</option>
                  <option value="CANCELADO">CANCELADO</option>
                </select>
              )}
            </Mutation>
          </p> 
          <p className="card-text font-weight-bold">Pedido ID:
            <span className="font-weight-normal"> { id } </span>
          </p> 
          <p className="card-text font-weight-bold">Fecha Pedido: 
            <span className="font-weight-normal"> { nuevafecha.toLocaleString('es-PE') } </span>
          </p>
          <p className="card-text font-weight-bold">Total: 
            <span className="font-weight-normal"> { total } </span>
          </p>

          <h4 className="card-text text-center mb-3">Artículos del pedido</h4>
          {
            pedidos.map((producto, key)=>{
              const { id, cantidad } = producto;
              return (
                <Query
                  key={ key }
                  query={ PRODUCTO_QUERY }
                  variables={{id}}
                >
                  {({ loading, error, data })=>{
                    if (loading) return (
                      <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    );

                    if (error) return `Error: ${error.message}`;

                    //console.log(data);

                    return (
                      <ResumenProducto
                        key={ id }
                        producto={ data.getProducto }
                        cantidad={ cantidad }
                      />
                    )
                  }}
                </Query>
              );
            })
          }
        </div>
      </div>
    </div>
  )
};

export default Pedido;