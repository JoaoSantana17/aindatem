'use client';

import { useRouter } from 'next/navigation';

type Props = {
  userName: string;
  userType: string;
};

export default function DashboardHeader({ userName, userType }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');  
  };

  return (
    <header className="flex justify-between items-center bg-white rounded-xl shadow p-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Olá, {userName}!</h1>
        <p className="text-sm text-gray-600">Tipo de usuário: {userType}</p>
      </div>
      <button
        onClick={handleLogout}
        className="text-red-600 hover:underline text-sm"
      >
        Sair
      </button>
    </header>
  );
}
