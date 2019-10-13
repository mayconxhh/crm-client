import React, { Fragment } from 'react';
import Clientes from './Clientes';

const Panel = (props) => {
	console.log('porps', props)
  return (
    <Fragment>
    	<h2 className="text-center my-5">Top 10 Clientes que mas compran</h2>
			<Clientes />
    </Fragment>
  )
}

export default Panel;