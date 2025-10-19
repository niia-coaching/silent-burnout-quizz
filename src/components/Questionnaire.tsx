import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import {
  questions,
  getAllBatteries,
  getBatteryQuestions,
} from "../data/questions";
import { batteryInfo } from "../data/batteries";
import { calculateResults } from "../utils/scoring";
import { AssessmentResults, BatteryType } from "../types";
import { saveToGoogleSheets } from "../utils/googleSheets";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { BatteryIcon } from "./BatteryIcons";
import Header from "./Header";

interface Props {
  onComplete: (results: AssessmentResults) => void;
}

const Questionnaire = ({ onComplete }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentBattery, setCurrentBattery] = useState<BatteryType | null>(
    null
  );
  const [showBatteryValidation, setShowBatteryValidation] = useState(false);
  const [completedBattery, setCompletedBattery] = useState<BatteryType | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect if running in Instagram's embedded browser
  const isInstagramBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('instagram') || 
           userAgent.includes('fbav') || 
           userAgent.includes('fban') ||
           window.location.hostname.includes('instagram') ||
           document.referrer.includes('instagram');
  };

  const totalQuestions = questions.length;
  const progress =
    currentQuestion >= 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  // Unique motivational messages for each battery
  const getBatteryMotivationalMessage = (battery: BatteryType): string => {
    const messages: Record<BatteryType, string> = {
      physical:
        "Bravo ! Tu viens d'explorer ta batterie physique. Continue, ton corps te remerciera ! 💪",
      mental:
        "Excellent ! Ta batterie mentale est évaluée. Chaque réponse te rapproche de la clarté ! 🧠",
      emotional:
        "Magnifique ! Tu as pris le temps d'explorer tes émotions. Continue ce beau travail ! 💙",
      identity:
        "Superbe ! Ta batterie identitaire est complète. Tu te découvres un peu plus ! ✨",
      relational:
        "Fantastique ! Tes relations sont maintenant cartographiées. Continue sur ta lancée ! 🤝",
      professional:
        "Incroyable ! Ta batterie professionnelle est évaluée. Ton avenir te dit merci ! 💼",
      spiritual:
        "Merveilleux ! Tu as exploré ta dimension spirituelle. La dernière étape approche ! 🕊️",
    };
    return messages[battery];
  };

  useEffect(() => {
    if (currentQuestion >= 0 && currentQuestion < questions.length) {
      const newBattery = questions[currentQuestion].battery;

      if (currentBattery && newBattery !== currentBattery) {
        setCompletedBattery(currentBattery);
        setShowBatteryValidation(true);
      }

      setCurrentBattery(newBattery);
    }
  }, [currentQuestion, currentBattery]);

  const handleStart = async () => {
    if (firstName.trim() && lastName.trim() && email.trim()) {
      // If in Instagram browser, redirect to external browser
      if (isInstagramBrowser()) {
        alert(`Pour une meilleure expérience, ouvre ce lien dans ton navigateur externe (Safari/Chrome) :\n\n${window.location.href}\n\nOu clique sur "Ouvrir dans le navigateur" dans le menu Instagram.`);
        
        // Try to open in external browser
        try {
          window.open(window.location.href, '_blank');
        } catch (e) {
          console.log('Failed to open external browser');
        }
        return;
      }

      setIsSubmitting(true);

      try {
        // Save user data to Google Sheets
        await saveToGoogleSheets({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || "Non renseigné",
          timestamp: new Date().toISOString(),
        });

        // Start the questionnaire
        setCurrentQuestion(0);
      } catch (error) {
        console.error("Error submitting data:", error);
        // Still proceed to questionnaire even if saving failed
        setCurrentQuestion(0);
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  const handleAnswer = (points: number) => {
    const question = questions[currentQuestion];
    setAnswers((prev) => ({ ...prev, [question.id]: points }));
  };

  const handleNext = () => {
    if (showBatteryValidation) {
      setShowBatteryValidation(false);
      setCompletedBattery(null);
    } else if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const results = calculateResults(firstName, answers);
      onComplete(results);
    }
  };

  const handlePrevious = () => {
    if (showBatteryValidation) {
      setShowBatteryValidation(false);
      setCompletedBattery(null);
      return;
    }

    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      setCurrentQuestion(-1);
    }
  };

  const isAnswered =
    currentQuestion >= 0 &&
    answers[questions[currentQuestion]?.id] !== undefined;

  // Intro screen
  if (currentQuestion === -1) {
    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-niia-beige-light via-white to-niia-beige">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-2xl border-niia-beige">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl md:text-4xl font-spartan text-niia-blue-dark">
                Évaluation Burn-Out Silencieux
              </CardTitle>
              <CardDescription className="text-base text-niia-gray">
                Découvre ton niveau d'épuisement invisible en 3 minutes
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {getAllBatteries().map((battery) => {
                  const info = batteryInfo[battery];
                  return (
                    <Badge
                      key={battery}
                      variant="outline"
                      className="gap-2 px-3 py-1.5"
                    >
                      <BatteryIcon type={battery} size={16} />
                      <span className="text-sm">Batterie {info.name}</span>
                    </Badge>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2"
                    >
                      Prénom *
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Ton prénom"
                      autoFocus
                      className="text-base"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2"
                    >
                      Nom *
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Ton nom"
                      className="text-base"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    className="text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Téléphone (optionnel)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      firstName.trim() &&
                      lastName.trim() &&
                      email.trim() &&
                      handleStart()
                    }
                    className="text-base"
                  />
                </div>

                <Button
                  onClick={handleStart}
                  disabled={
                    !firstName.trim() ||
                    !lastName.trim() ||
                    !email.trim() ||
                    isSubmitting
                  }
                  className="w-full bg-niia-blue-dark hover:bg-niia-teal-dark text-white font-semibold"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Préparation...
                    </>
                  ) : (
                    <>
                      {isInstagramBrowser() ? 'Ouvrir dans le Navigateur' : 'Commencer l\'évaluation'}
                      <ChevronRight className="ml-2" size={20} />
                    </>
                  )}
                </Button>

              </div>

              <p className="text-sm text-center text-muted-foreground">
                35 questions • 3 minutes • 100% confidentiel
              </p>
              {isInstagramBrowser() && (
                <p className="text-xs text-center text-amber-600 mt-2">
                  💡 Pour une meilleure expérience, ouvre ce lien dans ton navigateur externe
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Battery Validation Screen
  if (showBatteryValidation && completedBattery) {
    const batteryData = batteryInfo[completedBattery];
    const completedCount = getAllBatteries().indexOf(completedBattery) + 1;
    const totalBatteries = getAllBatteries().length;

    const motivationalMessage = getBatteryMotivationalMessage(completedBattery);

    return (
      <div className="h-screen flex flex-col bg-gradient-to-br from-niia-beige-light via-white to-niia-beige">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-2xl border-niia-beige">
            <CardContent className="pt-8 text-center space-y-6">
              <div>
                <h2 className="text-2xl font-spartan text-niia-blue-dark mb-2">
                  Batterie {batteryData.name} complétée !
                </h2>
                <p className="text-lg text-niia-gray font-medium mt-4 px-4">
                  {motivationalMessage}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-center gap-2">
                  {getAllBatteries().map((battery, index) => {
                    const isCompleted = index < completedCount;
                    return (
                      <div
                        key={battery}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted
                            ? "bg-primary border-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {isCompleted && (
                          <CheckCircle size={20} className="text-white" />
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-muted-foreground">
                  {completedCount}/{totalBatteries} batteries évaluées
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  {completedCount === totalBatteries &&
                    "C'est terminé ! Découvre maintenant ton diagnostic complet."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {completedCount === totalBatteries
                    ? "Ton rapport personnalisé t'attend..."
                    : `Plus que ${totalBatteries - completedCount} ${
                        totalBatteries - completedCount === 1
                          ? "batterie"
                          : "batteries"
                      } à évaluer.`}
                </p>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-niia-blue-dark hover:bg-niia-teal-dark text-white font-semibold"
                size="lg"
              >
                {completedCount === totalBatteries
                  ? "Voir mes résultats"
                  : "Continuer"}
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Question screen
  const question = questions[currentQuestion];
  const batteryColor = currentBattery
    ? batteryInfo[currentBattery].color
    : "#666";
  const batteryQuestions = currentBattery
    ? getBatteryQuestions(currentBattery)
    : [];
  const currentBatteryQuestionIndex =
    batteryQuestions.findIndex((q) => q.id === question.id) + 1;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-niia-beige-light via-white to-niia-beige">
      <Header
        showProgress={true}
        progress={progress}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        batteryName={
          currentBattery
            ? `Batterie ${batteryInfo[currentBattery].name} (${currentBatteryQuestionIndex}/${batteryQuestions.length})`
            : undefined
        }
      />

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 overflow-hidden">
        <div className="w-full max-w-3xl h-full flex flex-col">
          <Card className="shadow-lg flex-1 flex flex-col overflow-hidden border-niia-beige">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">
                {question.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 flex-1 overflow-y-auto">
              {question.options.map((option, index) => {
                const isSelected = answers[question.id] === option.points;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.points)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: batteryColor,
                            backgroundColor: `${batteryColor}10`,
                          }
                        : {}
                    }
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          isSelected ? "border-current" : "border-gray-300"
                        }`}
                        style={
                          isSelected
                            ? {
                                borderColor: batteryColor,
                                backgroundColor: batteryColor,
                              }
                            : {}
                        }
                      >
                        {isSelected && (
                          <CheckCircle size={10} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{option.text}</p>
                        <p className="text-xs text-muted-foreground italic mt-0.5">
                          {option.example}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              size="default"
              className="flex-1"
            >
              <ChevronLeft className="mr-2" size={18} />
              Précédent
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              size="default"
              className={`flex-1 font-semibold ${
                isAnswered
                  ? "bg-niia-blue-dark hover:bg-niia-teal-dark text-white"
                  : ""
              }`}
            >
              {currentQuestion === totalQuestions - 1
                ? "Voir mes résultats"
                : "Suivant"}
              <ChevronRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
