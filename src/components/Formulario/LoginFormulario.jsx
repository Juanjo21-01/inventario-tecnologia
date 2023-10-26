'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const initialState = {
  email: '',
  password: '',
};

const LoginFormulario = () => {
  // Variables de estado
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const { push } = useRouter();

  // Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Subir datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) setError(res.error);
    if (res?.ok) return push('/dashboard');
  };

  return (
    <form
      className="flex flex-col w-full rounded shadow-md bg-slate-300 p-7"
      onSubmit={handleSubmit}
    >
      {error && (
        <p className="p-4 text-2xl font-bold text-center text-rose-500">
          {error}
        </p>
      )}

      <label className="mb-1 font-bold text-gray-700" htmlFor="email">
        Correo Electrónico
      </label>
      <input
        className="w-full p-3 mb-3 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        type="email"
        name="email"
        id="email"
        placeholder="Ingresa tu correo electrónico"
        required
        autoFocus
        value={form.email}
        onChange={handleChange}
      />

      <label className="mb-1 font-bold text-gray-700" htmlFor="password">
        Contraseña
      </label>
      <input
        className="w-full p-3 mb-3 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        type="password"
        name="password"
        id="password"
        placeholder="Ingresa tu contraseña"
        required
        value={form.password}
        onChange={handleChange}
      />

      <button
        className="px-4 py-2 mt-5 font-bold text-white transition duration-500 ease-in-out bg-teal-400 rounded-xl hover:bg-teal-500 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginFormulario;
