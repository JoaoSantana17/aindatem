'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/app/components/Logo';

export default function CadastrarRecursoPage() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('Água');
  const [fonte, setFonte] = useState('Comunitária');
  const [distancia, setDistancia] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [horario, setHorario] = useState('');
  const [distanciasDisponiveis, setDistanciasDisponiveis] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDistancias() {
      try {
        const res = await fetch('https://aindatem-api.vercel.app/distancias');
        const data: string[] = await res.json();
        setDistanciasDisponiveis(data);
      } catch (error) {
        console.error('Erro ao carregar distâncias:', error);
      }
    }

    fetchDistancias();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoRecurso: {
    nome: string;
    recurso: string;
    fonte: string;
    distancia: string;
    latitude?: number;
    longitude?: number;
    endereco?: string;
    contato?: string;
    horario?: string;
  } = {
    nome,
    recurso: tipo,
    fonte,
    distancia,
    ...(latitude && { latitude: parseFloat(latitude) }),
    ...(longitude && { longitude: parseFloat(longitude) }),
    ...(endereco && { endereco }),
    ...(contato && { contato }),
    ...(horario && { horario }),
    };


    if (latitude) novoRecurso.latitude = parseFloat(latitude);
    if (longitude) novoRecurso.longitude = parseFloat(longitude);
    if (endereco) novoRecurso.endereco = endereco;
    if (contato) novoRecurso.contato = contato;
    if (horario) novoRecurso.horario = horario;

    try {
      const res = await fetch('https://aindatem-api.vercel.app/recursos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoRecurso), 
      });

      if (res.ok) {
        localStorage.setItem('recarregarDashboard', 'true');
        alert('Recurso cadastrado com sucesso!');
        router.push('/dashboard');
      } else {
        alert('Erro ao cadastrar o recurso.');
      }
    } catch (error) {
      console.error('Erro ao enviar recurso:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <Logo />

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Cadastrar Recurso</h1>
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="text-sm text-green-600 hover:underline"
            >
              ← Voltar para o dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-gray-700 font-medium mb-1">
                Nome do Local
              </label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Ex: Escola Municipal"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="tipo" className="block text-gray-700 font-medium mb-1">
                Recurso
              </label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option>Água</option>
                <option>Alimento</option>
                <option>Medicamento</option>
                <option>Higiene</option>
                <option>Abrigo</option>
              </select>
            </div>

            <div>
              <label htmlFor="fonte" className="block text-gray-700 font-medium mb-1">
                Fonte
              </label>
              <select
                id="fonte"
                value={fonte}
                onChange={(e) => setFonte(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option>Comunitária</option>
                <option>Oficial</option>
              </select>
            </div>

            <div>
              <label htmlFor="distancia" className="block text-gray-700 font-medium mb-1">
                Distância
              </label>
              <select
                id="distancia"
                value={distancia}
                onChange={(e) => setDistancia(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              >
                <option value="">Selecione...</option>
                {distanciasDisponiveis.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="latitude" className="block text-gray-700 font-medium mb-1">
                  Latitude (opcional)
                </label>
                <input
                  id="latitude"
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="-23.5505"
                  step="any"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="longitude" className="block text-gray-700 font-medium mb-1">
                  Longitude (opcional)
                </label>
                <input
                  id="longitude"
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="-46.6333"
                  step="any"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endereco" className="block text-gray-700 font-medium mb-1">
                Endereço (opcional)
              </label>
              <input
                id="endereco"
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Ex: Rua das Flores, 123"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="contato" className="block text-gray-700 font-medium mb-1">
                Contato (opcional)
              </label>
              <input
                id="contato"
                type="text"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                placeholder="Ex: (11) 99999-9999"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="horario" className="block text-gray-700 font-medium mb-1">
                Horário de Funcionamento (opcional)
              </label>
              <input
                id="horario"
                type="text"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                placeholder="Ex: Seg a Sex, 08h às 17h"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
