'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { Calendar, BookOpen, FileText, MessageCircle, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export function HomeTab({ setActiveTab }: HomeTabProps) {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/translations').translations.pt) => 
    getTranslation(language, key);

  const features = [
    {
      id: 'routines',
      icon: Calendar,
      title: t('routinesTitle'),
      description: 'Crie rotinas personalizadas com sugestões inteligentes',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'behaviors',
      icon: BookOpen,
      title: t('behaviorsTitle'),
      description: 'Biblioteca completa com causas e estratégias',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'diary',
      icon: FileText,
      title: t('diaryTitle'),
      description: 'Registre e acompanhe a evolução diária',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'assistant',
      icon: MessageCircle,
      title: t('assistantTitle'),
      description: 'Suporte emocional e soluções práticas com IA',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {t('welcome')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('welcomeSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-gray-300"
            onClick={() => setActiveTab(feature.id)}
          >
            <CardHeader>
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-2xl">{feature.title}</CardTitle>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Como funciona?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              1
            </div>
            <p className="text-gray-700">Escolha uma funcionalidade</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              2
            </div>
            <p className="text-gray-700">Personalize conforme sua necessidade</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              3
            </div>
            <p className="text-gray-700">Acompanhe a evolução</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
              4
            </div>
            <p className="text-gray-700">Conte com suporte da IA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
