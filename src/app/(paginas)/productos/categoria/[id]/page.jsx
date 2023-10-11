import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';

const getCategoria = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/productos/categoria/${id}`
  );
  const data = await response.json();
  return data;
};

export default async function informacionCategoria({ params: { id } }) {
  const categoria = await getCategoria(id);
  const productos = categoria.Producto || [];

  const encabezadoProductos =
    productos.length > 0 ? Object.keys(productos[0]) : [];

  return (
    <div>
      {!categoria.message ? (
        <>
          <h1>{categoria.nombre}</h1>

          <p>Descripción: {categoria.descripcion}</p>
          <p>Fecha de Creación: {categoria.createdAt}</p>

          <h2>Productos de la Categoria: {categoria.nombre}</h2>

          <Tabla thead={encabezadoProductos} tbody={productos} />
        </>
      ) : (
        <>
          <h1>{categoria.message}</h1>

          <Link href="/productos/categoria">Volver a Categorias</Link>
        </>
      )}
    </div>
  );
}
