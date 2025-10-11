import { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import { AssessmentResults } from './types';

function App() {
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleComplete = (assessmentResults: AssessmentResults) => {
    setResults(assessmentResults);
    setShowResults(true);
  };

  const handleRestart = () => {
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="app">
      {!showResults ? (
        <Questionnaire onComplete={handleComplete} />
      ) : results ? (
        <Results results={results} onRestart={handleRestart} />
      ) : null}
    </div>
  );
}

export default App;

