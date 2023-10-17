'use client'

import { useSession } from 'next-auth/react';

export default function Dashboard() {
  // datos de la sesion
  const { data: session, status } = useSession();

  console.log(session, status);

  return <div>panel de control</div>;
}
