import gql from 'graphql-tag'; 

export const NUEVO_CLIENTE = gql`
	mutation crearCliente($input: ClienteInput) {
		crearCliente(input : $input){
			id
			nombre
			apellido
			vendedor
		}
	}
`;

export const EDITAR_CLIENTE = gql`
	mutation actualizarCliente($input:ClienteInput){
	  actualizarCliente(input: $input){
	    nombre
	    apellido
	    id
	    edad
	    empresa
	    tipo
	    emails {
	      email
	    }
	    vendedor
	  }
	}
`;

export const ELIMINAR_CLIENTE =gql`
	mutation eliminarCliente($id: ID){
	  eliminarCliente(id: $id)
	}
`;


export const NUEVO_PRODUCTO = gql`
	mutation nuevoProducto($input: ProductoInput){
	  nuevoProducto(input: $input){
	    id
	    nombre
	    precio
	    stock
	  }
	}
`;

export const EDITAR_PRODUCTO = gql`
	mutation actualizarProducto($input: ProductoInput){
	  actualizarProducto(input: $input){
	    id
	    nombre
	    precio
	    stock
	  }
	}
`;

export const ELIMINAR_PRODUCTO = gql`
	mutation eliminarProducto($id: ID){
	  eliminarProducto(id: $id)
	}
`;

export const NUEVO_PEDIDO = gql`
	mutation nuevoPedido($input:PedidoInput){
	  nuevoPedido(input: $input){
	    id
	  }
	}
`;

export const ACTUALIZAR_PEDIDO = gql`
	mutation actualizarPedido($input: PedidoInput){
	  actualizarPedido(input: $input){
	    estado
	    id
	    pedidos {
	      cantidad
	      id
	    }
	    total
	    cliente
	    fecha
	  }
	}
`;

export const NUEVO_USUARIO = gql`
	mutation nuevoUsuario($input: UsuarioInput){
	  nuevoUsuario(input: $input)
	}
`;

export const AUTENTICAR_USUARIO =gql`
	mutation autenticarUsuario($input:UsuarioLoginInput){
	  autenticarUsuario(input: $input){
	  	token
	  }
	}
`;