import React, { useState } from 'react';
import { 
  Trophy, 
  Search, 
  Menu, 
  X, 
  Layers, 
  BookOpen, 
  AlertTriangle, 
  Activity, 
  Award, 
  Calculator, 
  Compass,
  Volume2
} from 'lucide-react';
import { GrandSlamId } from '../types/tennis';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTournament: GrandSlamId | 'all';
  setSelectedTournament: (slam: GrandSlamId | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAudioChirp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedTournament,
  setSelectedTournament,
  searchQuery,
  setSearchQuery,
  onAudioChirp
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const tabs = [
    { id: 'court', label: 'Court & Hawk-Eye', icon: Layers },
    { id: 'rules', label: 'Grand Slam Code', icon: BookOpen },
    { id: 'violations', label: 'Violation Ladder', icon: AlertTriangle },
    { id: 'surfaces', label: 'Surface Physics', icon: Activity },
    { id: 'quiz', label: 'Umpire Quiz', icon: Award },
    { id: 'scorekeeper', label: 'Live Scorer', icon: Calculator },
    { id: 'glossary', label: 'Glossary', icon: Compass },
  ];

  const tournamentChips = [
    { id: 'all', label: 'ALL SLAMS', bg: 'bg-[#F1F5F2]', border: 'border-[#717971]', text: 'text-[#1C2826]' },
    { id: 'wimbledon', label: 'WIMBLEDON', bg: 'bg-[#E8F2EC]', border: 'border-[#0E4D2B]', text: 'text-[#0E4D2B]' },
    { id: 'roland-garros', label: 'ROLAND-GARROS', bg: 'bg-[#FBEFEA]', border: 'border-[#C35831]', text: 'text-[#C35831]' },
    { id: 'australian-open', label: 'AUSTRALIAN OPEN', bg: 'bg-[#E5F4FC]', border: 'border-[#0082CA]', text: 'text-[#0082CA]' },
    { id: 'us-open', label: 'US OPEN', bg: 'bg-[#E8EDF8]', border: 'border-[#1A3B8B]', text: 'text-[#1A3B8B]' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E2E8E4] chalk-border">
      {/* Top Banner: Heritage Crest & Editorial Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-[#E2E8E4]/60">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-sm bg-[#0E4D2B] flex items-center justify-center text-[#C5A059] shadow-sm ring-1 ring-[#C5A059]/30">
              <Trophy className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold tracking-[0.1em] text-[#0E4D2B] uppercase font-sans">
                  The Official Code & Court Archive
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7CB342]" title="System Active" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] font-serif text-[#0E4D2B] leading-none mt-0.5">
                Championship Heritage
              </h1>
            </div>
          </div>

          {/* Quick Search & Sound Action */}
          <div className="flex items-center space-x-3">
            {/* Search Input Bar (Desktop) */}
            <div className="hidden md:flex items-center relative w-64 lg:w-80">
              <Search className="w-4 h-4 text-[#717971] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search rule, term, penalty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-[#CFD8D3] focus:border-[#0E4D2B] focus:bg-white text-sm pl-9 pr-3 py-1.5 rounded-[4px] outline-none transition-colors placeholder:text-[#717971] text-[#1C2826]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 text-xs text-[#717971] hover:text-[#1C2826] px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-[4px] border border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2]"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Official Umpire Whistle/Tone button */}
            {onAudioChirp && (
              <button
                onClick={onAudioChirp}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-[4px] border border-[#C5A059] text-[#775a19] bg-[#FFFFFF] hover:bg-[#FBEFEA] transition-colors"
                title="Play Umpire Chime"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="tracking-wide">CHIME</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-[4px] border border-[#0E4D2B] text-[#0E4D2B] hover:bg-[#F1F5F2]"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="md:hidden py-3 border-b border-[#E2E8E4]">
            <div className="relative">
              <Search className="w-4 h-4 text-[#717971] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search rule, violation, term..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-[#CFD8D3] focus:border-[#0E4D2B] text-sm pl-9 pr-3 py-2 rounded-[4px] outline-none"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Navigation Tabs & Grand Slam Selector Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-2.5 gap-3">
          
          {/* Main Navigation Tabs */}
          <nav className="flex items-center space-x-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-[4px] whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0E4D2B] text-white shadow-sm ring-1 ring-[#C5A059]/40'
                      : 'text-[#404941] hover:text-[#0E4D2B] hover:bg-[#F1F5F2]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A059]' : 'text-current'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Grand Slam Tournament Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#717971] mr-1 hidden xl:inline">
              Slam Focus:
            </span>
            {tournamentChips.map((chip) => {
              const isSelected = selectedTournament === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedTournament(chip.id as GrandSlamId | 'all')}
                  className={`text-[11px] font-bold tracking-[0.08em] px-2.5 py-1 rounded-full border transition-all duration-150 whitespace-nowrap ${
                    chip.bg
                  } ${chip.border} ${chip.text} ${
                    isSelected
                      ? 'ring-2 ring-[#C5A059] shadow-xs font-extrabold scale-[1.02]'
                      : 'opacity-75 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8E4] bg-[#F8FAF8] px-4 py-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-[4px] text-sm font-medium ${
                  isActive
                    ? 'bg-[#0E4D2B] text-white'
                    : 'text-[#1C2826] hover:bg-[#F1F5F2]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-[#717971]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
