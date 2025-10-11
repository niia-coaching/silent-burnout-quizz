import { Progress } from './ui/progress';

interface HeaderProps {
  showProgress?: boolean;
  progress?: number;
  currentQuestion?: number;
  totalQuestions?: number;
  batteryName?: string;
}

const Header = ({ showProgress, progress, currentQuestion, totalQuestions, batteryName }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-niia-beige sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {!showProgress ? (
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="NIIA Logo" className="h-16 w-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-3 items-center gap-4">
            {/* Logo - Left */}
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="NIIA Logo" className="h-16 w-auto" />
            </div>

            {/* Progress Bar - Center */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-niia-gray mb-1">
                Question {currentQuestion! + 1} / {totalQuestions}
              </span>
              <Progress 
                value={progress || 0} 
                className="h-2 bg-niia-beige-light w-full"
              />
            </div>

            {/* Battery Name - Right */}
            <div className="flex justify-end">
              {batteryName && (
                <span className="text-xs font-medium text-niia-gray text-right">
                  {batteryName}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
