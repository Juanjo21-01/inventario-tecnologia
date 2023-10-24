import Link from 'next/link';
import ButtonSignOut from './ButtonSignOut';
import getSession from '@/libs/session'; 
import logoinicio from '../assets/iconamoon_home-thin.png';
import logoproductos from '../assets/teenyicons_computer-outline.png';
import logocompras from '../assets/icons8_buy.png';
import logoventas from '../assets/ic_outline-sell.png';
import logoproveedores from '../assets/mingcute_user-5-line.png';
import logoout from '../assets/gg_log-off.png';

const Navegacion = async () => {
 const session = await getSession();

  return (
    

    <nav className='flex flex-row justify-around bg-white w-full h-[80px] items-center'  >
      <div className='flex flex-row items-center gap-6'>
        <img src={logoinicio.src} alt="" className='w-[25px] h-[25px]'/> 
      <Link href="/dashboard">Inicio</Link> 
      </div>

      <div className='flex flex-row items-center gap-6'>
        <img src={logoproductos.src} alt="" className='w-[25px] h-[25px]'/>
      <Link href="/productos">Productos</Link>
      </div>

      <div className='flex flex-row items-center gap-6'>
        <img src={logocompras.src} alt="" className='w-[25px] h-[25px]'/>
      <Link href="/compras">Compras</Link>
      </div>

      <div className='flex flex-row items-center gap-6'>
        <img src={logoventas.src} alt=""  className='w-[25px] h-[25px]'/>
      <Link href="/ventas">Ventas</Link>
      </div>

      <div className='flex flex-row items-center gap-6'>
        <img src={logoproveedores.src} alt="" className='w-[25px] h-[25px]'/>
      <Link href="/proveedores">Proveedores</Link>
      </div>
      {session && (
        <>{session.id_rol !== 3 && <Link href="/usuarios">Usuarios</Link>}</>
      )}

      <div className='flex flex-row items-center gap-6'>
      <img src={logoout.src} alt="" className='w-[25px] h-[25px]'/>
      <ButtonSignOut />
      </div>
    </nav>
  );
};

export default Navegacion;


