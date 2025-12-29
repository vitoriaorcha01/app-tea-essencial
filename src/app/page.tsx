'use client';

import { useState } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navigation } from '@/components/custom/Navigation';
import { HomeTab } from '@/components/custom/HomeTab';
import { RoutinesTab } from '@/components/custom/RoutinesTab';
import { BehaviorsTab } from '@/components/custom/BehaviorsTab';
import { DiaryTab } from '@/components/custom/DiaryTab';
import { AssistantTab } from '@/components/custom/AssistantTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab setActiveTab={setActiveTab} />;
      case 'routines':
        return <RoutinesTab />;
      case 'behaviors':
        return <BehaviorsTab />;
      case 'diary':
        return <DiaryTab />;
      case 'assistant':
        return <AssistantTab />;
      default:
        return <HomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>{renderTab()}</main>
      </div>
    </LanguageProvider>
  );
}
