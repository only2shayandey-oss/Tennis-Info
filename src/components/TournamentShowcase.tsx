import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  Calendar, 
  Activity, 
  Layers, 
  Quote, 
  Check, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { TOURNAMENTS_DATA } from '../data/tournamentsData';
import { GrandSlamTournament, GrandSlamId } from '../types/tennis';

interface TournamentShowcaseProps {
  selectedTournament: GrandSlamId | 'all';
  onSelectTournament: (slam: GrandSlamId) => void;
  onNavigateToCourt: () => void;
}

export const TournamentShowcase: React.FC<TournamentShowcaseProps> = ({
  selectedTournament,
  onSelectTournament,
  onNavigateToCourt
}) => {
  const [activeSlamId, setActiveSlamId] = useState<GrandSlamId>(() => {
    return selectedTournament !== 'all' ? selectedTournament : 'wimbledon';
  });

  const activeSlam = TOURNAMENTS_DATA.find((t) => t.id === activeSlamId) || TOURNAMENTS_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-lg p-5 chalk-border court-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
                The Four Pillars of World Tennis
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] font-semibold">
                Grand Slam Surface Science & Heritage
              </span>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#1C2826] mt-1">
              Grand Slam Arenas, Surface Physics & Traditions
            </h2>
            <p className="text-sm text-[#404941] max-w-2xl mt-0.5">
              Compare the ball velocity, friction coefficient, bounce trajectory, and sacred codes of conduct across Wimbledon, Roland-Garros, Melbourne Park, and Flushing Meadows.
            </p>
          </div>
        </div>

        {/* Slam Navigation Selector Pills */}
        <div className="mt-5 pt-4 border-t border-[#E2E8E4] grid grid-cols-2 sm:grid-cols-4 gap-2">
          {TOURNAMENTS_DATA.map((slam) => {
            const isSelected = activeSlamId === slam.id;
            return (
              <button
                key={slam.id}
                onClick={() => {
                  setActiveSlamId(slam.id);
                  onSelectTournament(slam.id);
                }}
                className={`p-3 rounded-[4px] border text-left transition-all duration-150 ${
                  isSelected
                    ? 'border-[#0E4D2B] bg-white ring-2 ring-[#C5A059] shadow-sm'
                    : 'bg-[#F8FAF8] border-[#CFD8D3] hover:bg-[#F1F5F2]'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slam.colorHex }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C2826]">
                    {slam.shortName}
                  </span>
                </div>
                <div className="text-[11px] text-[#717971]">
                  Est. {slam.founded} • {slam.paceRating} Pace
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tournament Deep Dive Card */}
      <div 
        className="bg-white rounded-lg chalk-border court-shadow overflow-hidden"
        style={{ borderTop: `4px solid ${activeSlam.colorHex}` }}
      >
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Tournament Overview Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#E2E8E4] pb-6">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span 
                  className="text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: activeSlam.surfaceTint, color: activeSlam.colorHex }}
                >
                  {activeSlam.surfaceTitle}
                </span>
                <span className="text-xs text-[#717971] flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeSlam.venue}, {activeSlam.location}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2826]">
                {activeSlam.name}
              </h3>
              <p className="text-sm text-[#404941] mt-1 max-w-2xl leading-relaxed">
                {activeSlam.surfaceComposition}
              </p>
            </div>

            {/* Silverware Plinth */}
            <div className="bg-[#F8FAF8] p-4 rounded-[4px] border border-[#E2E8E4] min-w-[260px] space-y-2">
              <div className="flex items-center space-x-2 text-[#775a19]">
                <Trophy className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs font-bold uppercase tracking-wider">Championship Trophies</span>
              </div>
              <div className="text-xs space-y-1">
                <div><strong className="text-[#1C2826]">Gentlemen:</strong> {activeSlam.trophyMen}</div>
                <div><strong className="text-[#1C2826]">Ladies:</strong> {activeSlam.trophyWomen}</div>
              </div>
            </div>
          </div>

          {/* Surface Physics Comparison Meters */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Activity className="w-4 h-4 text-[#0E4D2B]" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#1C2826]">
                Court Surface Physics Metrics
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Bounce Height */}
              <div className="bg-[#F8FAF8] p-4 rounded-[4px] border border-[#E2E8E4]">
                <div className="flex items-center justify-between text-xs text-[#717971] mb-1">
                  <span>Bounce Height (from 1.8m drop)</span>
                  <span className="font-bold text-[#1C2826]">{activeSlam.bounceHeightCm} cm</span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-2 rounded-full bg-[#E2E8E4] overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(activeSlam.bounceHeightCm / 90) * 100}%`,
                      backgroundColor: activeSlam.colorHex 
                    }}
                  />
                </div>
                <div className="text-[10px] text-[#717971] mt-1.5">
                  Grass lowest (56cm) vs Clay highest (88cm)
                </div>
              </div>

              {/* Friction Index */}
              <div className="bg-[#F8FAF8] p-4 rounded-[4px] border border-[#E2E8E4]">
                <div className="flex items-center justify-between text-xs text-[#717971] mb-1">
                  <span>Friction Coefficient (μ)</span>
                  <span className="font-bold text-[#1C2826]">{activeSlam.frictionIndex}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E2E8E4] overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${activeSlam.frictionIndex * 100}%`,
                      backgroundColor: activeSlam.colorHex 
                    }}
                  />
                </div>
                <div className="text-[10px] text-[#717971] mt-1.5">
                  Affects ball skidding speed and slide mechanics
                </div>
              </div>

              {/* Certified Match Ball */}
              <div className="bg-[#F8FAF8] p-4 rounded-[4px] border border-[#E2E8E4]">
                <div className="text-xs text-[#717971] mb-1">Official Tournament Ball</div>
                <div className="text-xs font-semibold text-[#1C2826]">
                  {activeSlam.ballType}
                </div>
                <div className="text-[10px] text-[#717971] mt-1.5">
                  Standardized weight: 56.0g – 59.4g
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Trajectory Simulation Diagram */}
          <div className="bg-[#1C2826] text-white rounded-[4px] p-5 chalk-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                Live Trajectory & Rebound Angle Simulation
              </span>
              <span className="text-[11px] text-[#e6f4f0] font-mono">
                ITF Technical Testing Protocol
              </span>
            </div>

            {/* SVG Trajectory Diagram */}
            <div className="w-full h-36 bg-[#121e1c] rounded border border-white/10 relative overflow-hidden flex items-end">
              <svg viewBox="0 0 800 200" className="w-full h-full">
                {/* Court Ground Line */}
                <line x1="0" y1="180" x2="800" y2="180" stroke="#717971" strokeWidth="2" />
                
                {/* Trajectory comparison lines */}
                {/* Wimbledon (Green) */}
                <path 
                  d="M 50,40 Q 250,180 320,180 T 600,120" 
                  fill="none" 
                  stroke="#2E7D32" 
                  strokeWidth={activeSlamId === 'wimbledon' ? "3" : "1.5"} 
                  strokeDasharray={activeSlamId === 'wimbledon' ? "none" : "4 4"}
                  opacity={activeSlamId === 'wimbledon' ? 1 : 0.4}
                />
                
                {/* Roland Garros (Orange Clay) */}
                <path 
                  d="M 50,40 Q 250,180 300,180 T 550,55" 
                  fill="none" 
                  stroke="#C35831" 
                  strokeWidth={activeSlamId === 'roland-garros' ? "3" : "1.5"} 
                  strokeDasharray={activeSlamId === 'roland-garros' ? "none" : "4 4"}
                  opacity={activeSlamId === 'roland-garros' ? 1 : 0.4}
                />

                {/* Australian Open (Cyan) */}
                <path 
                  d="M 50,40 Q 250,180 310,180 T 580,85" 
                  fill="none" 
                  stroke="#0082CA" 
                  strokeWidth={activeSlamId === 'australian-open' ? "3" : "1.5"} 
                  strokeDasharray={activeSlamId === 'australian-open' ? "none" : "4 4"}
                  opacity={activeSlamId === 'australian-open' ? 1 : 0.4}
                />

                {/* US Open (DecoTurf Navy) */}
                <path 
                  d="M 50,40 Q 250,180 315,180 T 575,78" 
                  fill="none" 
                  stroke="#1A3B8B" 
                  strokeWidth={activeSlamId === 'us-open' ? "3" : "1.5"} 
                  strokeDasharray={activeSlamId === 'us-open' ? "none" : "4 4"}
                  opacity={activeSlamId === 'us-open' ? 1 : 0.4}
                />

                {/* Impact contact circle */}
                <circle cx="310" cy="180" r="5" fill="#7CB342" />
                <text x="310" y="196" fill="#7CB342" fontSize="9" textAnchor="middle" fontWeight="bold">Impact</text>

                {/* Legend labels */}
                <text x="610" y="120" fill="#2E7D32" fontSize="10" fontWeight="bold">Grass (Low Skid 56cm)</text>
                <text x="560" y="55" fill="#C35831" fontSize="10" fontWeight="bold">Clay (High Kick 88cm)</text>
                <text x="590" y="85" fill="#0082CA" fontSize="10" fontWeight="bold">AO Hard (74cm)</text>
                <text x="585" y="72" fill="#717971" fontSize="9">US Open (78cm)</text>
              </svg>
            </div>
          </div>

          {/* Traditions and Specific Regulations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Key Traditions */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0E4D2B] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Sacred Grand Slam Traditions</span>
              </div>
              <div className="space-y-2">
                {activeSlam.keyTraditions.map((trad, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-[#1C2826] leading-relaxed">
                    <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{trad}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Regulations */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0E4D2B] flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0E4D2B]" />
                <span>Tournament-Specific Regulations</span>
              </div>
              <div className="space-y-2">
                {activeSlam.specialRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-[#1C2826] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0E4D2B] shrink-0 mt-1.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Archival Quotation Card */}
          <div className="bg-[#F1F5F2] p-4 rounded-[4px] border border-[#E2E8E4] flex items-start space-x-3">
            <Quote className="w-5 h-5 text-[#C5A059] shrink-0 mt-1" />
            <div>
              <p className="text-sm font-serif italic text-[#1C2826] leading-relaxed">
                "{activeSlam.quote}"
              </p>
              <div className="text-xs font-bold text-[#775a19] mt-1">
                — {activeSlam.quoteAuthor}
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={onNavigateToCourt}
              className="px-4 py-2.5 rounded-[4px] bg-[#0E4D2B] text-white text-xs font-semibold hover:bg-[#00351a] flex items-center space-x-2 transition-colors"
            >
              <span>Explore {activeSlam.shortName} Court in 2D Visualizer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
