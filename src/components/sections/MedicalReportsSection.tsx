'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FileText,
  Upload,
  Calendar,
  User,
  Stethoscope,
  Eye,
  Download,
  Printer,
  Plus,
  Filter,
} from 'lucide-react';
import { MedicalReport } from '@/lib/types';

export default function MedicalReportsSection() {
  const { t } = useLanguage();
  const [reports, setReports] = useState<MedicalReport[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [organizeBy, setOrganizeBy] = useState<'date' | 'doctor' | 'specialty'>('date');
  const [newReport, setNewReport] = useState({
    fileName: '',
    fileUrl: '',
    reportType: 'consultation' as const,
    date: new Date().toISOString().split('T')[0],
    doctorName: '',
    specialty: '',
    personalNotes: '',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewReport({ ...newReport, fileName: file.name });
      // In production, upload to storage and get URL
      const fakeUrl = URL.createObjectURL(file);
      setNewReport({ ...newReport, fileUrl: fakeUrl, fileName: file.name });
    }
  };

  const handleAddReport = () => {
    const report: MedicalReport = {
      id: Date.now().toString(),
      userId: 'user-1',
      fileName: newReport.fileName,
      fileUrl: newReport.fileUrl,
      reportType: newReport.reportType,
      date: new Date(newReport.date),
      doctorName: newReport.doctorName,
      specialty: newReport.specialty,
      personalNotes: newReport.personalNotes,
      createdAt: new Date(),
    };

    setReports([...reports, report]);
    setIsDialogOpen(false);
    setNewReport({
      fileName: '',
      fileUrl: '',
      reportType: 'consultation',
      date: new Date().toISOString().split('T')[0],
      doctorName: '',
      specialty: '',
      personalNotes: '',
    });
  };

  const sortedReports = [...reports].sort((a, b) => {
    if (organizeBy === 'date') {
      return b.date.getTime() - a.date.getTime();
    } else if (organizeBy === 'doctor') {
      return a.doctorName.localeCompare(b.doctorName);
    } else {
      return a.specialty.localeCompare(b.specialty);
    }
  });

  const getReportTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      consultation: t('medicalConsultation'),
      exam: t('examReport'),
      prescription: t('prescription'),
      other: t('otherReport'),
    };
    return labels[type] || type;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('medicalReports')}</h2>
          <p className="text-gray-600 mt-1">
            {t('organizeAccessReports')}
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 gap-2">
              <Plus className="w-4 h-4" />
              {t('addReport')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('addReport')}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">{t('uploadReport')}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="flex-1"
                  />
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
                {newReport.fileName && (
                  <p className="text-sm text-green-600">✓ {newReport.fileName}</p>
                )}
              </div>

              {/* Report Type */}
              <div className="space-y-2">
                <Label>{t('reportType')}</Label>
                <Select
                  value={newReport.reportType}
                  onValueChange={(value: any) =>
                    setNewReport({ ...newReport, reportType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">{t('medicalConsultation')}</SelectItem>
                    <SelectItem value="exam">{t('examReport')}</SelectItem>
                    <SelectItem value="prescription">{t('prescription')}</SelectItem>
                    <SelectItem value="other">{t('otherReport')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date">{t('reportDate')}</Label>
                <Input
                  id="date"
                  type="date"
                  value={newReport.date}
                  onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                />
              </div>

              {/* Doctor Name */}
              <div className="space-y-2">
                <Label htmlFor="doctor">{t('doctorName')}</Label>
                <Input
                  id="doctor"
                  value={newReport.doctorName}
                  onChange={(e) => setNewReport({ ...newReport, doctorName: e.target.value })}
                  placeholder="Dr. João Silva"
                />
              </div>

              {/* Specialty */}
              <div className="space-y-2">
                <Label htmlFor="specialty">{t('specialty')}</Label>
                <Input
                  id="specialty"
                  value={newReport.specialty}
                  onChange={(e) => setNewReport({ ...newReport, specialty: e.target.value })}
                  placeholder="Neurologia, Psiquiatria, etc."
                />
              </div>

              {/* Personal Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">{t('personalNotes')}</Label>
                <Textarea
                  id="notes"
                  value={newReport.personalNotes}
                  onChange={(e) => setNewReport({ ...newReport, personalNotes: e.target.value })}
                  placeholder={t('personalNotes')}
                  rows={4}
                />
              </div>

              <Button
                onClick={handleAddReport}
                disabled={!newReport.fileName || !newReport.doctorName}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
              >
                {t('save')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Organize By */}
      <Card className="p-4 bg-white">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <Label className="text-sm font-medium">{t('organizeBy')}:</Label>
          <Select
            value={organizeBy}
            onValueChange={(value: any) => setOrganizeBy(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">{t('byDate')}</SelectItem>
              <SelectItem value="doctor">{t('byDoctor')}</SelectItem>
              <SelectItem value="specialty">{t('bySpecialty')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Reports List */}
      {reports.length === 0 ? (
        <Card className="p-12 text-center bg-gradient-to-br from-blue-50 to-purple-50">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noReports')}</h3>
          <p className="text-gray-600 mb-6">{t('addFirstReport')}</p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('addReport')}
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sortedReports.map((report) => (
            <Card
              key={report.id}
              className="p-6 hover:shadow-xl transition-all duration-300 bg-white border-2 border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{report.fileName}</h4>
                    <p className="text-sm text-gray-600">{getReportTypeLabel(report.reportType)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{report.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="w-4 h-4 text-purple-600" />
                  <span>{report.doctorName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Stethoscope className="w-4 h-4 text-pink-600" />
                  <span>{report.specialty}</span>
                </div>
              </div>

              {report.personalNotes && (
                <div className="p-3 bg-gray-50 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">{report.personalNotes}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => window.open(report.fileUrl, '_blank')}
                >
                  <Eye className="w-4 h-4" />
                  {t('viewPDF')}
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {t('exportReport')}
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Printer className="w-4 h-4" />
                  {t('printReport')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
