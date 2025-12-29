'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { Routine } from '@/lib/types';
import { Plus, Clock, Trash, Edit, Star, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function RoutinesTab() {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/translations').translations.pt) => 
    getTranslation(language, key);

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    name: '',
    time: '',
    description: '',
  });

  const suggestedRoutines = [
    {
      name: language === 'pt' ? 'Rotina Matinal' : language === 'en' ? 'Morning Routine' : 'Rutina Matutina',
      time: '07:00',
      description: language === 'pt' ? 'Acordar, café da manhã, higiene' : language === 'en' ? 'Wake up, breakfast, hygiene' : 'Despertar, desayuno, higiene',
    },
    {
      name: language === 'pt' ? 'Hora do Almoço' : language === 'en' ? 'Lunch Time' : 'Hora del Almuerzo',
      time: '12:00',
      description: language === 'pt' ? 'Almoço e descanso' : language === 'en' ? 'Lunch and rest' : 'Almuerzo y descanso',
    },
    {
      name: language === 'pt' ? 'Rotina Noturna' : language === 'en' ? 'Night Routine' : 'Rutina Nocturna',
      time: '20:00',
      description: language === 'pt' ? 'Jantar, banho, preparar para dormir' : language === 'en' ? 'Dinner, bath, prepare for sleep' : 'Cena, baño, preparar para dormir',
    },
  ];

  const handleCreateRoutine = () => {
    if (newRoutine.name && newRoutine.time) {
      const routine: Routine = {
        id: Date.now().toString(),
        name: newRoutine.name,
        time: newRoutine.time,
        description: newRoutine.description,
        activities: [],
        createdAt: new Date(),
      };
      setRoutines([...routines, routine]);
      setNewRoutine({ name: '', time: '', description: '' });
      setIsDialogOpen(false);
    }
  };

  const handleAddSuggested = (suggested: typeof suggestedRoutines[0]) => {
    const routine: Routine = {
      id: Date.now().toString(),
      name: suggested.name,
      time: suggested.time,
      description: suggested.description,
      activities: [],
      createdAt: new Date(),
    };
    setRoutines([...routines, routine]);
  };

  const handleDeleteRoutine = (id: string) => {
    setRoutines(routines.filter(r => r.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('routinesTitle')}</h1>
          <p className="text-gray-600 mt-2">Crie e gerencie rotinas personalizadas</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t('createRoutine')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('createRoutine')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('routineName')}</Label>
                <Input
                  id="name"
                  value={newRoutine.name}
                  onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                  placeholder={t('routineName')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">{t('routineTime')}</Label>
                <Input
                  id="time"
                  type="time"
                  value={newRoutine.time}
                  onChange={(e) => setNewRoutine({ ...newRoutine, time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t('routineDescription')}</Label>
                <Textarea
                  id="description"
                  value={newRoutine.description}
                  onChange={(e) => setNewRoutine({ ...newRoutine, description: e.target.value })}
                  placeholder={t('routineDescription')}
                  rows={3}
                />
              </div>
              <Button onClick={handleCreateRoutine} className="w-full">
                {t('save')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sugestões */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">{t('suggestedRoutines')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suggestedRoutines.map((suggested, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{suggested.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {suggested.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{suggested.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSuggested(suggested)}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Minhas Rotinas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('myRoutines')}</h2>
        {routines.length === 0 ? (
          <Card className="bg-gray-50">
            <CardContent className="py-12 text-center">
              <CalendarDays className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">{t('noData')}</p>
              <p className="text-sm text-gray-500 mt-2">
                Crie sua primeira rotina ou adicione uma sugerida
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routines.map((routine) => (
              <Card key={routine.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{routine.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4" />
                        {routine.time}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteRoutine(routine.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{routine.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
