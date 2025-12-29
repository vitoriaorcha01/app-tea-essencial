'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Pill, Brain, AlertTriangle, 
  TrendingUp, Activity, Bell, Zap, Heart
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'medication',
      message: 'Horário da medicação em 10 minutos',
      time: '14:50',
      priority: 'high'
    },
    {
      id: '2',
      type: 'therapy',
      message: 'Consulta com a terapeuta às 15h. Levar: caderno de evolução + relatório da escola',
      time: '15:00',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'routine',
      message: 'Hoje tem mais probabilidade de irritação. Deseja ativar o modo "rotina mais leve"?',
      time: 'Agora',
      priority: 'medium'
    }
  ]);

  const quickActions = [
    {
      id: 'input',
      title: 'Gerenciar Dados',
      description: 'Adicionar medicações, terapias e padrões',
      icon: Calendar,
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30'
    },
    {
      id: 'sensory',
      title: 'Mapa Sensorial',
      description: 'Gatilhos e ambientes seguros',
      icon: Brain,
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'crisis',
      title: 'Modo de Crise',
      description: 'Técnicas e estratégias de emergência',
      icon: AlertTriangle,
      color: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-500/30'
    },
    {
      id: 'reports',
      title: 'Relatórios',
      description: 'Exportar dados para profissionais',
      icon: TrendingUp,
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'communication',
      title: 'Escola-Casa',
      description: 'Comunicação com a escola',
      icon: Activity,
      color: 'from-yellow-500/20 to-yellow-600/20',
      borderColor: 'border-yellow-500/30'
    }
  ];

  const todayStats = [
    { label: 'Medicações', value: '3/4', icon: Pill, color: 'text-[#00FF00]' },
    { label: 'Terapias', value: '1', icon: Heart, color: 'text-blue-400' },
    { label: 'Alertas', value: alerts.length.toString(), icon: Bell, color: 'text-yellow-400' },
    { label: 'Humor', value: 'Estável', icon: Zap, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-[#00FF00]/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-xs text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00FF00]" />
            Alertas Inteligentes
          </h2>
          <span className="text-xs text-white/50">{alerts.length} ativos</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white/5 border rounded-xl p-4 hover:bg-white/10 transition-all duration-300 ${
                alert.priority === 'high' 
                  ? 'border-red-500/30' 
                  : 'border-[#00FF00]/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm text-white/90 mb-1">{alert.message}</p>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>
                {alert.priority === 'high' && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#00FF00]" />
          Ações Rápidas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`bg-gradient-to-br ${action.color} backdrop-blur-sm border ${action.borderColor} rounded-2xl p-6 text-left hover:scale-105 transition-all duration-300 group`}
            >
              <action.icon className="w-8 h-8 text-[#00FF00] mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-base font-bold text-white mb-1">{action.title}</h3>
              <p className="text-xs text-white/60">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Schedule Preview */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#00FF00]" />
          Rotina de Hoje
        </h2>

        <div className="space-y-3">
          {[
            { time: '08:00', activity: 'Medicação matinal', type: 'medication' },
            { time: '09:00', activity: 'Escola', type: 'school' },
            { time: '15:00', activity: 'Terapia Ocupacional', type: 'therapy' },
            { time: '18:00', activity: 'Jantar (evitar estímulos fortes)', type: 'routine' },
            { time: '20:00', activity: 'Medicação noturna', type: 'medication' }
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors"
            >
              <div className="text-[#00FF00] font-mono text-sm font-bold min-w-[60px]">
                {item.time}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/90">{item.activity}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${
                item.type === 'medication' ? 'bg-blue-400' :
                item.type === 'therapy' ? 'bg-purple-400' :
                item.type === 'school' ? 'bg-yellow-400' :
                'bg-green-400'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
