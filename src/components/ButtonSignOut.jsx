'use client';

import { signOut } from 'next-auth/react';

const ButtonSignOut = () => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Cerrar Sesión
    </button>
  );
};

export default ButtonSignOut;
