'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Plus, Trash2, Check, Calendar } from 'lucide-react';
import { Routine, RoutineStep } from '@/lib/types';

export default function RoutinesSection() {
  const { t } = useLanguage();
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: '1',
      userId: 'demo',
      title: t('breakfast'),
      description: t('routineDescription'),
      time: '08:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      isActive: true,
      createdAt: new Date(),
      steps: [
        { id: '1', title: t('wakeUp'), description: '', duration: 5, icon: '☀️', completed: false },
        { id: '2', title: t('brushTeeth'), description: '', duration: 5, icon: '🪥', completed: false },
        { id: '3', title: t('getDressed'), description: '', duration: 10, icon: '👕', completed: false },
        { id: '4', title: t('eatBreakfast'), description: '', duration: 20, icon: '🍳', completed: false },
      ],
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    title: '',
    description: '',
    time: '08:00',
    days: [] as string[],
    steps: [] as RoutineStep[],
  });

  const toggleStepComplete = (routineId: string, stepId: string) => {
    setRoutines(routines.map(routine => {
      if (routine.id === routineId) {
        return {
          ...routine,
          steps: routine.steps.map(step =>
            step.id === stepId ? { ...step, completed: !step.completed } : step
          ),
        };
      }
      return routine;
    }));
  };

  const addStep = () => {
    const newStep: RoutineStep = {
      id: Date.now().toString(),
      title: '',
      description: '',
      duration: 10,
      icon: '⭐',
      completed: false,
    };
    setNewRoutine({ ...newRoutine, steps: [...newRoutine.steps, newStep] });
  };

  const updateStep = (index: number, field: keyof RoutineStep, value: any) => {
    const updatedSteps = [...newRoutine.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setNewRoutine({ ...newRoutine, steps: updatedSteps });
  };

  const removeStep = (index: number) => {
    setNewRoutine({
      ...newRoutine,
      steps: newRoutine.steps.filter((_, i) => i !== index),
    });
  };

  const toggleDay = (day: string) => {
    if (newRoutine.days.includes(day)) {
      setNewRoutine({ ...newRoutine, days: newRoutine.days.filter(d => d !== day) });
    } else {
      setNewRoutine({ ...newRoutine, days: [...newRoutine.days, day] });
    }
  };

  const saveRoutine = () => {
    if (newRoutine.title && newRoutine.steps.length > 0) {
      const routine: Routine = {
        id: Date.now().toString(),
        userId: 'demo',
        title: newRoutine.title,
        description: newRoutine.description,
        time: newRoutine.time,
        days: newRoutine.days,
        steps: newRoutine.steps,
        isActive: true,
        createdAt: new Date(),
      };
      setRoutines([...routines, routine]);
      setNewRoutine({ title: '', description: '', time: '08:00', days: [], steps: [] });
      setShowCreateForm(false);
    }
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('routines')}</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">{t('myRoutines')}</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('createRoutine')}
        </Button>
      </div>

      {showCreateForm && (
        <Card className="p-4 sm:p-6 bg-white shadow-lg border-2 border-blue-200">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">{t('createRoutine')}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t('routineTitle')}</label>
              <Input
                value={newRoutine.title}
                onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
                placeholder={t('routineTitle')}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('routineDescription')}</label>
              <Input
                value={newRoutine.description}
                onChange={(e) => setNewRoutine({ ...newRoutine, description: e.target.value })}
                placeholder={t('routineDescription')}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('time')}</label>
                <Input
                  type="time"
                  value={newRoutine.time}
                  onChange={(e) => setNewRoutine({ ...newRoutine, time: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('selectDays')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {days.map(day => (
                  <label key={day} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={newRoutine.days.includes(day)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <span className="text-sm">{t(day)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium">{t('steps')}</label>
                <Button onClick={addStep} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  {t('addStep')}
                </Button>
              </div>

              <div className="space-y-3">
                {newRoutine.steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col sm:flex-row gap-2 p-3 bg-gray-50 rounded-lg">
                    <Input
                      placeholder={t('iconEmoji')}
                      value={step.icon}
                      onChange={(e) => updateStep(index, 'icon', e.target.value)}
                      className="w-16 text-center"
                    />
                    <Input
                      placeholder={t('stepTitle')}
                      value={step.title}
                      onChange={(e) => updateStep(index, 'title', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder={t('duration')}
                      value={step.duration}
                      onChange={(e) => updateStep(index, 'duration', parseInt(e.target.value))}
                      className="w-24"
                    />
                    <Button
                      onClick={() => removeStep(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button onClick={saveRoutine} className="flex-1 bg-green-600 hover:bg-green-700">
                {t('saveRoutine')}
              </Button>
              <Button onClick={() => setShowCreateForm(false)} variant="outline" className="flex-1">
                {t('cancel')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {routines.map(routine => (
          <Card key={routine.id} className="p-4 sm:p-6 bg-white shadow-md hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{routine.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{routine.time}</span>
                  <Calendar className="w-4 h-4 ml-2" />
                  <span>{routine.days.length} {t('daysSelected')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {routine.steps.map(step => (
                <div
                  key={step.id}
                  onClick={() => toggleStepComplete(routine.id, step.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    step.completed
                      ? 'bg-green-50 border-2 border-green-300'
                      : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl">{step.icon}</div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.duration} {t('minutes')}</p>
                  </div>
                  {step.completed && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
