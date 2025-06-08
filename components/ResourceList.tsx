'use client';

import { useState } from 'react';
import ResourceModal from './ResourceDetailsModal';

interface Recurso {
  nome: string;
  tipo: string;
  fonte: string;
  distancia: number;
  latitude?: number;
  longitude?: number;
}

interface Props {
  recursos: Recurso[];
}

export default function ResourceList({ recursos }: Props) {
  const [recursoSelecionado, setRecursoSelecionado] = useState<Recurso | null>(null);

  return (
    <>
      <section className="bg-white rounded-xl shadow p-4 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Recursos disponíveis</h2>

        {recursos.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Nenhum recurso encontrado com os filtros aplicados.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {recursos.map((recurso, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{recurso.nome}</p>
                  <p className="text-sm text-gray-500">
                    {recurso.tipo} • Até {recurso.distancia} km • {recurso.fonte}
                  </p>
                </div>
                <button
                  onClick={() => setRecursoSelecionado(recurso)}
                  className="text-green-600 font-semibold hover:underline text-sm"
                >
                  Ver mais
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {recursoSelecionado && (
        <ResourceModal
          recurso={recursoSelecionado}
          onClose={() => setRecursoSelecionado(null)}
        />
      )}
    </>
  );
}
