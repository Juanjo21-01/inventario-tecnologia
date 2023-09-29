'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from './Input';
import Label from './Label';

const Formulario = ({ campos, id }) => {
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

    const obtenerProducto = async () => {
      const res = await fetch(`/api/productos/${id}`);
      const data = await res.json();

      setFormulario({
        nombre: data.nombre,
        codigo_SKU: data.codigo_SKU,
        precio: data.precio,
        stock: data.stock,
        id_estado: data.estado.id.toString(),
        id_proveedor: data.proveedor.id.toString(),
        id_categoria: data.categoria.id.toString(),
        descripcion: data.descripcion,
      });

    };

    obtenerProducto();
  }, [id]);
  // console.log(formulario);

  // SUBIR DATOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      // crear producto
      await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });
    } else {
      // actualizar producto
      await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });
    }

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

      {id ? (
        <button type="submit">Actualizar</button>
      ) : (
        <button type="submit">Crear</button>
      )}
    </form>
  );
};

export default Formulario;
