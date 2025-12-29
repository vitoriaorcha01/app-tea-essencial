'use client';

import { useState } from 'react';
import { ArrowLeft, MessageSquare, Send, Smile, Frown, Meh, AlertTriangle, Utensils, Activity } from 'lucide-react';

interface SchoolCommunicationViewProps {
  onBack: () => void;
}

interface Message {
  id: string;
  from: 'school' | 'parent';
  date: string;
  time: string;
  mood?: 'happy' | 'neutral' | 'upset' | 'anxious';
  triggers?: string[];
  meals?: string[];
  activities?: string[];
  notes: string;
}

export function SchoolCommunicationView({ onBack }: SchoolCommunicationViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      from: 'school',
      date: '2024-01-08',
      time: '15:30',
      mood: 'happy',
      activities: ['Pintura', 'Recreio'],
      meals: ['Lanche: Biscoito e suco'],
      notes: 'Dia tranquilo! Participou bem das atividades de arte. No recreio brincou com os colegas.'
    },
    {
      id: '2',
      from: 'parent',
      date: '2024-01-08',
      time: '07:45',
      notes: 'Bom dia! Hoje ele acordou bem disposto. Tomou café completo. Medicação às 7h30.'
    },
    {
      id: '3',
      from: 'school',
      date: '2024-01-07',
      time: '15:30',
      mood: 'upset',
      triggers: ['Barulho na sala ao lado'],
      activities: ['Música (interrompida)'],
      notes: 'Teve um episódio de irritação durante a aula de música devido ao barulho. Levamos para o espaço sensorial e se acalmou em 10 minutos.'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showQuickUpdate, setShowQuickUpdate] = useState(false);

  const moodOptions = [
    { id: 'happy', label: 'Feliz', icon: Smile, color: 'text-green-400' },
    { id: 'neutral', label: 'Neutro', icon: Meh, color: 'text-yellow-400' },
    { id: 'upset', label: 'Irritado', icon: Frown, color: 'text-orange-400' },
    { id: 'anxious', label: 'Ansioso', icon: AlertTriangle, color: 'text-red-400' }
  ];

  const getMoodIcon = (mood?: string) => {
    const option = moodOptions.find(m => m.id === mood);
    if (!option) return null;
    const Icon = option.icon;
    return <Icon className={`w-5 h-5 ${option.color}`} />;
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
        <h1 className="text-xl font-bold">Escola ↔ Casa</h1>
        <div className="w-20" />
      </div>

      {/* Quick Update Button */}
      <button
        onClick={() => setShowQuickUpdate(!showQuickUpdate)}
        className="w-full bg-[#00FF00] text-black px-6 py-4 rounded-xl font-bold hover:bg-[#00FF00]/90 transition-colors flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-5 h-5" />
        Enviar Atualização Rápida
      </button>

      {/* Quick Update Form */}
      {showQuickUpdate && (
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold mb-4">Atualização Rápida</h3>

          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">Como está o humor?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {moodOptions.map((mood) => (
                <button
                  key={mood.id}
                  className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00FF00] transition-colors"
                >
                  <mood.icon className={`w-6 h-6 ${mood.color}`} />
                  <span className="text-xs text-white/90">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Atividades de Hoje</label>
            <input
              type="text"
              placeholder="Ex: Pintura, Recreio, Leitura"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
            />
          </div>

          {/* Meals */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Alimentação</label>
            <input
              type="text"
              placeholder="Ex: Lanche completo, Almoço parcial"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
            />
          </div>

          {/* Triggers */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Gatilhos Observados (opcional)</label>
            <input
              type="text"
              placeholder="Ex: Barulho alto, Mudança de rotina"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Observações</label>
            <textarea
              placeholder="Detalhes sobre o dia..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowQuickUpdate(false)}
              className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => setShowQuickUpdate(false)}
              className="flex-1 bg-[#00FF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#00FF00]/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Messages Timeline */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Histórico de Comunicação</h2>

        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl p-4 ${
                message.from === 'school'
                  ? 'bg-blue-500/10 border border-blue-500/30 ml-0 mr-8'
                  : 'bg-green-500/10 border border-green-500/30 ml-8 mr-0'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white/90">
                    {message.from === 'school' ? '🏫 Escola' : '🏠 Casa'}
                  </span>
                  {message.mood && getMoodIcon(message.mood)}
                </div>
                <span className="text-xs text-white/50">
                  {new Date(message.date).toLocaleDateString('pt-BR')} às {message.time}
                </span>
              </div>

              {/* Content */}
              <p className="text-sm text-white/90 mb-3">{message.notes}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {message.activities && message.activities.length > 0 && (
                  <div className="flex items-center gap-1 bg-purple-500/20 border border-purple-500/30 rounded-lg px-2 py-1">
                    <Activity className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-white/80">{message.activities.join(', ')}</span>
                  </div>
                )}
                {message.meals && message.meals.length > 0 && (
                  <div className="flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-2 py-1">
                    <Utensils className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-white/80">{message.meals.join(', ')}</span>
                  </div>
                )}
                {message.triggers && message.triggers.length > 0 && (
                  <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/30 rounded-lg px-2 py-1">
                    <AlertTriangle className="w-3 h-3 text-red-400" />
                    <span className="text-xs text-white/80">{message.triggers.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Message Input */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enviar mensagem rápida..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00FF00] focus:outline-none transition-colors"
          />
          <button
            disabled={!newMessage.trim()}
            className="bg-[#00FF00] text-black px-6 py-3 rounded-xl hover:bg-[#00FF00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
