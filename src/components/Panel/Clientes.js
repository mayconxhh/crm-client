import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from '../../queries';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const Clientes = () => {
  console.log('ele')
  return (
    <Query
      query={ TOP_CLIENTES }
    >
      {({loading, error, data})=>{
        if(loading) return 'Cargando...';
        if (error) return `Error: ${error.message}`;

        const TopClientes = [];

        data.topClientes.map((pedido, index)=>{
          return TopClientes[index] = {
            ...pedido.cliente[0],
            total: pedido.total
          }
        });

        //console.log(TopClientes)

        return (
          <BarChart
            width={900}
            height={400}
            data={TopClientes}
            margin={{
              top: 5, right: 20, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        );
      }}
    </Query>
  )
}

export default Clientes;