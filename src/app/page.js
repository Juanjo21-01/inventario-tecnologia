import LoginFormulario from '@/components/Formulario/LoginFormulario';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col my-0 mx-auto bg-white justify-around items-center rounded-md h-[600px] w-[400px]'>

      <div className='flex flex-col gap-4'>
      <h1 className='text-[32px] text-[#122e40]'>Gestión de Inventarios</h1>

      <h2 className='text-[20px] text-[#122e40]'>Empresa {'"Tecnología en un solo lugar"'}</h2>
      </div>
      <LoginFormulario />
    </div>
  );
}
