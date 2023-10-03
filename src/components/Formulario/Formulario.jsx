'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Label from './Label';

const Formulario = ({ campos, pathname, id, datosActualizar, detalle }) => {
  // ESTADO INICIAL
  const initialState = Object.keys(campos).reduce((obj, item) => {
    obj[item] = campos[item].value;
    return obj;
  }, {});

  // VARIABLES DE ESTADO
  const [formulario, setFormulario] = useState(initialState);
  const [detalles, setDetalles] = useState([]);
  const [total, setTotal] = useState(0);
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
  const handleReset = () => setFormulario(initialState);

  // HACER EL DETALLE DE COMPRA O VENTA
  const handleClick = () => {
    console.log('AGREGAR AL DETALLE');

    const detalle = {
      id_producto: formulario.id_producto,
      cantidad: formulario.cantidad,
      precio: formulario.precio,
    };

    // CALCULAR TOTAL
    const totalIngresado = formulario.cantidad * formulario.precio;
    setTotal(total + totalIngresado);

    // AGREGAR DETALLE
    setDetalles([...detalles, detalle]);

    // AGREGAR DETALLE Y TOTAL AL FORMULARIO
    setFormulario({
      ...formulario,
      Detalle: [...detalles, detalle],
      total: total + totalIngresado,
    });
  };

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

      {/* DETALLE DE COMPRA O VENTA */}
      {detalle ? (
        <>
          <h3>Es Compra</h3>
          <button type="button" onClick={handleClick}>
            Agregar
          </button>

          <br />
          <br />
          <br />
          <br />
          <br />
          <button type="submit">Crear</button>
        </>
      ) : (
        <>
          {id ? (
            <button type="submit">Actualizar</button>
          ) : (
            <button type="submit">Crear</button>
          )}
        </>
      )}
    </form>
  );
};

export default Formulario;
