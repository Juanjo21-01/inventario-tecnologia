import LoginFormulario from '@/components/Formulario/LoginFormulario';
import Image from 'next/image';

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen gap-10 bg-gray-950">
      <article className="flex flex-col items-center justify-center h-full p-3">
        <Image
          src="/titulo.svg"
          alt="Titulo"
          width={700}
          height={700}
          className="object-fill"
        />
      </article>

      <article className="flex flex-col items-center justify-center w-1/3 h-full">
        <h2 className="text-3xl italic font-semibold text-teal-500 mb-3">
          Iniciar Sesión
        </h2>
        <LoginFormulario />
      </article>
    </section>
  );
}
