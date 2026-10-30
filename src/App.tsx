/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { InteractiveCourt } from './components/InteractiveCourt';
import { RulesExplorer } from './components/RulesExplorer';
import { ViolationLadder } from './components/ViolationLadder';
import { TournamentShowcase } from './components/TournamentShowcase';
import { UmpireQuiz } from './components/UmpireQuiz';
import { Scorekeeper } from './components/Scorekeeper';
import { GlossaryView } from './components/GlossaryView';
import { Footer } from './components/Footer';
import { GrandSlamId } from './types/tennis';
import { 
  Trophy, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Layers, 
  Activity, 
  Award, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('court');
  const [selectedTournament, setSelectedTournament] = useState<GrandSlamId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Audio tone generator for chair umpire chime
  const handleAudioChirp = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(587.33, ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.33);
    } catch {
      // AudioContext not permitted or supported
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#1C2826] selection:bg-[#0E4D2B] selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedTournament={selectedTournament}
        setSelectedTournament={setSelectedTournament}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAudioChirp={handleAudioChirp}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Editorial Sub-Hero Banner (Shown on initial overview or when search is not active) */}
        {!searchQuery && (
          <div className="bg-[#FFFFFF] border border-[#E2E8E4] rounded-lg p-5 sm:p-6 chalk-border court-shadow relative overflow-hidden">
            {/* Subtle lawn court chalk pattern */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none bg-[radial-gradient(#0E4D2B_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold tracking-[0.08em] text-[#C5A059] uppercase bg-[#00351a] px-2.5 py-0.5 rounded-[2px]">
                    2026 Grand Slam Unified Edition
                  </span>
                  <span className="text-xs text-[#717971] hidden sm:inline">•</span>
                  <span className="text-xs text-[#717971] hidden sm:inline">
                    London SW19 • Paris XVI • Melbourne Park • Flushing Meadows
                  </span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-[#0E4D2B]">
                  Where Heritage Meets Millimeter Precision
                </h2>
                
                <p className="text-sm text-[#404941] leading-relaxed">
                  Discover the strict legal codifications of lawn tennis: interactive court dimensions, real-time Hawk-Eye optical line tolerances, 4-stage disciplinary code progressions, and certified chair umpire interpretations.
                </p>
              </div>

              {/* Quick Action Badges */}
              <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('court')}
                  className={`text-xs px-3.5 py-2 rounded-[4px] font-semibold flex items-center justify-between space-x-3 transition-colors ${
                    activeTab === 'court' 
                      ? 'bg-[#0E4D2B] text-white' 
                      : 'bg-[#F8FAF8] border border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2]'
                  }`}
                >
                  <span className="flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>2D Court & Hawk-Eye</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`text-xs px-3.5 py-2 rounded-[4px] font-semibold flex items-center justify-between space-x-3 transition-colors ${
                    activeTab === 'quiz' 
                      ? 'bg-[#0E4D2B] text-white' 
                      : 'bg-[#F8FAF8] border border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2]'
                  }`}
                >
                  <span className="flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Umpire Decision Quiz</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content View Routing */}
        {activeTab === 'court' && (
          <InteractiveCourt 
            selectedTournament={selectedTournament} 
            onSelectTournament={(slam) => {
              setSelectedTournament(slam);
              setActiveTab('surfaces');
            }} 
          />
        )}

        {activeTab === 'rules' && (
          <RulesExplorer
            searchQuery={searchQuery}
            selectedTournament={selectedTournament}
            onSelectTournament={setSelectedTournament}
          />
        )}

        {activeTab === 'violations' && (
          <ViolationLadder />
        )}

        {activeTab === 'surfaces' && (
          <TournamentShowcase
            selectedTournament={selectedTournament}
            onSelectTournament={setSelectedTournament}
            onNavigateToCourt={() => setActiveTab('court')}
          />
        )}

        {activeTab === 'quiz' && (
          <UmpireQuiz />
        )}

        {activeTab === 'scorekeeper' && (
          <Scorekeeper />
        )}

        {activeTab === 'glossary' && (
          <GlossaryView searchQuery={searchQuery} />
        )}

      </main>

      {/* Editorial Footer */}
      <Footer onSelectTab={(tab) => setActiveTab(tab)} />
    </div>
  );
}
