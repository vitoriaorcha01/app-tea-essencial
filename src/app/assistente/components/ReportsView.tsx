'use client';

import { useState } from 'react';
import { ArrowLeft, FileText, Download, Calendar, TrendingUp, Activity, Utensils, Moon, Brain } from 'lucide-react';

interface ReportsViewProps {
  onBack: () => void;
}

export function ReportsView({ onBack }: ReportsViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'behavior', 'crisis', 'routine', 'food', 'sleep', 'therapy'
  ]);

  const reportCategories = [
    { id: 'behavior', label: 'Evolução Comportamental', icon: TrendingUp, color: 'text-blue-400' },
    { id: 'crisis', label: 'Crises', icon: Activity, color: 'text-red-400' },
    { id: 'routine', label: 'Rotina', icon: Calendar, color: 'text-green-400' },
    { id: 'food', label: 'Alimentação', icon: Utensils, color: 'text-yellow-400' },
    { id: 'sleep', label: 'Sono', icon: Moon, color: 'text-purple-400' },
    { id: 'therapy', label: 'Terapias', icon: Brain, color: 'text-pink-400' }
  ];

  const periods = [
    { id: 'week', label: 'Última Semana' },
    { id: 'month', label: 'Último Mês' },
    { id: 'quarter', label: 'Últimos 3 Meses' },
    { id: 'custom', label: 'Período Personalizado' }
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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
        <h1 className="text-xl font-bold">Relatórios</h1>
        <div className="w-20" />
      </div>

      {/* Report Builder */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-[#00FF00]" />
          <h2 className="text-lg font-bold">Gerar Relatório Personalizado</h2>
        </div>

        {/* Period Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-3">Período</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-[#00FF00] text-black'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/70 mb-3">
            Categorias a Incluir
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {reportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  selectedCategories.includes(category.id)
                    ? 'bg-[#00FF00]/10 border border-[#00FF00]'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <category.icon className={`w-4 h-4 ${category.color}`} />
                <span className="text-white/90">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button className="w-full bg-[#00FF00] text-black px-6 py-4 rounded-xl font-bold hover:bg-[#00FF00]/90 transition-colors flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Gerar e Baixar Relatório
        </button>
      </div>

      {/* Report Preview */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Prévia do Relatório</h2>

        <div className="space-y-4">
          {/* Behavior Evolution */}
          {selectedCategories.includes('behavior') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold">Evolução Comportamental</h3>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Redução de 30% em episódios de irritabilidade</p>
                <p>• Melhora significativa na adaptação a mudanças</p>
                <p>• Aumento de 40% em interações sociais positivas</p>
              </div>
            </div>
          )}

          {/* Crisis Summary */}
          {selectedCategories.includes('crisis') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-red-400" />
                <h3 className="font-bold">Resumo de Crises</h3>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Total de crises: 8 (redução de 25% vs. mês anterior)</p>
                <p>• Duração média: 12 minutos</p>
                <p>• Principal gatilho: Barulhos altos (60%)</p>
                <p>• Estratégia mais eficaz: Espaço tranquilo + música suave</p>
              </div>
            </div>
          )}

          {/* Routine Compliance */}
          {selectedCategories.includes('routine') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-green-400" />
                <h3 className="font-bold">Adesão à Rotina</h3>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Medicações: 95% de adesão</p>
                <p>• Terapias: 100% de comparecimento</p>
                <p>• Horários de sono: 85% de consistência</p>
              </div>
            </div>
          )}

          {/* Food Patterns */}
          {selectedCategories.includes('food') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold">Padrões Alimentares</h3>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Novos alimentos aceitos: 3</p>
                <p>• Refeições completas: 80%</p>
                <p>• Texturas preferidas: Crocantes e macias</p>
              </div>
            </div>
          )}

          {/* Sleep Quality */}
          {selectedCategories.includes('sleep') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold">Qualidade do Sono</h3>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Média de horas dormidas: 8.5h</p>
                <p>• Despertares noturnos: 1-2 por noite</p>
                <p>• Horário de dormir: 21h (consistente)</p>
              </div>
            </div>
          )}

          {/* Therapy Progress */}
          {selectedCategories.includes('therapy') && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold">Progresso nas Terapias</h3>
              </div>
              <div className="space-y-2 text-sm text-white/70">
                <p>• Terapia Ocupacional: Melhora na coordenação motora fina</p>
                <p>• Fonoaudiologia: Expansão do vocabulário (15 novas palavras)</p>
                <p>• ABA: Aumento de 50% em comportamentos adaptativos</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4 hover:scale-105 transition-all">
          <FileText className="w-6 h-6 text-blue-400 mb-2" />
          <p className="text-sm font-bold text-white">Relatório Médico</p>
          <p className="text-xs text-white/60">Para consultas</p>
        </button>

        <button className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4 hover:scale-105 transition-all">
          <Brain className="w-6 h-6 text-purple-400 mb-2" />
          <p className="text-sm font-bold text-white">Relatório Terapêutico</p>
          <p className="text-xs text-white/60">Para terapeutas</p>
        </button>

        <button className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4 hover:scale-105 transition-all">
          <Activity className="w-6 h-6 text-green-400 mb-2" />
          <p className="text-sm font-bold text-white">Relatório Escolar</p>
          <p className="text-xs text-white/60">Para escola</p>
        </button>
      </div>
    </div>
  );
}
