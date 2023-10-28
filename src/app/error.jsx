'use client';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-4">
      <article className="flex flex-col items-center justify-center h-full">
        <h1 className="text-5xl font-bold text-center text-yellow-700">
          Error
        </h1>
        <p className="mb-4 text-3xl font-semibold text-yellow-600">
          Página no disponible
        </p>

        {/* animación */}
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>

        <button
          className="px-4 py-2 my-5 text-center text-white bg-indigo-400 rounded-xl hover:bg-indigo-500"
          onClick={() => {
            router.push('/dashboard');
            router.refresh();
          }}
        >
          Volver
        </button>
      </article>
    </section>
  );
}
