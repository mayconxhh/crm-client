import gql from 'graphql-tag'; 

export const CLIENTES_QUERY = gql`
  query getClientes($limite: Int, $offset: Int, $vendedor: String){
    getClientes(limite: $limite, offset: $offset, vendedor: $vendedor ){
      id
      nombre
      apellido
      empresa
      vendedor
    }
    totalClientes( vendedor: $vendedor )
  }
`;

export const CLIENTE_QUERY = gql`
query ConsultarCliente($id: ID){
  getCliente(id: $id){
    nombre
    apellido
    empresa
    edad
    tipo
    emails {
    	email
    }
    vendedor
  }
}`;

export const QUERY_PRODUCTOS = gql`
  query getProductos($limite: Int, $offset: Int){
    getProductos(limite: $limite, offset: $offset ){
      nombre
      id
      precio
      stock
    }
    totalProductos
  }
`;

export const PRODUCTO_QUERY = gql`
  query getProducto($id: ID){
    getProducto(id: $id){
      precio
      id
      nombre
      stock
    }        
  }
`;

export const PEDIDOS_QUERY = gql`
  query getPedidos($cliente: ID){
    getPedidos(cliente: $cliente){
      id
      estado
      fecha
      cliente
      total
      pedidos {
        id
        cantidad
      }
    }
  }
`;

export const TOP_CLIENTES = gql`
  query {
    topClientes {
      total
      cliente {
        nombre
      }
    }
  }
`;

export const USUARIO_ACTUAL = gql`
  query getUsuario {
    getUsuario{
      usuario
      id
      nombre
      rol
    }
  }
`;