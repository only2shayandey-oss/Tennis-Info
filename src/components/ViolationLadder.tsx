import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Volume2, 
  RotateCcw, 
  UserX, 
  CheckCircle2, 
  HelpCircle, 
  Gavel, 
  Clock, 
  FileText
} from 'lucide-react';
import { VIOLATION_STEPS, CODE_INFRACTIONS } from '../data/tournamentsData';
import { ViolationStep, CodeInfraction } from '../types/tennis';

interface LoggedViolation {
  id: string;
  step: number;
  penaltyName: string;
  infraction: CodeInfraction;
  player: string;
  opponent: string;
  time: string;
  announcement: string;
}

export const ViolationLadder: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0); // 0 = Clean, 1 = Step 1, 2 = Step 2, 3 = Step 3, 4 = Default
  const [selectedInfractionId, setSelectedInfractionId] = useState<string>('racket-abuse');
  const [playerName, setPlayerName] = useState<string>('Mr. Alcaraz');
  const [opponentName, setOpponentName] = useState<string>('Mr. Sinner');
  const [logs, setLogs] = useState<LoggedViolation[]>([]);
  const [supervisorModalOpen, setSupervisorModalOpen] = useState<boolean>(false);
  const [simulatedVoicePlaying, setSimulatedVoicePlaying] = useState<boolean>(false);

  const selectedInfraction = CODE_INFRACTIONS.find((i) => i.id === selectedInfractionId) || CODE_INFRACTIONS[0];
  const currentStep: ViolationStep | null = currentStepIndex > 0 ? VIOLATION_STEPS[currentStepIndex - 1] : null;

  // Handle issuing the next code violation
  const handleIssueViolation = () => {
    // If severe infraction like Physical Abuse, escalate directly to Default
    let nextStepIndex = currentStepIndex + 1;
    if (selectedInfraction.severity === 'immediate-default') {
      nextStepIndex = 4;
    }

    if (nextStepIndex > 4) return;

    const stepObj = VIOLATION_STEPS[nextStepIndex - 1];
    const generatedAnnouncement = stepObj.announcementTemplate
      .replace('{infraction}', selectedInfraction.name.toLowerCase())
      .replace('{player}', playerName)
      .replace('{opponent}', opponentName)
      .replace('{newScore}', '30–40');

    const newLog: LoggedViolation = {
      id: Math.random().toString(36).substring(7),
      step: nextStepIndex,
      penaltyName: stepObj.penalty,
      infraction: selectedInfraction,
      player: playerName,
      opponent: opponentName,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      announcement: generatedAnnouncement
    };

    setCurrentStepIndex(nextStepIndex);
    setLogs((prev) => [newLog, ...prev]);

    // Simulate audio chime / announcement
    playAnnouncementAudio(generatedAnnouncement);

    // If reaching default, prompt supervisor review
    if (nextStepIndex === 4) {
      setSupervisorModalOpen(true);
    }
  };

  const playAnnouncementAudio = (text: string) => {
    setSimulatedVoicePlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
      utterance.onend = () => setSimulatedVoicePlaying(false);
      utterance.onerror = () => setSimulatedVoicePlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setSimulatedVoicePlaying(false), 2500);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setLogs([]);
    setSupervisorModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-white rounded-lg p-5 chalk-border court-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
                Grand Slam Disciplinary Code of Conduct
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] font-semibold">
                Unified 4-Stage Escalation Protocol
              </span>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#1C2826] mt-1">
              Code Violation Progression Ladder
            </h2>
            <p className="text-sm text-[#404941] max-w-2xl mt-0.5">
              Experience the rigorous judicial sequence followed by Grand Slam chair umpires: Warning → Point Penalty → Game Penalty → Default. Test various infractions and simulate authentic umpire announcements.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-[4px] border border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2] self-start md:self-center transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#717971]" />
            <span>Reset Court Sheet</span>
          </button>
        </div>
      </div>

      {/* Main Progression Ladder Timeline Component */}
      <div className="bg-white rounded-lg p-6 chalk-border court-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-[#717971] uppercase tracking-wider">
            Current Disciplinary Stage for {playerName}:
          </div>
          <div className="text-xs font-mono font-semibold text-[#0E4D2B]">
            Status: {currentStepIndex === 0 ? 'CLEAN RECORD' : VIOLATION_STEPS[currentStepIndex - 1].penalty}
          </div>
        </div>

        {/* Step Progression Visual Track */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {VIOLATION_STEPS.map((step) => {
            const isCompleted = currentStepIndex >= step.step;
            const isCurrent = currentStepIndex === step.step;
            const isNext = currentStepIndex + 1 === step.step;

            return (
              <div
                key={step.step}
                className={`p-4 rounded-[4px] border transition-all duration-200 relative overflow-hidden ${
                  isCurrent
                    ? 'bg-[#0E4D2B] text-white border-[#C5A059] ring-2 ring-[#C5A059] shadow-md'
                    : isCompleted
                    ? 'bg-[#F1F5F2] text-[#1C2826] border-[#CFD8D3]'
                    : isNext
                    ? 'bg-[#FFFFFF] text-[#1C2826] border-[#0E4D2B]/40 border-dashed'
                    : 'bg-[#F8FAF8] text-[#717971] border-[#E2E8E4] opacity-60'
                }`}
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold tracking-[0.08em] uppercase ${
                    isCurrent ? 'text-[#C5A059]' : 'text-[#717971]'
                  }`}>
                    Stage {step.step}
                  </span>
                  
                  {/* Optic Ball Indicator (from design system) */}
                  <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                    isCurrent ? 'bg-[#7CB342] ring-2 ring-white animate-pulse' :
                    isCompleted ? 'bg-[#2E7D32]' : 'bg-[#CFD8D3]'
                  }`} />
                </div>

                <div className="text-lg font-serif font-bold mb-1">
                  {step.penalty}
                </div>

                <p className={`text-xs leading-relaxed mb-3 ${isCurrent ? 'text-[#E8F2EC]' : 'text-[#404941]'}`}>
                  {step.description}
                </p>

                <div className={`text-[11px] font-mono p-2 rounded-[4px] ${
                  isCurrent ? 'bg-[#00210e] text-[#97d4a7]' : 'bg-[#E8F2EC]/60 text-[#0E4D2B]'
                }`}>
                  {step.scoreImpact}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Simulation Console (Infraction Selection & Issue Violation) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Infraction Selection & Action (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg p-5 chalk-border court-shadow space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#E2E8E4] pb-3">
            <Gavel className="w-5 h-5 text-[#0E4D2B]" />
            <h3 className="text-lg font-serif font-semibold text-[#1C2826]">
              Chair Umpire Bench Simulator
            </h3>
          </div>

          {/* Player Names Input Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#717971] mb-1">
                Player Committing Infraction:
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-[#CFD8D3] focus:border-[#0E4D2B] text-sm px-3 py-1.5 rounded-[4px] outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#717971] mb-1">
                Opposing Competitor:
              </label>
              <input
                type="text"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-[#CFD8D3] focus:border-[#0E4D2B] text-sm px-3 py-1.5 rounded-[4px] outline-none"
              />
            </div>
          </div>

          {/* Infraction Category Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#717971] mb-1.5">
              Select Witnessed Infraction:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CODE_INFRACTIONS.map((inf) => {
                const isSelected = selectedInfractionId === inf.id;
                return (
                  <button
                    key={inf.id}
                    onClick={() => setSelectedInfractionId(inf.id)}
                    className={`text-left p-2.5 rounded-[4px] border transition-all ${
                      isSelected
                        ? 'bg-[#E8F2EC] border-[#0E4D2B] ring-1 ring-[#0E4D2B]'
                        : 'bg-[#F8FAF8] border-[#CFD8D3] hover:bg-[#F1F5F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-[#1C2826]">{inf.name}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                        inf.severity === 'immediate-default' ? 'bg-[#ffdad6] text-[#ba1a1a]' :
                        inf.severity === 'severe' ? 'bg-[#ffdea5] text-[#5d4201]' :
                        'bg-[#F1F5F2] text-[#404941]'
                      }`}>
                        {inf.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#717971] line-clamp-1">
                      {inf.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Infraction Deep Dive */}
          <div className="bg-[#F1F5F2] p-3 rounded-[4px] border border-[#E2E8E4] text-xs">
            <div className="text-[10px] font-bold uppercase text-[#0E4D2B] mb-0.5">
              Real-World Code Context:
            </div>
            <div className="text-[#1C2826] italic">
              "{selectedInfraction.realWorldExample}"
            </div>
          </div>

          {/* Action Button: Issue Violation */}
          <div className="pt-2">
            <button
              onClick={handleIssueViolation}
              disabled={currentStepIndex >= 4}
              className={`w-full py-2.5 px-4 rounded-[4px] font-semibold text-sm flex items-center justify-center space-x-2 transition-all ${
                currentStepIndex >= 4
                  ? 'bg-[#CFD8D3] text-[#717971] cursor-not-allowed'
                  : 'bg-[#0E4D2B] text-white hover:bg-[#00351a] shadow-sm hover:border-[#C5A059] border border-transparent'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-[#C5A059]" />
              <span>
                {currentStepIndex >= 4
                  ? 'Player Has Been Disqualified (Defaulted)'
                  : `Issue Code Violation for ${selectedInfraction.name}`}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Umpire Mic Announcement & Log (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Live Microphone Announcement Card */}
          <div className="bg-[#1C2826] text-white rounded-lg p-5 chalk-border court-shadow border-t-4 border-t-[#C5A059]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Volume2 className={`w-4 h-4 ${simulatedVoicePlaying ? 'text-[#7CB342] animate-pulse' : 'text-[#C5A059]'}`} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                  Centre Court PA Announcement
                </span>
              </div>
              {simulatedVoicePlaying && (
                <span className="text-[10px] bg-[#7CB342] text-[#1C2826] px-1.5 py-0.5 rounded font-bold uppercase">
                  ON AIR
                </span>
              )}
            </div>

            <div className="bg-[#273331] p-3.5 rounded-[4px] border border-white/10 my-3">
              <p className="text-base font-serif italic text-[#e6f4f0] leading-relaxed">
                {logs.length > 0 
                  ? `"${logs[0].announcement}"`
                  : `"Court is in order. Play is underway without code infractions."`}
              </p>
            </div>

            {logs.length > 0 && (
              <button
                onClick={() => playAnnouncementAudio(logs[0].announcement)}
                className="text-xs px-3 py-1.5 rounded-[4px] bg-[#C5A059] text-[#1C2826] font-semibold hover:bg-[#fed488] transition-colors flex items-center space-x-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Replay Umpire Voice Announcement</span>
              </button>
            )}
          </div>

          {/* Official Scoresheet Ledger */}
          <div className="bg-white rounded-lg p-5 chalk-border court-shadow">
            <div className="flex items-center space-x-2 border-b border-[#E2E8E4] pb-2 mb-3">
              <FileText className="w-4 h-4 text-[#0E4D2B]" />
              <h4 className="text-sm font-serif font-bold text-[#1C2826]">
                Official Match Disciplinary Ledger
              </h4>
            </div>

            {logs.length === 0 ? (
              <div className="text-xs text-[#717971] italic text-center py-4">
                No violations logged on the official score sheet yet.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div key={log.id} className="text-xs p-2.5 rounded-[4px] bg-[#F8FAF8] border border-[#E2E8E4] space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[#0E4D2B]">{log.penaltyName}</span>
                      <span className="text-[10px] text-[#717971] font-mono">{log.time}</span>
                    </div>
                    <div className="text-[#404941]">
                      Infraction: <span className="font-semibold text-[#1C2826]">{log.infraction.name}</span>
                    </div>
                    <div className="text-[11px] text-[#717971] font-mono truncate">
                      {log.announcement}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Supervisor Review Modal (When Default Occurs) */}
      {supervisorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 chalk-border court-shadow space-y-4">
            <div className="flex items-center space-x-3 text-[#ba1a1a]">
              <div className="w-10 h-10 rounded-full bg-[#ffdad6] flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1C2826]">
                  Grand Slam Supervisor Consultation
                </h3>
                <span className="text-xs font-semibold text-[#ba1a1a]">
                  CRITICAL DISCIPLINARY PROCEDURE
                </span>
              </div>
            </div>

            <p className="text-xs text-[#404941] leading-relaxed">
              Under Grand Slam Rulebook Section IV.B, an outright <strong className="text-[#1C2826]">Default (Disqualification)</strong> cannot be made by the chair umpire alone without immediate on-court consultation and confirmation from the Tournament Referee or Grand Slam Supervisor.
            </p>

            <div className="bg-[#F8FAF8] p-3 rounded-[4px] border border-[#E2E8E4] text-xs space-y-1.5">
              <div><strong className="text-[#1C2826]">Player:</strong> {playerName}</div>
              <div><strong className="text-[#1C2826]">Total Offences:</strong> 4 violations logged</div>
              <div><strong className="text-[#1C2826]">Action:</strong> Forfeiture of remaining prize money and ATP/WTA ranking points subject to committee review.</div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setSupervisorModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-[4px] bg-[#0E4D2B] text-white hover:bg-[#00351a]"
              >
                Acknowledge Official Default
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
