'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Smile, Meh, Frown, Zap, Flame, Plus, Calendar, TrendingUp } from 'lucide-react';
import { DiaryEntry } from '@/lib/types';

export default function DiarySection() {
  const { t } = useLanguage();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<DiaryEntry>>({
    date: new Date(),
    mood: 'neutral',
    meals: { breakfast: false, lunch: false, dinner: false, snacks: 0 },
    crisis: { occurred: false },
    notes: '',
  });

  const moods = [
    { value: 'happy', icon: Smile, color: 'text-green-600', label: t('happy') },
    { value: 'neutral', icon: Meh, color: 'text-gray-600', label: t('neutral') },
    { value: 'sad', icon: Frown, color: 'text-blue-600', label: t('sad') },
    { value: 'anxious', icon: Zap, color: 'text-yellow-600', label: t('anxious') },
    { value: 'angry', icon: Flame, color: 'text-red-600', label: t('angry') },
  ];

  const saveEntry = () => {
    const entry: DiaryEntry = {
      id: Date.now().toString(),
      userId: 'demo',
      date: newEntry.date || new Date(),
      mood: newEntry.mood || 'neutral',
      meals: newEntry.meals || { breakfast: false, lunch: false, dinner: false, snacks: 0 },
      crisis: newEntry.crisis || { occurred: false },
      notes: newEntry.notes || '',
    };
    setEntries([entry, ...entries]);
    setNewEntry({
      date: new Date(),
      mood: 'neutral',
      meals: { breakfast: false, lunch: false, dinner: false, snacks: 0 },
      crisis: { occurred: false },
      notes: '',
    });
    setShowForm(false);
  };

  const getMoodStats = () => {
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const crisisCount = entries.filter(e => e.crisis.occurred).length;
    const avgMeals = entries.reduce((sum, e) => {
      const mealCount = [e.meals.breakfast, e.meals.lunch, e.meals.dinner].filter(Boolean).length;
      return sum + mealCount;
    }, 0) / (entries.length || 1);

    return { moodCounts, crisisCount, avgMeals: avgMeals.toFixed(1) };
  };

  const stats = getMoodStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('diary')}</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">{t('trackDailyProgress')}</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('newEntry')}
        </Button>
      </div>

      {entries.length > 0 && (
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{t('evolutionPanel')}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">{t('totalEntries')}</p>
              <p className="text-3xl font-bold text-purple-600">{entries.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">{t('crisisEvents')}</p>
              <p className="text-3xl font-bold text-red-600">{stats.crisisCount}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600 mb-2">{t('avgMealsPerDay')}</p>
              <p className="text-3xl font-bold text-green-600">{stats.avgMeals}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {moods.map(mood => {
              const count = stats.moodCounts[mood.value] || 0;
              return count > 0 ? (
                <div key={mood.value} className="bg-white px-3 py-2 rounded-lg shadow flex items-center gap-2">
                  <mood.icon className={`w-5 h-5 ${mood.color}`} />
                  <span className="text-sm font-medium">{mood.label}: {count}</span>
                </div>
              ) : null;
            })}
          </div>
        </Card>
      )}

      {showForm && (
        <Card className="p-4 sm:p-6 bg-white shadow-lg border-2 border-green-200">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">{t('newEntry')}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">{t('selectMood')}</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {moods.map(mood => (
                  <button
                    key={mood.value}
                    onClick={() => setNewEntry({ ...newEntry, mood: mood.value as any })}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                      newEntry.mood === mood.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <mood.icon className={`w-8 h-8 ${mood.color}`} />
                    <span className="text-xs font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">{t('meals')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <Checkbox
                    checked={newEntry.meals?.breakfast}
                    onCheckedChange={(checked) =>
                      setNewEntry({
                        ...newEntry,
                        meals: { ...newEntry.meals!, breakfast: checked as boolean },
                      })
                    }
                  />
                  <span className="text-sm font-medium">🍳 {t('breakfast')}</span>
                </label>
                <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <Checkbox
                    checked={newEntry.meals?.lunch}
                    onCheckedChange={(checked) =>
                      setNewEntry({
                        ...newEntry,
                        meals: { ...newEntry.meals!, lunch: checked as boolean },
                      })
                    }
                  />
                  <span className="text-sm font-medium">🍽️ {t('lunch')}</span>
                </label>
                <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <Checkbox
                    checked={newEntry.meals?.dinner}
                    onCheckedChange={(checked) =>
                      setNewEntry({
                        ...newEntry,
                        meals: { ...newEntry.meals!, dinner: checked as boolean },
                      })
                    }
                  />
                  <span className="text-sm font-medium">🌙 {t('dinner')}</span>
                </label>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">🍪 {t('snacks')}:</span>
                  <Input
                    type="number"
                    min="0"
                    value={newEntry.meals?.snacks || 0}
                    onChange={(e) =>
                      setNewEntry({
                        ...newEntry,
                        meals: { ...newEntry.meals!, snacks: parseInt(e.target.value) || 0 },
                      })
                    }
                    className="w-20"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3 mb-3">
                <Checkbox
                  checked={newEntry.crisis?.occurred}
                  onCheckedChange={(checked) =>
                    setNewEntry({
                      ...newEntry,
                      crisis: { ...newEntry.crisis!, occurred: checked as boolean },
                    })
                  }
                />
                <span className="text-sm font-medium">{t('crisis')}</span>
              </label>

              {newEntry.crisis?.occurred && (
                <div className="space-y-3 ml-6 p-4 bg-red-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('crisisIntensity')}</label>
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={newEntry.crisis?.intensity || 5}
                      onChange={(e) =>
                        setNewEntry({
                          ...newEntry,
                          crisis: { ...newEntry.crisis!, intensity: parseInt(e.target.value) },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('crisisDuration')}</label>
                    <Input
                      type="number"
                      min="0"
                      value={newEntry.crisis?.duration || 0}
                      onChange={(e) =>
                        setNewEntry({
                          ...newEntry,
                          crisis: { ...newEntry.crisis!, duration: parseInt(e.target.value) },
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('notes')}</label>
              <Textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                placeholder={t('notes')}
                rows={4}
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button onClick={saveEntry} className="flex-1 bg-green-600 hover:bg-green-700">
                {t('saveEntry')}
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                {t('cancel')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {entries.map(entry => {
          const moodData = moods.find(m => m.value === entry.mood);
          const MoodIcon = moodData?.icon || Meh;
          
          return (
            <Card key={entry.id} className="p-4 sm:p-6 bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-gray-100 ${moodData?.color}`}>
                  <MoodIcon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{moodData?.label}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    {entry.crisis.occurred && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        {t('crisis')}: {entry.crisis.intensity}/10
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {entry.meals.breakfast && <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">🍳 {t('breakfast')}</span>}
                    {entry.meals.lunch && <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">🍽️ {t('lunch')}</span>}
                    {entry.meals.dinner && <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded">🌙 {t('dinner')}</span>}
                    {entry.meals.snacks > 0 && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">🍪 {entry.meals.snacks} {t('snacks')}</span>}
                  </div>

                  {entry.notes && (
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{entry.notes}</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {entries.length === 0 && !showForm && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{t('noDiaryEntries')}</p>
        </div>
      )}
    </div>
  );
}
