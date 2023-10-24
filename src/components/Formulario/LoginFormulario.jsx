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
    <form className='flex flex-col items-center gap-6' onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', fontSize: '2rem' }}>{error}</div>}

      <label className='text-left w-full'  htmlFor="email">Email</label>
      <input className='rounded-md w-[250px] h-[25px] bg-[#e0e0e0] text-center'
        type="email"
        name="email"
        id="email"
        required
        autoFocus
        value={form.email}
        onChange={handleChange}
      />

      <label className='text-left w-full' htmlFor="password">Contraseña</label>
      <input className='rounded-md w-[250px] h-[25px] bg-[#e0e0e0] text-center'
        type="password"
        name="password"
        id="password"
        required
        value={form.password}
        onChange={handleChange}
      />

      <button className='rounded-xl w-full h-[50px] text-white bg-[#35cdce]' type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginFormulario;
