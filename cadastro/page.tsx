'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setLoading(true);

    try {
      const response = await fetch('https://aindatem-api.vercel.app/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Salva no localStorage
        localStorage.setItem('user', JSON.stringify({
          nome,
          email,
          tipo: 'Cidadão', // ajuste se precisar diferenciar
        }));

        setSucesso('Usuário cadastrado com sucesso!');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setErro(data.error || 'Erro ao cadastrar.');
      }
    } catch {
      setErro('Erro ao se conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Criar Conta</h1>

        <form onSubmit={handleCadastro} className="space-y-6">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Seu nome completo"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500"
            disabled={loading}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seuemail@exemplo.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500"
            disabled={loading}
          />

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            placeholder="********"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500"
            disabled={loading}
          />

          {erro && <p className="text-red-600 text-center font-semibold">{erro}</p>}
          {sucesso && <p className="text-green-600 text-center font-semibold">{sucesso}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full text-sm text-gray-700 hover:text-gray-900 underline mt-2"
          >
            Já tem uma conta? Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
