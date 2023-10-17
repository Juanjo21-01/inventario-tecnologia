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

    console.log(form);
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    console.log(res);

    if (res?.error) setError(res.error);
    if (res?.ok) return push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red', fontSize: '2rem' }}>{error}</div>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={form.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        name="password"
        id="password"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginFormulario;
