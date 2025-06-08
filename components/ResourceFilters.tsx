'use client';

import { useState, useEffect } from 'react';

interface Props {
  onFilterChange: (filtros: Filtros) => void;
}

interface Filtros {
  busca: string;
  filtroTipo: string;
  filtroFonte: string;
  filtroDistancia: string;
}

export default function ResourceFilters({ onFilterChange }: Props) {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroFonte, setFiltroFonte] = useState('Todos');
  const [filtroDistancia, setFiltroDistancia] = useState('Todos');

  const [tipos, setTipos] = useState<string[]>([]);
  const [fontes, setFontes] = useState<string[]>([]);
  const [distancias, setDistancias] = useState<string[]>([]);

  interface Recurso {
  recurso: string;
}

useEffect(() => {
  async function fetchFiltros() {
    try {
      const resRecursos = await fetch('https://aindatem-api.vercel.app/recursos');
      const dataRecursos: Recurso[] = await resRecursos.json();
      const tiposUnicos = [...new Set(dataRecursos.map((r) => r.recurso))];
      setTipos(tiposUnicos);

      const resFontes = await fetch('https://aindatem-api.vercel.app/fontes');
      const dataFontes = await resFontes.json();
      setFontes(dataFontes);

      const resDistancias = await fetch('https://aindatem-api.vercel.app/distancias');
      const dataDistancias = await resDistancias.json();
      setDistancias(dataDistancias);
    } catch (error) {
      console.error('Erro ao buscar filtros da API:', error);
    }
  }

  fetchFiltros();
}, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({ busca, filtroTipo, filtroFonte, filtroDistancia });
    }, 100);
    return () => clearTimeout(timeout);
  }, [busca, filtroTipo, filtroFonte, filtroDistancia, onFilterChange]);

  return (
    <section className="bg-white rounded-xl shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>

      <input
        type="text"
        placeholder="Buscar por nome..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full border border-gray-400 rounded px-3 py-2 text-gray-800 placeholder-gray-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 text-gray-800"
        >
          <option value="Todos">Todos os recursos</option>
          {tipos.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>

        <select
          value={filtroFonte}
          onChange={(e) => setFiltroFonte(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 text-gray-800"
        >
          <option value="Todos">Todas as fontes</option>
          {fontes.map((fonte) => (
            <option key={fonte} value={fonte}>
              {fonte}
            </option>
          ))}
        </select>

        <select
          value={filtroDistancia}
          onChange={(e) => setFiltroDistancia(e.target.value)}
          className="border border-gray-400 rounded px-3 py-2 text-gray-800"
        >
          <option value="Todos">Qualquer distância</option>
          {distancias.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
 