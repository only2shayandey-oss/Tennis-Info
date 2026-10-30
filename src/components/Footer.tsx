import React from 'react';
import { Trophy, Shield, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="mt-16 bg-[#00351a] text-white border-t border-[#0e4d2b] chalk-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#0e4d2b]">
          
          {/* Brand & Crest Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-sm bg-[#0E4D2B] flex items-center justify-center text-[#C5A059] ring-1 ring-[#C5A059]/40">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                Championship Heritage
              </span>
            </div>
            <p className="text-xs text-[#97d4a7] leading-relaxed">
              The definitive, interactive digital companion to the official ITF Grand Slam Code of Conduct, Centre Court traditions, and optical line-calling geometry.
            </p>
          </div>

          {/* Core Modules Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Court & Code Explorers
            </div>
            <ul className="space-y-1.5 text-xs text-[#e6f4f0]">
              <li>
                <button onClick={() => onSelectTab('court')} className="hover:text-[#C5A059] transition-colors">
                  Interactive Court & Hawk-Eye
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('rules')} className="hover:text-[#C5A059] transition-colors">
                  ITF Official Grand Slam Rules
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('violations')} className="hover:text-[#C5A059] transition-colors">
                  Code Violation Progression Ladder
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('surfaces')} className="hover:text-[#C5A059] transition-colors">
                  Grand Slam Surface Science
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Officiating Tools
            </div>
            <ul className="space-y-1.5 text-xs text-[#e6f4f0]">
              <li>
                <button onClick={() => onSelectTab('quiz')} className="hover:text-[#C5A059] transition-colors">
                  "You Make The Call" Umpire Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('scorekeeper')} className="hover:text-[#C5A059] transition-colors">
                  Live Match & Super Tiebreak Scorer
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('glossary')} className="hover:text-[#C5A059] transition-colors">
                  Historic Tennis Etymology Glossary
                </button>
              </li>
            </ul>
          </div>

          {/* Grand Slam Sanctioning Body References */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Certified Standard
            </div>
            <p className="text-xs text-[#97d4a7] leading-relaxed">
              Synthesized from the official International Tennis Federation (ITF) 2026 Rulebook, Grand Slam Tournament Regulations, and the Association of Tennis Professionals / Women's Tennis Association Judicial Handbooks.
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Etiquette Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#81bd92] gap-3">
          <div>
            © {new Date().getFullYear()} Championship Heritage • Built for connoisseurs of the lawn tennis craft.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-serif italic text-[#C5A059]">
              "Play to the chalk, respect the umpire, honor the heritage."
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
