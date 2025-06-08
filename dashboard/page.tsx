'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Logo from '../components/Logo';
import RegisterButton from '../components/RegisterButton';
import ResourceFilters from '../components/ResourceFilters';
import ResourceList from '../components/ResourceList';

interface Recurso {
  nome: string;
  tipo: string;
  fonte: string;
  distancia: number;
  latitude?: number;
  longitude?: number;
  endereco?: string;
  contato?: string;
  horario?: string;
}

export default function DashboardPage() {
  const [userName, setUserName] = useState('Visitante');
  const [userType, setUserType] = useState('Cidadão');
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [recursosFiltrados, setRecursosFiltrados] = useState<Recurso[]>([]);

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const user = JSON.parse(userStorage);
        setUserName(user.nome || 'Visitante');
        setUserType(user.tipo || 'Cidadão');
      } catch {
        setUserName('Visitante');
        setUserType('Cidadão');
      }
    }

    async function fetchRecursos() {
      try {
        const res = await fetch('https://aindatem-api.vercel.app/recursos');
        const data: {
        nome: string;
        recurso: string;
        fonte: string;
        distancia: string;
        latitude?: number;
        longitude?: number;
        endereco?: string;
        contato?: string;
        horario?: string;
          }[] = await res.json();

        const convertidos: Recurso[] = data.map((item) => ({

          nome: item.nome,
          tipo: item.recurso,
          fonte: item.fonte,
          distancia: parseFloat(item.distancia.match(/\d+/)?.[0] || '0'),
          latitude: item.latitude,
          longitude: item.longitude,
          endereco: item.endereco,
          contato: item.contato,
          horario: item.horario,
        }));

        setRecursos(convertidos);
        setRecursosFiltrados(convertidos);
      } catch (error) {
        console.error('Erro ao carregar recursos:', error);
      }
    }

    const recarregar = localStorage.getItem('recarregarDashboard');
    if (recarregar === 'true') {
      localStorage.removeItem('recarregarDashboard');
      fetchRecursos();
    } else {
      fetchRecursos();
    }
  }, []);

  function filtrarRecursos(filtros: {
    busca: string;
    filtroTipo: string;
    filtroFonte: string;
    filtroDistancia: string;
  }) {
    let filtrados = recursos;

    if (filtros.busca.trim() !== '') {
      filtrados = filtrados.filter(r =>
        r.nome.toLowerCase().includes(filtros.busca.toLowerCase())
      );
    }

    if (filtros.filtroTipo !== 'Todos') {
      filtrados = filtrados.filter(r => r.tipo === filtros.filtroTipo);
    }

    if (filtros.filtroFonte !== 'Todos') {
      filtrados = filtrados.filter(r => r.fonte === filtros.filtroFonte);
    }

    if (filtros.filtroDistancia !== 'Todos') {
      const maxDistancia = Number(filtros.filtroDistancia.match(/\d+/)?.[0]);
      filtrados = filtrados.filter(r => r.distancia <= maxDistancia);
    }

    setRecursosFiltrados(filtrados);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Logo />
      </div>

      <div className="mb-4">
        <DashboardHeader userName={userName} userType={userType} />
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Buscar e Filtrar Recursos</h2>
        <ResourceFilters onFilterChange={filtrarRecursos} />
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Lista de Recursos</h2>
        <ResourceList recursos={recursosFiltrados} />
      </section>

      <RegisterButton />
    </main>
  );
}
