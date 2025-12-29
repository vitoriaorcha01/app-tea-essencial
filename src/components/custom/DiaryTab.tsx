'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { DiaryEntry } from '@/lib/types';
import { Plus, Smile, Meh, Frown, Angry, Calendar, FileText, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export function DiaryTab() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = (key: keyof typeof import('@/lib/translations').translations.pt) => 
    getTranslation(language, key);

  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<DiaryEntry>>({
    mood: 'neutral',
    food: [],
    crisis: false,
    notes: '',
  });

  const moods = [
    { value: 'happy', icon: Smile, label: language === 'pt' ? 'Feliz' : language === 'en' ? 'Happy' : 'Feliz', color: 'text-green-600' },
    { value: 'neutral', icon: Meh, label: language === 'pt' ? 'Neutro' : language === 'en' ? 'Neutral' : 'Neutral', color: 'text-blue-600' },
    { value: 'sad', icon: Frown, label: language === 'pt' ? 'Triste' : language === 'en' ? 'Sad' : 'Triste', color: 'text-yellow-600' },
    { value: 'angry', icon: Angry, label: language === 'pt' ? 'Irritado' : language === 'en' ? 'Angry' : 'Enojado', color: 'text-red-600' },
  ];

  // Carregar entradas do banco de dados
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedEntries: DiaryEntry[] = (data || []).map(entry => ({
        id: entry.id,
        date: new Date(entry.date),
        mood: entry.mood as DiaryEntry['mood'],
        food: entry.food || [],
        crisis: entry.crisis,
        crisisDetails: entry.crisis_details,
        notes: entry.notes,
      }));

      setEntries(formattedEntries);
    } catch (error) {
      console.error('Erro ao carregar entradas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntry = async () => {
    if (!supabase) {
      toast({
        title: 'Configuração necessária',
        description: 'Configure o Supabase para salvar registros',
        variant: 'destructive',
      });
      return;
    }

    if (!newEntry.notes) {
      toast({
        title: 'Atenção',
        description: 'Por favor, adicione suas notas',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Erro',
          description: 'Você precisa estar autenticado',
          variant: 'destructive',
        });
        return;
      }

      const { data, error } = await supabase
        .from('diary_entries')
        .insert([
          {
            user_id: user.id,
            date: new Date().toISOString(),
            mood: newEntry.mood,
            food: newEntry.food || [],
            crisis: newEntry.crisis || false,
            crisis_details: newEntry.crisisDetails,
            notes: newEntry.notes,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const formattedEntry: DiaryEntry = {
        id: data.id,
        date: new Date(data.date),
        mood: data.mood as DiaryEntry['mood'],
        food: data.food || [],
        crisis: data.crisis,
        crisisDetails: data.crisis_details,
        notes: data.notes,
      };

      setEntries([formattedEntry, ...entries]);
      setNewEntry({ mood: 'neutral', food: [], crisis: false, notes: '' });
      setIsDialogOpen(false);

      toast({
        title: 'Sucesso!',
        description: 'Registro salvo com sucesso',
      });
    } catch (error) {
      console.error('Erro ao salvar entrada:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o registro',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getMoodIcon = (mood: DiaryEntry['mood']) => {
    const moodData = moods.find(m => m.value === mood);
    if (!moodData) return null;
    const Icon = moodData.icon;
    return <Icon className={`w-6 h-6 ${moodData.color}`} />;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="py-8 text-center">
            <FileText className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Configuração do Supabase necessária
            </h3>
            <p className="text-gray-600 mb-4">
              Para usar o diário, você precisa configurar o Supabase nas variáveis de ambiente.
            </p>
            <p className="text-sm text-gray-500">
              Clique no banner laranja acima para configurar.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('diaryTitle')}</h1>
          <p className="text-gray-600 mt-2">Registre e acompanhe a evolução diária</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t('addEntry')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('addEntry')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <Label>{t('mood')}</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setNewEntry({ ...newEntry, mood: mood.value as DiaryEntry['mood'] })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        newEntry.mood === mood.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <mood.icon className={`w-8 h-8 ${mood.color}`} />
                      <span className="text-sm font-medium">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t('crisis')}</Label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewEntry({ ...newEntry, crisis: false })}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                      !newEntry.crisis
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {language === 'pt' ? 'Não' : language === 'en' ? 'No' : 'No'}
                  </button>
                  <button
                    onClick={() => setNewEntry({ ...newEntry, crisis: true })}
                    className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                      newEntry.crisis
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {language === 'pt' ? 'Sim' : language === 'en' ? 'Yes' : 'Sí'}
                  </button>
                </div>
              </div>

              {newEntry.crisis && (
                <div className="space-y-2">
                  <Label>Detalhes da crise</Label>
                  <Textarea
                    value={newEntry.crisisDetails || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, crisisDetails: e.target.value })}
                    placeholder="Descreva o que aconteceu..."
                    rows={3}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>{t('notes')}</Label>
                <Textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  placeholder={t('notes')}
                  rows={4}
                />
              </div>

              <Button onClick={handleCreateEntry} className="w-full" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  t('save')
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Painel de Evolução */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Registros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{entries.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Crises este mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {entries.filter(e => e.crisis).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Humor predominante</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {getMoodIcon('happy')}
              <span className="text-lg font-semibold">Feliz</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Registros */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Registros Recentes</h2>
        {entries.length === 0 ? (
          <Card className="bg-gray-50">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{t('noData')}</p>
              <p className="text-sm text-gray-500 mt-2">
                Comece a registrar a evolução diária
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {getMoodIcon(entry.mood)}
                      <div>
                        <CardTitle className="text-lg">
                          {new Date(entry.date).toLocaleDateString(language)}
                        </CardTitle>
                        <CardDescription>
                          {new Date(entry.date).toLocaleTimeString(language, { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    {entry.crisis && (
                      <Badge variant="destructive">Crise</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{entry.notes}</p>
                  {entry.crisisDetails && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                      <p className="text-sm text-red-800">{entry.crisisDetails}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
