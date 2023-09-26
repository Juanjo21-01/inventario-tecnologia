'use client';

import { useState } from 'react';
import Input from './Input';

const Formulario = ({ campos }) => {
  const [formulario, setFormulario] = useState(campos);
  console.log(formulario);

  return (
    <form>
      {Object.keys(formulario).map((atributo, index) => {
        return (
          <div key={index}>
            <label htmlFor={atributo}>
              {atributo[0].toUpperCase() + atributo.slice(1)}
            </label>

            <Input
              atributo={atributo}
              setFormulario={setFormulario}
              formulario={formulario}
            />
          </div>
        );
      })}
      <button>Registrar</button>
    </form>
  );
};

export default Formulario;
