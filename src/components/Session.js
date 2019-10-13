import React from 'react';
import { Query } from 'react-apollo';
import { USUARIO_ACTUAL } from '../queries';

const Session = Component => (props) => {
  return (
  	<Query
  		query={ USUARIO_ACTUAL }
  	>
  		{({ loading, error, data, refetch })=>{

			if (loading) return null;
			  
			if (error) return `Error: ${error.message}`;

  			return <Component {...props} refetch={ refetch } session={data} />
  		}}
  	</Query>
  );
}

export default Session;