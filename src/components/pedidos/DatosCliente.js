import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../queries';

const DatosCliente = ({ id }) => {
  return (
    <Fragment>
    	<h3 className="text-center">Resumen de Cliente</h3>
    	<Query
    		query={ CLIENTE_QUERY }
    		variables={{ id }}
    		pollInterval={500}
    	>

    		{({ loading, error, data, startPolling, stopPolling })=>{
    			if (loading) return "Cargando..!";
					if (error) return `Error: ${error.message}`;

					//console.log(data.getCliente);

					const { nombre, apellido, edad, emails, empresa, tipo } = data.getCliente;

					return (
						<ul className="list-unstyled my-5">
							<li className="border font-weight-bold p-2">
								Nombre:
								<span className="font-weight-normal ml-1">
									{ nombre }
								</span>
							</li>
							<li className="border font-weight-bold p-2">
								Apellido:
								<span className="font-weight-normal ml-1">
									{ apellido }
								</span>
							</li>
							<li className="border font-weight-bold p-2">
								Edad:
								<span className="font-weight-normal ml-1">
									{ edad }
								</span>
							</li>
							<li className="border font-weight-bold p-2">
								Email:
								<span className="font-weight-normal">
									{ emails.map((email)=> ` ${email.email}`) }
								</span>
							</li>
							<li className="border font-weight-bold p-2">
								Empresa:
								<span className="font-weight-normal ml-1">
									{ empresa }
								</span>
							</li>
							<li className="border font-weight-bold p-2">
								Tipo:
								<span className="font-weight-normal ml-2">
									{ tipo }
								</span>
							</li>
						</ul>
					);
    		}}
    		
    	</Query>
    </Fragment>
  )
}

export default DatosCliente;