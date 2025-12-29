'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { ChatMessage } from '@/lib/types';
import { Send, Bot, User, Heart, Lightbulb, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export function AssistantTab() {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/translations').translations.pt) => 
    getTranslation(language, key);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'pt' 
        ? 'Olá! Sou o Assistente TEO, seu assistente virtual. Estou aqui para oferecer suporte emocional e soluções práticas. Como posso ajudar você hoje?'
        : language === 'en'
        ? 'Hello! I am TEO Assistant, your virtual assistant. I am here to offer emotional support and practical solutions. How can I help you today?'
        : '¡Hola! Soy el Asistente TEO, tu asistente virtual. Estoy aquí para ofrecer apoyo emocional y soluciones prácticas. ¿Cómo puedo ayudarte hoy?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = [
    {
      icon: Heart,
      text: language === 'pt' ? 'Estou me sentindo sobrecarregado(a)' : language === 'en' ? 'I am feeling overwhelmed' : 'Me siento abrumado(a)',
    },
    {
      icon: Lightbulb,
      text: language === 'pt' ? 'Como lidar com birras?' : language === 'en' ? 'How to deal with tantrums?' : '¿Cómo lidiar con berrinches?',
    },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simular resposta da IA
    setTimeout(() => {
      const responses = {
        pt: [
          'Entendo como você está se sentindo. É completamente normal se sentir sobrecarregado às vezes. Lembre-se de que você está fazendo um trabalho incrível.',
          'Essa é uma ótima pergunta. Aqui estão algumas estratégias que podem ajudar: 1) Mantenha a calma, 2) Valide os sentimentos da criança, 3) Ofereça um espaço seguro.',
          'Estou aqui para apoiar você. Cada criança é única, e encontrar o que funciona melhor pode levar tempo. Seja paciente consigo mesmo.',
        ],
        en: [
          'I understand how you are feeling. It is completely normal to feel overwhelmed sometimes. Remember that you are doing an amazing job.',
          'That is a great question. Here are some strategies that can help: 1) Stay calm, 2) Validate the child\'s feelings, 3) Offer a safe space.',
          'I am here to support you. Every child is unique, and finding what works best can take time. Be patient with yourself.',
        ],
        es: [
          'Entiendo cómo te sientes. Es completamente normal sentirse abrumado a veces. Recuerda que estás haciendo un trabajo increíble.',
          'Esa es una gran pregunta. Aquí hay algunas estrategias que pueden ayudar: 1) Mantén la calma, 2) Valida los sentimientos del niño, 3) Ofrece un espacio seguro.',
          'Estoy aquí para apoyarte. Cada niño es único, y encontrar lo que funciona mejor puede llevar tiempo. Sé paciente contigo mismo.',
        ],
      };

      const randomResponse = responses[language][Math.floor(Math.random() * responses[language].length)];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickResponse = (text: string) => {
    setInput(text);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t('assistantTitle')}</h1>
        <p className="text-gray-600 mt-2">Suporte emocional e soluções práticas com IA</p>
      </div>

      {/* Assistente de Rotina Inteligente - Destaque */}
      <Link href="/assistente">
        <div className="mb-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 text-white hover:scale-[1.02] transition-transform cursor-pointer shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <Brain className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold">Assistente de Rotina Inteligente</h3>
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <p className="text-sm text-white/90">
                Organize automaticamente a rotina da criança com alertas inteligentes, mapa sensorial, modo de crise e muito mais!
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium">
            <span>Acessar Assistente</span>
            <span className="text-xl">→</span>
          </div>
        </div>
      </Link>

      {/* Quick Responses */}
      <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
        {quickResponses.map((response, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleQuickResponse(response.text)}
            className="gap-2 whitespace-nowrap flex-shrink-0"
          >
            <response.icon className="w-4 h-4" />
            {response.text}
          </Button>
        ))}
      </div>

      {/* Messages */}
      <Card className="flex-1 mb-4 overflow-hidden flex flex-col">
        <CardContent className="p-4 flex-1 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant' 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                  : 'bg-gray-300'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-gray-700" />
                )}
              </div>
              <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`inline-block p-4 rounded-2xl max-w-[85%] ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                }`}>
                  <p className="text-sm sm:text-base whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'assistant' ? 'text-gray-500' : 'text-blue-100'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString(language, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 p-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input */}
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={t('askQuestion')}
          className="resize-none"
          rows={2}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="h-auto px-6"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
