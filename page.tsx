'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Info } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = await fetch('https://aindatem-api.vercel.app/usuario/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ email, type: 'Oficial' }));
        router.push('/dashboard');
      } else {
        setErro(data.error || 'Email ou senha incorretos.');
      }
    } catch {
      setErro('Erro ao se conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-300 via-green-400 to-green-600 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Entrar</h1>

        <div className="flex items-center bg-green-100 rounded-lg p-4 mb-8 text-green-900 font-medium text-sm shadow-inner">
          <Info className="mr-2 w-5 h-5" />
          Para testes:
          <br />
          <span className="block font-semibold mt-1 ml-6">
            Email: usermail@gmail.com <br />
            Senha: userpassword01
          </span>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seuemail@exemplo.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-green-500"
            disabled={loading}
          />

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="********"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-green-500"
            disabled={loading}
          />

          {erro && <p className="text-red-600 text-center font-semibold">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/cadastro')}
            className="w-full text-sm text-gray-700 hover:text-gray-900 underline mt-2"
          >
            Criar nova conta
          </button>
        </form>
      </div>
    </main>
  );
} 
