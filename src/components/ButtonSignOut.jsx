'use client';

import { signOut } from 'next-auth/react';

const ButtonSignOut = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className="bg-zinc-50 text-teal-500 font-bold px-2 py-1 rounded-xl hover:bg-zinc-200 transition duration-300 ease-in-out"
    >
      Cerrar Sesión
    </button>
  );
};

export default ButtonSignOut;
