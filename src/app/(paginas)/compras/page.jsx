import Tabla from '@/components/Tabla/Tabla';
import Link from 'next/link';
import { prisma } from '@/libs/prisma';

const obtenerCompras = async () =>
  await prisma.compra.findMany({
    select: {
      id: true,
      fecha: true,
      total: true,
      id_estado: true,
      id_proveedor: true,
    },
  });
const obtenerEstados = async () =>
  await prisma.estado.findMany({ select: { id: true, nombre: true } });
const obtenerProveedores = async () =>
  await prisma.proveedor.findMany({ select: { id: true, nombre: true } });

export default async function paginaCompras() {
  const compras = await obtenerCompras();
  const estados = await obtenerEstados();
  const proveedores = await obtenerProveedores();

  // pasar fecha a formato local y total a moneda
  compras.forEach((compra) => {
    compra.fecha = new Date(compra.fecha).toLocaleDateString();
    compra.total = `Q. ${compra.total}`;
  });

  // listado de compras para la tabla
  const encabezado =
    compras.length > 0
      ? Object.keys(compras[0])
      : ['fecha', 'total', 'estado', 'proveedor'];

  const nombresRelaciones = {
    id_estado: estados,
    id_proveedor: proveedores,
  };

  return (
    <div>
      <h2>Listado de Compras</h2>

      <Link href="/compras/registrar">Registrar Nueva Compra</Link>

      <Tabla
        thead={encabezado}
        tbody={compras}
        nombresRelaciones={nombresRelaciones}
      />
    </div>
  );
}
