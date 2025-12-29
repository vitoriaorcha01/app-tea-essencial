'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, AlertCircle, Lightbulb, Shield, Hand, Clock, AlertTriangle } from 'lucide-react';
import { Behavior, TherapeuticMassage } from '@/lib/types';

export default function BehaviorsSection() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const behaviors: Behavior[] = [
    {
      id: '1',
      phrase: t('repetitiveHandMovements'),
      category: t('stimmingCategory'),
      causes: [
        t('selfRegulation'),
        t('excitementOrAnxiety'),
        t('processingSensory'),
      ],
      preventions: [
        t('provideAlternativeSensory'),
        t('createCalmEnvironment'),
        t('establishPredictableRoutines'),
      ],
      solutions: [
        t('offerFidgetToys'),
        t('teachReplacementBehaviors'),
        t('useVisualSchedules'),
      ],
      practicalTips: [
        t('keepSensoryToysAccessible'),
        t('createSensoryCorner'),
        t('useWeightedBlankets'),
      ],
      duringCrisis: [
        t('stayCalm'),
        t('removeOverwhelmingStimuli'),
        t('offerDeepPressure'),
      ],
      language: 'en',
    },
    {
      id: '2',
      phrase: t('difficultyWithTransitions'),
      category: t('transitionsCategory'),
      causes: [
        t('needForPredictability'),
        t('difficultyProcessingChange'),
        t('anxietyAboutUnknown'),
      ],
      preventions: [
        t('useVisualTimers'),
        t('provideAdvanceWarnings'),
        t('createTransitionRoutines'),
      ],
      solutions: [
        t('useVisualSchedules'),
        t('giveFiveMinuteWarnings'),
        t('offerTransitionObjects'),
      ],
      practicalTips: [
        t('useTimerApp'),
        t('createTransitionSong'),
        t('prepareChildNightBefore'),
      ],
      duringCrisis: [
        t('acknowledgeFeelings'),
        t('offerChoicesWhenPossible'),
        t('useCalmingBreathing'),
      ],
      language: 'en',
    },
    {
      id: '3',
      phrase: t('sensoryOverloadReactions'),
      category: t('sensoryCategory'),
      causes: [
        t('tooMuchSensoryInput'),
        t('loudNoisesOrBrightLights'),
        t('crowdedOrChaoticEnvironments'),
      ],
      preventions: [
        t('identifyAndAvoidTriggers'),
        t('createQuietSpaces'),
        t('useNoiseCancelingHeadphones'),
      ],
      solutions: [
        t('removeFromOverwhelmingEnvironment'),
        t('provideSensoryBreaks'),
        t('useCalmingTechniques'),
      ],
      practicalTips: [
        t('carrySensoryEmergencyKit'),
        t('planVisitsDuringQuietHours'),
        t('useSunglassesForLightSensitivity'),
      ],
      duringCrisis: [
        t('moveToQuietSpace'),
        t('reduceVerbalCommunication'),
        t('allowTimeToSelfRegulate'),
      ],
      language: 'en',
    },
    {
      id: '4',
      phrase: t('communicationFrustration'),
      category: t('communicationCategory'),
      causes: [
        t('difficultyExpressingNeeds'),
        t('notBeingUnderstood'),
        t('limitedVerbalSkills'),
      ],
      preventions: [
        t('useVisualCommunicationAids'),
        t('teachAlternativeCommunication'),
        t('bePatientAndAttentive'),
      ],
      solutions: [
        t('usePictureCardsOrAAC'),
        t('validateTheirFeelings'),
        t('simplifyLanguage'),
      ],
      practicalTips: [
        t('createCommunicationBoard'),
        t('useAppsLikeProloquo'),
        t('learnBasicSignLanguage'),
      ],
      duringCrisis: [
        t('stayPatientAndCalm'),
        t('offerVisualChoices'),
        t('validateEmotionsWithoutPressure'),
      ],
      language: 'en',
    },
  ];

  const therapeuticMassages: TherapeuticMassage[] = [
    {
      id: '1',
      name: t('deepPressureMassage'),
      objective: t('calmingSensoryOverload'),
      steps: [
        t('massageStep1DeepPressure'),
        t('massageStep2DeepPressure'),
        t('massageStep3DeepPressure'),
        t('massageStep4DeepPressure'),
        t('massageStep5DeepPressure'),
      ],
      duration: t('fiveToTenMinutes'),
      importantCare: [
        t('alwaysAskPermission'),
        t('watchForDiscomfort'),
        t('neverForceIfResists'),
        t('adjustPressureBasedOnFeedback'),
      ],
      language: 'en',
    },
    {
      id: '2',
      name: t('handAndFingerMassage'),
      objective: t('reducingHandFlapping'),
      steps: [
        t('massageStep1HandFinger'),
        t('massageStep2HandFinger'),
        t('massageStep3HandFinger'),
        t('massageStep4HandFinger'),
        t('massageStep5HandFinger'),
      ],
      duration: t('threeToFiveMinutesPerHand'),
      importantCare: [
        t('useGentleConsistentPressure'),
        t('stopIfDiscomfort'),
        t('canBeDoneDuringCalmMoments'),
        t('useUnscentedLotion'),
      ],
      language: 'en',
    },
    {
      id: '3',
      name: t('footReflexology'),
      objective: t('promotingRelaxationAndSleep'),
      steps: [
        t('massageStep1FootReflexology'),
        t('massageStep2FootReflexology'),
        t('massageStep3FootReflexology'),
        t('massageStep4FootReflexology'),
        t('massageStep5FootReflexology'),
        t('massageStep6FootReflexology'),
      ],
      duration: t('fiveToSevenMinutesPerFoot'),
      importantCare: [
        t('ensureChildIsComfortable'),
        t('useWarmHandsOrLotion'),
        t('bestDoneBeforeBedtime'),
        t('watchForTicklishReactions'),
      ],
      language: 'en',
    },
    {
      id: '4',
      name: t('scalpAndHeadMassage'),
      objective: t('relievingTensionAndCalming'),
      steps: [
        t('massageStep1ScalpHead'),
        t('massageStep2ScalpHead'),
        t('massageStep3ScalpHead'),
        t('massageStep4ScalpHead'),
        t('massageStep5ScalpHead'),
      ],
      duration: t('threeToFiveMinutes'),
      importantCare: [
        t('beVeryGentleScalpSensitive'),
        t('avoidIfSensoryAversion'),
        t('canBeDoneDuringHairBrushing'),
        t('stopIfDiscomfort'),
      ],
      language: 'en',
    },
  ];

  const categories = ['all', t('stimmingCategory'), t('transitionsCategory'), t('sensoryCategory'), t('communicationCategory')];

  const filteredBehaviors = behaviors.filter(behavior => {
    const matchesSearch = behavior.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         behavior.causes.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || behavior.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('behaviors')}</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">{t('understandBehaviors')}</p>
      </div>

      <Tabs defaultValue="behaviors" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="behaviors">{t('behaviors')}</TabsTrigger>
          <TabsTrigger value="massages">{t('therapeuticMassages')}</TabsTrigger>
        </TabsList>

        <TabsContent value="behaviors" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('searchBehaviors')}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  selectedCategory === category
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? t('allCategories') : category}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {filteredBehaviors.map(behavior => (
              <Card key={behavior.id} className="p-4 sm:p-6 bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-3xl">🧩</div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{behavior.phrase}</h3>
                    <Badge className="mt-2 bg-purple-100 text-purple-700">{behavior.category}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-gray-900">{t('causes')}</h4>
                    </div>
                    <ul className="space-y-1 ml-7">
                      {behavior.causes.map((cause, index) => (
                        <li key={index} className="text-sm text-gray-700">• {cause}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-900">{t('howToPrevent')}</h4>
                    </div>
                    <ul className="space-y-1 ml-7">
                      {behavior.preventions.map((prevention, index) => (
                        <li key={index} className="text-sm text-gray-700">• {prevention}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-gray-900">{t('practicalTips')}</h4>
                    </div>
                    <ul className="space-y-1 ml-7">
                      {behavior.practicalTips.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-700">• {tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-red-900">{t('duringCrisis')}</h4>
                    </div>
                    <ul className="space-y-1 ml-7">
                      {behavior.duringCrisis.map((action, index) => (
                        <li key={index} className="text-sm text-red-800">• {action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredBehaviors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('noBehaviorsFound')}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="massages" className="space-y-6">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">{t('aboutTherapeuticMassages')}</h3>
            <p className="text-sm text-purple-800">
              {t('massagesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {therapeuticMassages.map(massage => (
              <Card key={massage.id} className="p-6 bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Hand className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{massage.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{massage.objective}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-purple-600">📋</span>
                      {t('stepByStep')}
                    </h4>
                    <ol className="space-y-2">
                      {massage.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700 flex gap-2">
                          <span className="font-semibold text-purple-600 flex-shrink-0">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-900 font-semibold">{t('recommendedDuration')}</p>
                      <p className="text-sm text-blue-800">{massage.duration}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {t('importantCare')}
                    </h4>
                    <ul className="space-y-1">
                      {massage.importantCare.map((care, index) => (
                        <li key={index} className="text-sm text-yellow-800">• {care}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
