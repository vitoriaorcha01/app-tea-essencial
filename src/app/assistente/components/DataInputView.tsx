'use client';

import { useState } from 'react';
import { 
  ArrowLeft, Plus, Pill, Calendar, Brain, 
  AlertCircle, Utensils, School, Clock, Save, X
} from 'lucide-react';

interface DataInputViewProps {
  onBack: () => void;
}

type InputCategory = 'medications' | 'therapies' | 'patterns' | 'behaviors' | 'sensory' | 'food' | 'school' | 'appointments';

export function DataInputView({ onBack }: DataInputViewProps) {
  const [activeCategory, setActiveCategory] = useState<InputCategory>('medications');
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { id: 'medications', label: 'Medicações', icon: Pill, color: 'text-blue-400' },
    { id: 'therapies', label: 'Terapias', icon: Brain, color: 'text-purple-400' },
    { id: 'patterns', label: 'Padrões', icon: Clock, color: 'text-yellow-400' },
    { id: 'behaviors', label: 'Comportamentos', icon: AlertCircle, color: 'text-orange-400' },
    { id: 'sensory', label: 'Gatilhos Sensoriais', icon: AlertCircle, color: 'text-red-400' },
    { id: 'food', label: 'Alimentação', icon: Utensils, color: 'text-green-400' },
    { id: 'school', label: 'Calendário Escolar', icon: School, color: 'text-cyan-400' },
    { id: 'appointments', label: 'Consultas', icon: Calendar, color: 'text-pink-400' }
  ];

  const renderForm = () => {
    switch (activeCategory) {
      case 'medications':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Nome do Medicamento</label>
              <input
                type="text"
                placeholder="Ex: Risperidona"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Dosagem</label>
              <input
                type="text"
                placeholder="Ex: 1mg"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Horários</label>
              <div className="space-y-2">
                <input
                  type="time"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors"
                />
                <button className="text-[#00FF00] text-sm hover:text-[#00FF00]/80 transition-colors">
                  + Adicionar outro horário
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Observações</label>
              <textarea
                placeholder="Ex: Tomar com alimento"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        );

      case 'therapies':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Tipo de Terapia</label>
              <input
                type="text"
                placeholder="Ex: Terapia Ocupacional"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Terapeuta</label>
              <input
                type="text"
                placeholder="Nome do profissional"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Dia da Semana</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors">
                  <option value="">Selecione</option>
                  <option value="monday">Segunda</option>
                  <option value="tuesday">Terça</option>
                  <option value="wednesday">Quarta</option>
                  <option value="thursday">Quinta</option>
                  <option value="friday">Sexta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Horário</label>
                <input
                  type="time"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Local</label>
              <input
                type="text"
                placeholder="Endereço da clínica"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
          </div>
        );

      case 'patterns':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Categoria</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors">
                <option value="">Selecione</option>
                <option value="sleep">Sono</option>
                <option value="irritability">Irritabilidade</option>
                <option value="energy">Energia</option>
                <option value="focus">Foco</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Descrição do Padrão</label>
              <textarea
                placeholder="Ex: Costuma ficar irritado por volta das 18h"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Horário (opcional)</label>
              <input
                type="time"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
          </div>
        );

      case 'sensory':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Tipo de Gatilho</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors">
                <option value="">Selecione</option>
                <option value="sound">Som</option>
                <option value="light">Luz</option>
                <option value="touch">Toque</option>
                <option value="smell">Cheiro</option>
                <option value="taste">Sabor</option>
                <option value="visual">Visual</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Descrição</label>
              <textarea
                placeholder="Ex: Sons altos de liquidificador"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Severidade</label>
              <div className="flex gap-3">
                {['Baixa', 'Média', 'Alta'].map((level) => (
                  <button
                    key={level}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm hover:border-[#00FF00] transition-colors"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Tipo de Consulta</label>
              <input
                type="text"
                placeholder="Ex: Neurologista"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Profissional</label>
              <input
                type="text"
                placeholder="Nome do médico/terapeuta"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Data</label>
                <input
                  type="date"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Horário</label>
                <input
                  type="time"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00FF00] focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Local</label>
              <input
                type="text"
                placeholder="Endereço da clínica"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Itens para Levar</label>
              <textarea
                placeholder="Ex: Caderno de evolução, relatório da escola"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-white/50">
            Formulário em desenvolvimento
          </div>
        );
    }
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
        <h1 className="text-xl font-bold">Gerenciar Dados</h1>
        <div className="w-20" />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id as InputCategory);
              setShowForm(false);
            }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
              activeCategory === category.id
                ? 'bg-[#00FF00]/10 border-[#00FF00]'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <category.icon className={`w-6 h-6 ${category.color}`} />
            <span className="text-xs text-center text-white/90">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        {!showForm ? (
          <div className="text-center py-12">
            <Plus className="w-12 h-12 text-[#00FF00] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">
              Adicionar {categories.find(c => c.id === activeCategory)?.label}
            </h3>
            <p className="text-sm text-white/50 mb-6">
              Organize as informações da rotina da criança
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#00FF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#00FF00]/90 transition-colors"
            >
              Começar
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">
                Novo Registro - {categories.find(c => c.id === activeCategory)?.label}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {renderForm()}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
              <button
                className="flex-1 bg-[#00FF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#00FF00]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Saved Items Preview */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-4">Registros Salvos</h3>
        <div className="text-center py-8 text-white/50 text-sm">
          Nenhum registro ainda. Adicione o primeiro!
        </div>
      </div>
    </div>
  );
}
