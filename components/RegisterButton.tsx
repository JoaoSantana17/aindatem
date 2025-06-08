'use client';

import { useRouter } from 'next/navigation';

export default function RegisterButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard/cadastrar');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold transition"
    >
      + Cadastrar recurso
    </button>
  );
}
