'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle, Play, Pause, RotateCcw, Volume2, Heart, Wind } from 'lucide-react';

interface CrisisModeProps {
  onBack: () => void;
}

export function CrisisMode({ onBack }: CrisisModeProps) {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const techniques = [
    {
      id: 'breathing',
      title: 'Respiração Guiada',
      description: '4 segundos inspirar, 4 segurar, 4 expirar',
      icon: Wind,
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'massage',
      title: 'Massagem Leve',
      description: 'Movimentos circulares nos braços',
      icon: Heart,
      color: 'from-pink-500/20 to-pink-600/20',
      borderColor: 'border-pink-500/30'
    },
    {
      id: 'sounds',
      title: 'Sons Calmantes',
      description: 'Música suave ou sons da natureza',
      icon: Volume2,
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30'
    }
  ];

  const strategies = [
    'Brinquedo sensorial favorito',
    'Espaço tranquilo e escuro',
    'Cobertor pesado',
    'Reduzir estímulos visuais',
    'Falar em tom baixo e calmo'
  ];

  const checklist = [
    'Barulho alto?',
    'Muitas pessoas?',
    'Mudança de rotina?',
    'Fome ou sede?',
    'Cansaço?',
    'Desconforto físico?'
  ];

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
        <h1 className="text-xl font-bold">Modo de Crise</h1>
        <div className="w-20" />
      </div>

      {/* Emergency Activation */}
      <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-red-400 animate-pulse" />
          <div>
            <h2 className="text-lg font-bold">Modo de Emergência</h2>
            <p className="text-xs text-white/70">Ative para iniciar protocolo de crise</p>
          </div>
        </div>

        {!isActive ? (
          <button
            onClick={() => setIsActive(true)}
            className="w-full bg-red-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors"
          >
            ATIVAR MODO DE CRISE
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-black/30 rounded-xl p-6 text-center">
              <p className="text-sm text-white/70 mb-2">Tempo decorrido</p>
              <p className="text-4xl font-bold text-[#00FF00] font-mono">{formatTime(timer)}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsActive(false);
                  setTimer(0);
                }}
                className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors"
              >
                Finalizar
              </button>
              <button
                onClick={() => setTimer(0)}
                className="bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Guided Techniques */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Técnicas Guiadas</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {techniques.map((technique) => (
            <button
              key={technique.id}
              onClick={() => setSelectedTechnique(technique.id)}
              className={`bg-gradient-to-br ${technique.color} backdrop-blur-sm border ${technique.borderColor} rounded-xl p-4 text-left hover:scale-105 transition-all ${
                selectedTechnique === technique.id ? 'ring-2 ring-[#00FF00]' : ''
              }`}
            >
              <technique.icon className="w-8 h-8 text-[#00FF00] mb-3" />
              <h3 className="text-sm font-bold text-white mb-1">{technique.title}</h3>
              <p className="text-xs text-white/60">{technique.description}</p>
            </button>
          ))}
        </div>

        {selectedTechnique && (
          <div className="mt-4 bg-black/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">
                {techniques.find(t => t.id === selectedTechnique)?.title}
              </h3>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-[#00FF00] text-black p-3 rounded-full hover:bg-[#00FF00]/90 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-white/70">
              {selectedTechnique === 'breathing' && 'Inspire profundamente por 4 segundos... Segure por 4 segundos... Expire lentamente por 4 segundos...'}
              {selectedTechnique === 'massage' && 'Faça movimentos circulares suaves nos braços da criança, do ombro até o pulso...'}
              {selectedTechnique === 'sounds' && 'Reproduzindo sons calmantes da natureza...'}
            </p>
          </div>
        )}
      </div>

      {/* Strategies That Work */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Estratégias que Funcionam</h2>

        <div className="space-y-2">
          {strategies.map((strategy, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-[#00FF00] rounded-full" />
              <p className="text-sm text-white/90">{strategy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Crisis Checklist */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">O que pode ter desencadeado?</h2>
        <p className="text-sm text-white/70 mb-4">Marque os possíveis gatilhos:</p>

        <div className="space-y-2">
          {checklist.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#00FF00] focus:ring-[#00FF00] focus:ring-offset-0"
              />
              <span className="text-sm text-white/90">{item}</span>
            </label>
          ))}
        </div>

        <button className="w-full mt-4 bg-[#00FF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#00FF00]/90 transition-colors">
          Salvar Registro da Crise
        </button>
      </div>
    </div>
  );
}
