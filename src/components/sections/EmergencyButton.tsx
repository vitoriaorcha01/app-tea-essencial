'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertCircle,
  Phone,
  MapPin,
  Heart,
  Shield,
  Ambulance,
  Brain,
} from 'lucide-react';
import { EmergencyContact } from '@/lib/types';

interface EmergencyButtonProps {
  className?: string;
}

export default function EmergencyButton({ className = '' }: EmergencyButtonProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [emergencyData, setEmergencyData] = useState<EmergencyContact | null>(null);

  // Emergency numbers by country
  const emergencyNumbers: Record<string, EmergencyContact> = {
    BR: {
      country: 'Brasil',
      countryCode: 'BR',
      medicalEmergency: '192',
      psychologicalSupport: '188',
      police: '190',
      ambulance: '192',
    },
    US: {
      country: 'United States',
      countryCode: 'US',
      medicalEmergency: '911',
      psychologicalSupport: '988',
      police: '911',
      ambulance: '911',
    },
    ES: {
      country: 'España',
      countryCode: 'ES',
      medicalEmergency: '112',
      psychologicalSupport: '024',
      police: '112',
      ambulance: '112',
    },
    FR: {
      country: 'France',
      countryCode: 'FR',
      medicalEmergency: '15',
      psychologicalSupport: '3114',
      police: '17',
      ambulance: '15',
    },
    NL: {
      country: 'Netherlands',
      countryCode: 'NL',
      medicalEmergency: '112',
      psychologicalSupport: '113',
      police: '112',
      ambulance: '112',
    },
  };

  useEffect(() => {
    if (isOpen && !emergencyData) {
      detectLocation();
    }
  }, [isOpen]);

  const detectLocation = async () => {
    setIsDetecting(true);
    
    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // In production, use reverse geocoding API
            // For now, default to Brazil
            const countryCode = 'BR';
            setEmergencyData(emergencyNumbers[countryCode]);
            setLocation(emergencyNumbers[countryCode].country);
          } catch (error) {
            setEmergencyData(emergencyNumbers.BR);
            setLocation('Brasil');
          }
          setIsDetecting(false);
        },
        () => {
          // Default to Brazil if location denied
          setEmergencyData(emergencyNumbers.BR);
          setLocation('Brasil');
          setIsDetecting(false);
        }
      );
    } else {
      setEmergencyData(emergencyNumbers.BR);
      setLocation('Brasil');
      setIsDetecting(false);
    }
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2 ${className}`}
        size="lg"
      >
        <AlertCircle className="w-5 h-5 animate-pulse" />
        {t('emergency')}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              {t('emergencyNumbers')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Location */}
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="flex items-center gap-2 text-blue-900">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">{t('yourLocation')}:</span>
                {isDetecting ? (
                  <span className="text-sm">{t('detectingLocation')}</span>
                ) : (
                  <span className="text-sm">{location}</span>
                )}
              </div>
            </div>

            {/* Emergency Numbers */}
            {emergencyData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Medical Emergency */}
                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('medicalEmergency')}</h4>
                      <p className="text-2xl font-bold text-red-600">{emergencyData.medicalEmergency}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(emergencyData.medicalEmergency)}
                    className="w-full bg-red-600 hover:bg-red-700 gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {t('callNow')}
                  </Button>
                </div>

                {/* Psychological Support */}
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('psychologicalSupport')}</h4>
                      <p className="text-2xl font-bold text-purple-600">{emergencyData.psychologicalSupport}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(emergencyData.psychologicalSupport)}
                    className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {t('callNow')}
                  </Button>
                </div>

                {/* Police */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('police')}</h4>
                      <p className="text-2xl font-bold text-blue-600">{emergencyData.police}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(emergencyData.police)}
                    className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {t('callNow')}
                  </Button>
                </div>

                {/* Ambulance */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                      <Ambulance className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('ambulance')}</h4>
                      <p className="text-2xl font-bold text-green-600">{emergencyData.ambulance}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(emergencyData.ambulance)}
                    className="w-full bg-green-600 hover:bg-green-700 gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {t('callNow')}
                  </Button>
                </div>
              </div>
            )}

            {/* Emergency Instructions */}
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                {t('emergencyInstructions')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <p className="text-gray-700 pt-1">{t('instruction1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <p className="text-gray-700 pt-1">{t('instruction2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <p className="text-gray-700 pt-1">{t('instruction3')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <p className="text-gray-700 pt-1">{t('instruction4')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    5
                  </div>
                  <p className="text-gray-700 pt-1">{t('instruction5')}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
