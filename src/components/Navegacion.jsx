import Link from 'next/link';
import ButtonSignOut from './ButtonSignOut';
import getSession from '@/libs/session';
import { FcHome } from 'react-icons/fc';
import {
  BsGrid,
  BsCart3,
  BsShop,
  BsPersonWorkspace,
  BsPeople,
} from 'react-icons/bs';
const Navegacion = async () => {
  const session = await getSession();

  return (
    <nav className="flex flex-row justify-between px-8 shadow-xl bg-teal-500 mb-5 text-zinc-50 w-full items-center h-12 font-bold">
      <Link
        href="/dashboard"
        className="text-2xl hover:bg-teal-600 rounded-md p-2 h-full transition duration-500 ease-in-out"
      >
        <FcHome className="inline" /> Inicio
      </Link>

      <ul className="flex flex-row gap-x-3 text-xl h-full items-center">
        <li>
          <Link
            href="/productos"
            className=" hover:bg-teal-600 transition duration-500 ease-in-out rounded-md p-2.5"
          >
            <BsGrid className="inline" /> Productos
          </Link>
        </li>

        <li>
          <Link
            href="/compras"
            className=" hover:bg-teal-600 transition duration-500 ease-in-out rounded-md p-2.5"
          >
            <BsCart3 className="inline" /> Compras
          </Link>
        </li>

        <li>
          <Link
            href="/ventas"
            className=" hover:bg-teal-600 transition duration-500 ease-in-out rounded-md p-2.5"
          >
            <BsShop className="inline" /> Ventas
          </Link>
        </li>

        <li>
          <Link
            href="/proveedores"
            className=" hover:bg-teal-600 transition duration-500 ease-in-out rounded-md p-2.5"
          >
            <BsPeople className="inline" /> Proveedores
          </Link>
        </li>

        {session && (
          <>
            {session.id_rol !== 3 && (
              <li>
                <Link
                  href="/usuarios"
                  className=" hover:bg-teal-600 transition duration-500 ease-in-out rounded-md p-2.5"
                >
                  <BsPersonWorkspace className="inline" /> Usuarios
                </Link>
              </li>
            )}
          </>
        )}

        <ButtonSignOut />
      </ul>
    </nav>
  );
};

export default Navegacion;
