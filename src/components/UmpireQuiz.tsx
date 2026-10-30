import React, { useState } from 'react';
import { 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Quote, 
  Scale, 
  Trophy,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_SCENARIOS } from '../data/quizData';
import { QuizScenario } from '../types/tennis';

export const UmpireQuiz: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  const scenario = QUIZ_SCENARIOS[currentScenarioIndex];

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || hasSubmitted) return;
    setHasSubmitted(true);

    const chosenOption = scenario.options.find((o) => o.id === selectedOptionId);
    const isCorrect = chosenOption?.isCorrect || false;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [scenario.id]: selectedOptionId
    }));
  };

  const handleNext = () => {
    if (currentScenarioIndex < QUIZ_SCENARIOS.length - 1) {
      setCurrentScenarioIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
    } else {
      setQuizCompleted(true);
      // Trigger festive celebration if score >= 4
      if (score >= 4) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0E4D2B', '#C5A059', '#7CB342', '#FFFFFF']
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers({});
  };

  const getCertificationBadge = (finalScore: number) => {
    if (finalScore >= 5) {
      return {
        title: 'ITF Grand Slam Gold Badge Chair Umpire',
        desc: 'Supreme judicial command! You possess the rare rules acumen required to officiate Wimbledon and US Open finals on Centre Court.',
        badgeColor: 'bg-[#C5A059] text-[#1C2826]'
      };
    } else if (finalScore >= 3) {
      return {
        title: 'Grand Slam Silver Badge Arbiter',
        desc: 'Exceptional officiating! Sound grasp of hindrance, net plane exceptions, and disciplinary escalation.',
        badgeColor: 'bg-[#cfddd9] text-[#1C2826]'
      };
    } else {
      return {
        title: 'National Tournament Line Official',
        desc: 'Solid foundation, but tricky hindrance situations and aerial foot fault exceptions warrant further study of the ITF manual.',
        badgeColor: 'bg-[#F1F5F2] text-[#404941]'
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Quiz Banner Header */}
      <div className="bg-white rounded-lg p-5 chalk-border court-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
                Interactive Case Studies
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] font-semibold">
                Official Certification Standard
              </span>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#1C2826] mt-1">
              "You Make The Call" — Umpire Decision Masterclass
            </h2>
            <p className="text-sm text-[#404941] max-w-2xl mt-0.5">
              Test your knowledge against 6 nuanced, real-world Grand Slam disputes involving net crossings, falling equipment, bird interference, and airborne foot faults.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[#F8FAF8] p-3 rounded-[4px] border border-[#E2E8E4] self-start md:self-center">
            <div className="text-center px-3 border-r border-[#E2E8E4]">
              <div className="text-lg font-bold font-serif text-[#0E4D2B]">{score} / {QUIZ_SCENARIOS.length}</div>
              <div className="text-[10px] uppercase font-bold text-[#717971] tracking-wider">Correct Calls</div>
            </div>
            <div className="text-center px-3">
              <div className="text-lg font-bold font-serif text-[#C5A059]">
                {currentScenarioIndex + 1} / {QUIZ_SCENARIOS.length}
              </div>
              <div className="text-[10px] uppercase font-bold text-[#717971] tracking-wider">Case Number</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full h-1.5 rounded-full bg-[#E2E8E4] overflow-hidden">
          <div
            className="h-full bg-[#0E4D2B] transition-all duration-300"
            style={{ width: `${((currentScenarioIndex + 1) / QUIZ_SCENARIOS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Quiz Flow */}
      {!quizCompleted ? (
        <div className="bg-white rounded-lg p-6 sm:p-8 chalk-border court-shadow space-y-6">
          
          {/* Case Study Header & Narrative */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-[#0E4D2B] text-white flex items-center justify-center text-xs font-bold font-mono">
                {currentScenarioIndex + 1}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#717971]">
                Case Study #{currentScenarioIndex + 1}
              </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#1C2826]">
              {scenario.title}
            </h3>

            {/* Situation Background */}
            <div className="bg-[#F8FAF8] p-4 rounded-[4px] border border-[#E2E8E4] text-sm text-[#1C2826] leading-relaxed">
              <strong className="text-[#0E4D2B]">The Match Incident: </strong>
              {scenario.situation}
            </div>

            {/* The Direct Question */}
            <div className="text-base font-semibold text-[#1C2826] pt-1">
              {scenario.question}
            </div>
          </div>

          {/* Multiple Choice Options List */}
          <div className="space-y-3">
            {scenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let optionStyle = 'bg-[#FFFFFF] border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2]';

              if (hasSubmitted) {
                if (opt.isCorrect) {
                  optionStyle = 'bg-[#E8F2EC] border-[#2E7D32] text-[#0E4D2B] ring-1 ring-[#2E7D32]';
                } else if (isSelected && !opt.isCorrect) {
                  optionStyle = 'bg-[#FBEFEA] border-[#C35831] text-[#ba1a1a] ring-1 ring-[#C35831]';
                } else {
                  optionStyle = 'bg-[#FFFFFF] border-[#E2E8E4] text-[#717971] opacity-60';
                }
              } else if (isSelected) {
                optionStyle = 'bg-[#E8F2EC] border-[#0E4D2B] ring-2 ring-[#0E4D2B] font-medium';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-4 rounded-[4px] border transition-all text-sm flex items-start space-x-3 ${optionStyle}`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected ? 'border-[#0E4D2B] bg-[#0E4D2B] text-white' : 'border-[#CFD8D3] text-[#717971]'
                  }`}>
                    {opt.id.slice(-1)}
                  </div>

                  <div className="flex-1">
                    <div>{opt.text}</div>
                    {hasSubmitted && opt.isCorrect && (
                      <div className="text-xs text-[#2E7D32] font-semibold mt-1">
                        ✓ Correct Ruling
                      </div>
                    )}
                    {hasSubmitted && isSelected && !opt.isCorrect && (
                      <div className="text-xs text-[#ba1a1a] font-semibold mt-1">
                        ✗ Incorrect Interpretation
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Row: Submit or Next */}
          <div className="pt-2 flex items-center justify-between border-t border-[#E2E8E4]">
            <div className="text-xs text-[#717971]">
              {!hasSubmitted ? 'Select one ruling to deliver your verdict' : 'Review explanation below'}
            </div>

            {!hasSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] transition-colors ${
                  selectedOptionId
                    ? 'bg-[#0E4D2B] text-white hover:bg-[#00351a]'
                    : 'bg-[#CFD8D3] text-[#717971] cursor-not-allowed'
                }`}
              >
                Submit Ruling
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-[4px] bg-[#0E4D2B] text-white hover:bg-[#00351a] flex items-center space-x-1.5 transition-colors"
              >
                <span>{currentScenarioIndex < QUIZ_SCENARIOS.length - 1 ? 'Next Scenario' : 'View Results'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Post-Answer Detailed Explanation & Umpire's Take */}
          {hasSubmitted && (
            <div className="space-y-4 pt-2">
              {/* Official Citation Card */}
              <div className="bg-[#F8FAF8] p-4 rounded-[4px] border border-[#E2E8E4] space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0E4D2B]">
                  <Scale className="w-4 h-4 text-[#0E4D2B]" />
                  <span>Official Rulebook Codification</span>
                </div>
                <div className="text-xs font-mono font-semibold text-[#717971]">
                  {scenario.officialCitation}
                </div>
                <p className="text-xs text-[#1C2826] leading-relaxed">
                  {scenario.options.find((o) => o.id === selectedOptionId)?.explanation || 
                   scenario.options.find((o) => o.isCorrect)?.explanation}
                </p>
              </div>

              {/* Umpire's Note */}
              <div className="bg-[#F1F5F2] p-4 rounded-[4px] border border-[#E2E8E4] flex items-start space-x-3">
                <Quote className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#775a19] mb-1">
                    Gold Badge Chair Umpire's Practical Take:
                  </div>
                  <p className="text-xs font-serif italic text-[#1C2826] leading-relaxed">
                    "{scenario.umpiresTake}"
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Complete Results Card */
        <div className="bg-white rounded-lg p-8 chalk-border court-shadow text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#E8F2EC] text-[#0E4D2B] border-2 border-[#C5A059] flex items-center justify-center mx-auto shadow-sm">
            <Trophy className="w-8 h-8 text-[#C5A059]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#717971]">
              Examination Complete
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#1C2826]">
              Final Score: {score} of {QUIZ_SCENARIOS.length} Correct
            </h3>
          </div>

          {/* Awarded Badge Plinth */}
          {(() => {
            const cert = getCertificationBadge(score);
            return (
              <div className="max-w-md mx-auto p-5 rounded-[4px] border border-[#C5A059]/40 bg-[#F8FAF8] space-y-2 shadow-xs">
                <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${cert.badgeColor}`}>
                  {cert.title}
                </span>
                <p className="text-xs text-[#404941] leading-relaxed pt-1">
                  {cert.desc}
                </p>
              </div>
            );
          })()}

          <div className="pt-4 flex items-center justify-center space-x-3">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-[4px] bg-[#0E4D2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#00351a] flex items-center space-x-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Examination</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
