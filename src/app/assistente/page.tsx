'use client';

import { useState } from 'react';
import { ArrowLeft, Brain, Bell, AlertCircle, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { DashboardView } from './components/DashboardView';
import { DataInputView } from './components/DataInputView';
import { SensoryMapView } from './components/SensoryMapView';
import { CrisisMode } from './components/CrisisMode';
import { ReportsView } from './components/ReportsView';
import { SchoolCommunicationView } from './components/SchoolCommunicationView';

type ViewType = 'dashboard' | 'input' | 'sensory' | 'crisis' | 'reports' | 'communication';

export default function AssistenteInteligente() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView onNavigate={setCurrentView} />;
      case 'input':
        return <DataInputView onBack={() => setCurrentView('dashboard')} />;
      case 'sensory':
        return <SensoryMapView onBack={() => setCurrentView('dashboard')} />;
      case 'crisis':
        return <CrisisMode onBack={() => setCurrentView('dashboard')} />;
      case 'reports':
        return <ReportsView onBack={() => setCurrentView('dashboard')} />;
      case 'communication':
        return <SchoolCommunicationView onBack={() => setCurrentView('dashboard')} />;
      default:
        return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#00FF00]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-[#00FF00] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Voltar</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-[#00FF00]" />
              <div>
                <h1 className="text-2xl font-semibold">Assistente TEA</h1>
                <p className="text-xs text-white/50">Inteligente e Personalizado</p>
              </div>
            </div>

            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderView()}
      </main>
    </div>
  );
}
