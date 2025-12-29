'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { Search, Plus, FileText, Calendar, User, Trash2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface BehaviorEntry {
  id: string;
  date: string;
  behavior: string;
  notes: string;
  medicalReport?: string;
  doctorName?: string;
  consultationDate?: string;
}

export function BehaviorsTab() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = (key: keyof typeof import('@/lib/translations').translations.pt) => 
    getTranslation(language, key);

  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState<BehaviorEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [behavior, setBehavior] = useState('');
  const [notes, setNotes] = useState('');
  const [medicalReport, setMedicalReport] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [consultationDate, setConsultationDate] = useState('');

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
        .from('behavior_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedEntries: BehaviorEntry[] = (data || []).map(entry => ({
        id: entry.id,
        date: entry.date,
        behavior: entry.behavior,
        notes: entry.notes,
        medicalReport: entry.medical_report,
        doctorName: entry.doctor_name,
        consultationDate: entry.consultation_date,
      }));

      setEntries(formattedEntries);
    } catch (error) {
      console.error('Erro ao carregar comportamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async () => {
    if (!supabase) {
      toast({
        title: 'Configuração necessária',
        description: 'Configure o Supabase para salvar registros',
        variant: 'destructive',
      });
      return;
    }

    if (!behavior.trim()) {
      toast({
        title: 'Atenção',
        description: 'Por favor, descreva o comportamento',
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
        .from('behavior_entries')
        .insert([
          {
            user_id: user.id,
            date: new Date().toISOString(),
            behavior: behavior.trim(),
            notes: notes.trim(),
            medical_report: medicalReport.trim() || null,
            doctor_name: doctorName.trim() || null,
            consultation_date: consultationDate || null,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      const newEntry: BehaviorEntry = {
        id: data.id,
        date: data.date,
        behavior: data.behavior,
        notes: data.notes,
        medicalReport: data.medical_report,
        doctorName: data.doctor_name,
        consultationDate: data.consultation_date,
      };

      setEntries([newEntry, ...entries]);
      
      // Reset form
      setBehavior('');
      setNotes('');
      setMedicalReport('');
      setDoctorName('');
      setConsultationDate('');
      setShowForm(false);

      toast({
        title: 'Sucesso!',
        description: 'Comportamento registrado com sucesso',
      });
    } catch (error) {
      console.error('Erro ao salvar comportamento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o registro',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('behavior_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntries(entries.filter(entry => entry.id !== id));
      
      toast({
        title: 'Sucesso!',
        description: 'Registro excluído com sucesso',
      });
    } catch (error) {
      console.error('Erro ao excluir comportamento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o registro',
        variant: 'destructive',
      });
    }
  };

  const filteredEntries = entries.filter(entry =>
    entry.behavior.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              Para usar a biblioteca de comportamentos, você precisa configurar o Supabase.
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'pt' ? 'Biblioteca de Comportamentos' : language === 'en' ? 'Behavior Library' : 'Biblioteca de Comportamientos'}
        </h1>
        <p className="text-gray-600">
          {language === 'pt' ? 'Registre comportamentos, notas e informações médicas' : language === 'en' ? 'Record behaviors, notes and medical information' : 'Registre comportamientos, notas e información médica'}
        </p>
      </div>

      {/* Search and Add Button */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder={language === 'pt' ? 'Buscar registros...' : language === 'en' ? 'Search records...' : 'Buscar registros...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="h-12 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          {language === 'pt' ? 'Novo Registro' : language === 'en' ? 'New Record' : 'Nuevo Registro'}
        </Button>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <Card className="mb-8 border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-xl">
              {language === 'pt' ? 'Novo Registro de Comportamento' : language === 'en' ? 'New Behavior Record' : 'Nuevo Registro de Comportamiento'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Behavior Description */}
            <div>
              <Label htmlFor="behavior" className="text-base font-semibold mb-2 block">
                {language === 'pt' ? 'Comportamento Observado *' : language === 'en' ? 'Observed Behavior *' : 'Comportamiento Observado *'}
              </Label>
              <Input
                id="behavior"
                value={behavior}
                onChange={(e) => setBehavior(e.target.value)}
                placeholder={language === 'pt' ? 'Descreva o comportamento...' : language === 'en' ? 'Describe the behavior...' : 'Describa el comportamiento...'}
                className="h-12"
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-base font-semibold mb-2 block">
                {language === 'pt' ? 'Notas e Observações' : language === 'en' ? 'Notes and Observations' : 'Notas y Observaciones'}
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={language === 'pt' ? 'Adicione contexto, gatilhos, estratégias utilizadas...' : language === 'en' ? 'Add context, triggers, strategies used...' : 'Agregue contexto, desencadenantes, estrategias utilizadas...'}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Medical Information Section */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {language === 'pt' ? 'Informações Médicas (Opcional)' : language === 'en' ? 'Medical Information (Optional)' : 'Información Médica (Opcional)'}
              </h3>
              
              <div className="space-y-4">
                {/* Medical Report */}
                <div>
                  <Label htmlFor="medicalReport" className="text-sm font-medium mb-2 block">
                    {language === 'pt' ? 'Relatório Médico / Ficha Médica' : language === 'en' ? 'Medical Report / Medical Record' : 'Informe Médico / Ficha Médica'}
                  </Label>
                  <Textarea
                    id="medicalReport"
                    value={medicalReport}
                    onChange={(e) => setMedicalReport(e.target.value)}
                    placeholder={language === 'pt' ? 'Cole ou digite o relatório médico, diagnóstico, recomendações...' : language === 'en' ? 'Paste or type medical report, diagnosis, recommendations...' : 'Pegue o escriba el informe médico, diagnóstico, recomendaciones...'}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                {/* Doctor Name and Consultation Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doctorName" className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {language === 'pt' ? 'Nome do Médico' : language === 'en' ? 'Doctor Name' : 'Nombre del Médico'}
                    </Label>
                    <Input
                      id="doctorName"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      placeholder={language === 'pt' ? 'Dr(a)...' : language === 'en' ? 'Dr...' : 'Dr(a)...'}
                      className="h-11"
                    />
                  </div>

                  <div>
                    <Label htmlFor="consultationDate" className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {language === 'pt' ? 'Data da Consulta' : language === 'en' ? 'Consultation Date' : 'Fecha de Consulta'}
                    </Label>
                    <Input
                      id="consultationDate"
                      type="date"
                      value={consultationDate}
                      onChange={(e) => setConsultationDate(e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleAddEntry}
                disabled={!behavior.trim() || saving}
                className="flex-1 h-11 bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  language === 'pt' ? 'Salvar Registro' : language === 'en' ? 'Save Record' : 'Guardar Registro'
                )}
              </Button>
              <Button 
                onClick={() => setShowForm(false)}
                variant="outline"
                className="flex-1 h-11"
              >
                {language === 'pt' ? 'Cancelar' : language === 'en' ? 'Cancel' : 'Cancelar'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {language === 'pt' ? 'Nenhum registro encontrado' : language === 'en' ? 'No records found' : 'No se encontraron registros'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {language === 'pt' ? 'Clique em "Novo Registro" para começar' : language === 'en' ? 'Click "New Record" to start' : 'Haga clic en "Nuevo Registro" para comenzar'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-1">{entry.behavior}</CardTitle>
                    <CardDescription className="text-sm">
                      {formatDate(entry.date)}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Notes */}
                {entry.notes && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-1">
                      {language === 'pt' ? 'Observações:' : language === 'en' ? 'Observations:' : 'Observaciones:'}
                    </h4>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{entry.notes}</p>
                  </div>
                )}

                {/* Medical Information */}
                {(entry.medicalReport || entry.doctorName || entry.consultationDate) && (
                  <div className="border-t pt-4 mt-4 bg-blue-50/30 -mx-6 px-6 py-4">
                    <h4 className="font-semibold text-sm text-blue-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {language === 'pt' ? 'Informações Médicas' : language === 'en' ? 'Medical Information' : 'Información Médica'}
                    </h4>
                    
                    {entry.medicalReport && (
                      <div className="mb-3">
                        <p className="text-xs font-medium text-gray-600 mb-1">
                          {language === 'pt' ? 'Relatório:' : language === 'en' ? 'Report:' : 'Informe:'}
                        </p>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap bg-white p-3 rounded border">
                          {entry.medicalReport}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {entry.doctorName && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600">
                            <strong>{language === 'pt' ? 'Médico:' : language === 'en' ? 'Doctor:' : 'Médico:'}</strong> {entry.doctorName}
                          </span>
                        </div>
                      )}
                      {entry.consultationDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600">
                            <strong>{language === 'pt' ? 'Consulta:' : language === 'en' ? 'Consultation:' : 'Consulta:'}</strong>{' '}
                            {new Date(entry.consultationDate).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
