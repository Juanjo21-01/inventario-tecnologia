'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Input from './Input';
import Label from './Label';

const Formulario = ({ campos, pathname, id, datosActualizar }) => {
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

  // VER PARAMS PARA ACTUALIZAR
  useEffect(() => {
    if (!id) return;

    setFormulario(datosActualizar);
  }, [id]);

  // SUBIR DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      // crear datos
      await fetch(`/api${pathname}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });
    } else {
      // actualizar datos
      await fetch(`/api${pathname}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });
    }

    handleReset();

    router.push(pathname);
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

      {id ? (
        <button type="submit">Actualizar</button>
      ) : (
        <button type="submit">Crear</button>
      )}
    </form>
  );
};

export default Formulario;
