'use client';

import { useState } from 'react';
import { ArrowLeft, MapPin, AlertTriangle, CheckCircle, Share2, Download } from 'lucide-react';

interface SensoryMapViewProps {
  onBack: () => void;
}

export function SensoryMapView({ onBack }: SensoryMapViewProps) {
  const [triggers] = useState([
    { id: '1', type: 'Som', description: 'Liquidificador', severity: 'high', color: 'red' },
    { id: '2', type: 'Luz', description: 'Luzes fluorescentes', severity: 'medium', color: 'yellow' },
    { id: '3', type: 'Toque', description: 'Etiquetas de roupa', severity: 'medium', color: 'yellow' },
    { id: '4', type: 'Visual', description: 'Ambientes muito coloridos', severity: 'low', color: 'green' }
  ]);

  const [safeEnvironments] = useState([
    'Quarto com luz baixa',
    'Parque no horário da manhã',
    'Biblioteca',
    'Casa da avó'
  ]);

  const [calmingStrategies] = useState([
    'Música suave',
    'Massagem nos braços',
    'Brinquedo sensorial favorito',
    'Respiração guiada',
    'Espaço tranquilo'
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-[#00FF00] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>
        <h1 className="text-xl font-bold">Mapa Sensorial</h1>
        <button className="text-[#00FF00] hover:text-[#00FF00]/80 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-[#00FF00]" />
          <h2 className="text-lg font-bold">Perfil Sensorial</h2>
        </div>
        <p className="text-sm text-white/70 mb-4">
          Compartilhe este perfil com escola, terapeutas e familiares para garantir ambientes mais confortáveis.
        </p>
        <button className="w-full bg-[#00FF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#00FF00]/90 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Exportar Perfil Completo
        </button>
      </div>

      {/* Triggers Section */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Gatilhos Sensoriais
          </h2>
          <span className="text-xs text-white/50">{triggers.length} registrados</span>
        </div>

        <div className="space-y-3">
          {triggers.map((trigger) => (
            <div
              key={trigger.id}
              className={`bg-white/5 border rounded-xl p-4 ${
                trigger.severity === 'high' ? 'border-red-500/30' :
                trigger.severity === 'medium' ? 'border-yellow-500/30' :
                'border-green-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-white/50">{trigger.type}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      trigger.severity === 'high' ? 'bg-red-500' :
                      trigger.severity === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                  </div>
                  <p className="text-sm text-white/90">{trigger.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safe Environments */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-green-400" />
          Ambientes Seguros
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {safeEnvironments.map((env, index) => (
            <div
              key={index}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 hover:bg-green-500/20 transition-colors"
            >
              <p className="text-sm text-white/90">{env}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calming Strategies */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Estratégias Calmantes</h2>

        <div className="space-y-2">
          {calmingStrategies.map((strategy, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors flex items-center gap-3"
            >
              <CheckCircle className="w-4 h-4 text-[#00FF00]" />
              <p className="text-sm text-white/90">{strategy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Routes Suggestions */}
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Sugestões de Rotas</h2>
        <p className="text-sm text-white/70 mb-4">
          Baseado nos gatilhos sensoriais, evite:
        </p>
        <ul className="space-y-2 text-sm text-white/90">
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Ruas com obras e barulho de máquinas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Shopping centers em horários de pico</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00FF00] mt-1">•</span>
            <span>Restaurantes com música alta</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
