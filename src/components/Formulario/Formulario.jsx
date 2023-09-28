'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Label from './Label';

const Formulario = ({ campos }) => {
  // ESTADO INICIAL
  const initialState = Object.keys(campos).reduce((obj, item) => {
    obj[item] = campos[item].value;
    return obj;
  }, {});

  // VARIABLES DE ESTADO
  const [formulario, setFormulario] = useState(initialState);
  const router = useRouter();

  // MANEJAR CAMBIOS EN EL FORMULARIO
  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  // SUBIR DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // crear producto
    await fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    });

    handleReset();

    // redireccionar a la página de productos
    router.push('/productos');
    router.refresh();
  };

  // RESETEAR FORMULARIO
  const handleReset = () => setFormulario('');

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formulario).map((atributo) => {
        return (
          <div key={atributo}>
            <Label atributo={atributo} />

            <Input
              atributo={atributo}
              campo={campos[atributo]}
              formulario={formulario}
              handleChange={handleChange}
            />
          </div>
        );
      })}
      <button>Registrar</button>
    </form>
  );
};

export default Formulario;
