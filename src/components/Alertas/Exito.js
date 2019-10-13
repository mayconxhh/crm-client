import React from 'react';

const Exito = ({ mensaje }) => {
  return (
    <p className="alert alert-success py-3 text-center mb-3">{ mensaje }</p>
  )
}

export default Exito;