'use client';

type Recurso = {
  nome: string;
  tipo: string;
  distancia: number;
  fonte: string;
  endereco?: string;
  contato?: string;
  horario?: string;
  latitude?: number;
  longitude?: number;
}; 

type Props = {
  recurso: Recurso;
  onClose: () => void;
};

export default function ResourceModal({ recurso, onClose }: Props) {
  if (!recurso) return null;

 const mapSrc =
  recurso.latitude !== undefined &&
  recurso.longitude !== undefined
    ? `https://maps.google.com/maps?q=${recurso.latitude},${recurso.longitude}&z=15&output=embed`
    : null;


  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-green-600 bg-opacity-80 backdrop-blur-sm z-40 cursor-pointer"
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto p-6 relative animate-fadeInScale">
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
          >
            ×
          </button>

          <h3 className="text-2xl font-bold mb-4 text-gray-900">{recurso.nome}</h3>

          <p className="mb-2 text-gray-700">
            <strong>Tipo:</strong> {recurso.tipo} | <strong>Distância:</strong> {recurso.distancia} km |{' '}
            <strong>Fonte:</strong> {recurso.fonte}
          </p>

          {recurso.endereco && (
            <p className="mb-2 text-gray-700">
              <strong>Endereço:</strong> {recurso.endereco}
            </p>
          )}
          {recurso.contato && (
            <p className="mb-2 text-gray-700">
              <strong>Contato:</strong> {recurso.contato}
            </p>
          )}
          {recurso.horario && (
            <p className="mb-6 text-gray-700">
              <strong>Horário:</strong> {recurso.horario}
            </p>
          )}

          {mapSrc ? (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '0.75rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <iframe
                src={mapSrc}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                  borderRadius: '0.75rem',
                }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${recurso.nome}`}
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">Localização não disponível</p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.25s ease forwards;
        }
      `}</style>
    </>
  );
}
