import React from 'react';

const Error = ({error}) => {

	if (error.message) {
		error = error.message;
	}

  return (
    <p className="alert alert-danger text-center" >{ error }</p>
  )
}

export default Error;