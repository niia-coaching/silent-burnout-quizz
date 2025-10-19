import { useState } from 'react';
import { Download, RotateCcw, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { AssessmentResults } from '../types';
import { batteryInfo, getLevelLabel } from '../data/batteries';
import { PDFDocument } from '../utils/pdfGenerator';
import { pdf } from '@react-pdf/renderer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BatteryIcon } from './BatteryIcons';
import Header from './Header';

interface Props {
  results: AssessmentResults;
  onRestart: () => void;
}

const Results = ({ results, onRestart }: Props) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<PDFDocument results={results} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Erreur lors de la generation du PDF. Veuillez reessayer.");
    }
  };

  const criticalBatteries = results.scores.filter(s => s.level === 'critical');
  const unstableBatteries = results.scores.filter(s => s.level === 'unstable');
  const optimalBatteries = results.scores.filter(s => s.level === 'optimal');

  // Get 3 batteries with lowest scores, regardless of level (critical, unstable, or optimal)
  const priorities = [...results.scores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  // Sort batteries by score to find top performers
  const topBatteries = [...results.scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-[#d96536] bg-[#d96536]/10 border-[#d96536]/30';
      case 'unstable': return 'text-[#dea742] bg-[#dea742]/10 border-[#dea742]/30';
      case 'optimal': return 'text-[#379191] bg-[#379191]/10 border-[#379191]/30';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-niia-beige-light to-white">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-niia-teal/10 rounded-full mb-4">
            <CheckCircle size={32} className="text-niia-teal" />
          </div>
          <h1 className="text-4xl md:text-5xl font-spartan font-bold text-niia-blue-dark">
            Ton Diagnostic Est Prêt !
          </h1>
          <p className="text-xl text-niia-gray">
            {results.firstName}, voici l'état de tes 7 batteries de vie
          </p>
        </div>

        {/* Global Score Card */}
        <Card className="shadow-lg border-niia-beige">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#e8d6bd"
                      strokeWidth="12"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke={results.totalPercentage >= 70 ? '#379191' : results.totalPercentage >= 40 ? '#dea742' : '#d96536'}
                      strokeWidth="12"
                      strokeDasharray={`${(results.totalPercentage / 100) * 552.92} 552.92`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-spartan font-bold text-niia-blue-dark">{results.totalScore}</div>
                    <div className="text-lg text-niia-gray">/210</div>
                    <div className="text-2xl font-semibold text-niia-teal">{results.totalPercentage}%</div>
                  </div>
                </div>
                <p className="text-sm text-niia-gray">Score Global</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-spartan font-bold text-niia-blue-dark mb-2">Ton Profil Énergétique</h2>
                  <p className="text-lg font-medium text-niia-teal">{results.profile}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-niia-teal" />
                    <span className="text-sm">{optimalBatteries.length} batteries optimales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={20} className="text-niia-gold" />
                    <span className="text-sm">{unstableBatteries.length} batteries instables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle size={20} className="text-niia-terracotta" />
                    <span className="text-sm">{criticalBatteries.length} batteries critiques</span>
                  </div>
                </div>
                {/* Top Batteries */}
                <div className="pt-4 border-t border-niia-beige">
                  <p className="text-sm font-semibold text-niia-blue-dark mb-2">Tes points forts :</p>
                  <div className="flex flex-wrap gap-2">
                    {topBatteries.map((battery) => (
                      <Badge 
                        key={battery.battery} 
                        variant="outline"
                        className="border-niia-teal text-niia-teal"
                      >
                        {batteryInfo[battery.battery].name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priorities */}
        {priorities.length > 0 && (
          <Card className="shadow-lg border-l-4 border-niia-terracotta">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-spartan text-niia-blue-dark">
                <AlertCircle className="text-niia-terracotta" />
                Tes 3 Priorités Immédiates
              </CardTitle>
              <CardDescription className="text-niia-gray">
                Ces batteries nécessitent ton attention en priorité
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {priorities.map((batteryScore, index) => {
                const info = batteryInfo[batteryScore.battery];
                const levelLabel = getLevelLabel(batteryScore.level);

                return (
                  <div key={batteryScore.battery} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-niia-beige">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-niia-terracotta/20 flex items-center justify-center">
                        <span className="font-bold text-niia-terracotta">{index + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <BatteryIcon type={batteryScore.battery} size={24} style={{ color: info.color }} />
                        <h3 className="font-semibold text-niia-blue-dark">Batterie {info.name}</h3>
                        <Badge variant="outline" className={getStatusColor(batteryScore.level)}>
                          {levelLabel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={batteryScore.percentage} className="flex-1 h-2" />
                        <span className="text-sm font-medium text-niia-gray">{batteryScore.percentage}%</span>
                      </div>
                      <p className="text-sm text-niia-gray">
                        {getQuickActionText(batteryScore.battery, batteryScore.level)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* All Batteries */}
        <Card className="shadow-lg border-niia-beige">
          <CardHeader>
            <CardTitle className="font-spartan text-niia-blue-dark">Détail de Tes 7 Batteries</CardTitle>
            <CardDescription className="text-niia-gray">
              Vue d'ensemble complète de ton état actuel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.scores.map((batteryScore) => {
                const info = batteryInfo[batteryScore.battery];
                const levelLabel = getLevelLabel(batteryScore.level);

                return (
                  <Card key={batteryScore.battery} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <BatteryIcon type={batteryScore.battery} size={28} style={{ color: info.color }} />
                            <div>
                              <h3 className="font-semibold text-lg">Batterie {info.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={getStatusColor(batteryScore.level)}>
                                  {levelLabel}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  {batteryScore.score}/30 points
                                </span>
                                <span className="text-muted-foreground">{batteryScore.percentage}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section - Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Download Report Card */}
          <Card className="shadow-lg border-niia-beige">
            <CardHeader>
              <CardTitle className="font-spartan text-niia-blue-dark">Télécharge Ton Rapport Complet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-niia-teal mt-0.5 flex-shrink-0" />
                  <span>Analyse détaillée de chaque batterie</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-niia-teal mt-0.5 flex-shrink-0" />
                  <span>1 exercice concret par batterie</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-niia-teal mt-0.5 flex-shrink-0" />
                  <span>Recommandations personnalisées</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-niia-teal mt-0.5 flex-shrink-0" />
                  <span>Ton plan d'action complet</span>
                </li>
              </ul>
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  download={`diagnostic-7-batteries-${results.firstName.toLowerCase()}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-niia-blue-dark hover:bg-niia-teal-dark text-white font-semibold h-11 rounded-md px-8 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Download className="mr-2" size={20} />
                  Télécharger Mon Bilan PDF
                </a>
              ) : (
                <Button 
                  onClick={handleDownloadPDF} 
                  className="w-full bg-niia-blue-dark hover:bg-niia-teal-dark text-white font-semibold" 
                  size="lg"
                >
                  <Download className="mr-2" size={20} />
                  Générer Mon Bilan PDF
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Masterclass Card */}
          <Card className="shadow-lg bg-gradient-to-br from-niia-blue-dark to-niia-teal-dark text-white border-none">
            <CardHeader>
              <CardTitle className="text-white font-spartan">Masterclass Gratuite (90 min)</CardTitle>
              <CardDescription className="text-niia-beige-light">
                "Transforme ton épuisement silencieux en clarté intérieure"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white">
                📅 Jeudi à 20h00 (Heure de Paris)
              </p>
              <p className="text-sm text-white">
                Découvre la méthode IMPACT pour retrouver ton énergie en 30 minutes par jour, sans culpabilité.
              </p>
              
              {/* Dynamic priorities section */}
              {priorities.length > 0 && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs mb-2">
                    📍 Focus spécial pour toi sur {priorities.length === 1 ? 'la batterie' : 'les batteries'} :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {priorities.map((battery) => (
                      <span 
                        key={battery.battery}
                        className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                      >
                        {batteryInfo[battery.battery].name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={() => window.open('https://www.niia.coach/masterclass-gratuite', '_blank')}
                className="w-full bg-niia-terracotta hover:bg-niia-terracotta/90 text-white font-semibold" 
                size="lg"
              >
                Je Réserve Ma Place
              </Button>
              <p className="text-xs text-center text-niia-beige-light">
                Places limitées : 50 personnes max
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <Button 
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="border-niia-gray text-niia-gray hover:bg-niia-beige-light"
          >
            <RotateCcw className="mr-2" size={20} />
            Refaire le test
          </Button>
        </div>
      </div>
    </div>
  );
};

const getQuickActionText = (battery: string, level: string): string => {
  const actions: Record<string, Record<string, string>> = {
    physical: {
      critical: "Priorité récupération : stop stimulants le soir, siestes courtes, consulte en cas de douleurs persistantes.",
      unstable: "20 min de marche lente aujourd'hui, téléphone en mode avion",
      optimal: "Dimanche : Audit corporel hebdomadaire (10 min)"
    },
    mental: {
      critical: "Stop-ruminations : écriture 5 min, ancrage respiratoire, règle des 2 minutes.",
      unstable: "Lance ton premier Pomodoro 25 min en mono-tâche aujourd'hui",
      optimal: "Dimanche : Audit mental hebdomadaire (10 min)"
    },
    emotional: {
      critical: "Accueille et canalise : cohérence cardiaque, marche consciente, partage à une personne sûre.",
      unstable: "Ce soir : Journal émotionnel (5 min) - note 3 émotions ressenties",
      optimal: "Ce soir : Note 3 moments de gratitude de la journée"
    },
    identity: {
      critical: "Clarifie : top 3 valeurs + un engagement quotidien aligné.",
      unstable: "Aujourd'hui : Cartographie de tes valeurs (20 min)",
      optimal: "Ce trimestre : Audit identitaire (20 min)"
    },
    relational: {
      critical: "Installe des limites simples : dire non sans justification, temps de silence.",
      unstable: "Aujourd'hui : Dis 'non' à 1 demande + Challenge 7 jours",
      optimal: "Ce mois : Check-in relationnel + temps qualité avec 1 relation nourrissante"
    },
    professional: {
      critical: "Chargé élevée : timeboxing, une bataille/jour, rituel de fin.",
      unstable: "Cette semaine : Audit professionnel (30 min) + identifie 3 améliorations",
      optimal: "Ce trimestre : Bilan professionnel (1h) + opportunité mentorat"
    },
    spiritual: {
      critical: "Réactive des micro-rites : nature, prière/méditation simple.",
      unstable: "Aujourd'hui : Pratique spirituelle consciente (10 min) + lecture sacrée",
      optimal: "Cette année : Planifie retraite spirituelle + accompagnement"
    }
  };

  return actions[battery]?.[level] || "Consulte ton rapport PDF pour les actions détaillées";
};

export default Results;
