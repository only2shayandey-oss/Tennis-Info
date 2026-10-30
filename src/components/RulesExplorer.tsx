import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Quote, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Tag, 
  ExternalLink,
  ShieldAlert,
  Scale
} from 'lucide-react';
import { TennisRule, RuleCategory, GrandSlamId } from '../types/tennis';
import { RULES_DATA } from '../data/rulesData';

interface RulesExplorerProps {
  searchQuery: string;
  selectedTournament: GrandSlamId | 'all';
  onSelectTournament: (slam: GrandSlamId | 'all') => void;
}

export const RulesExplorer: React.FC<RulesExplorerProps> = ({
  searchQuery,
  selectedTournament,
  onSelectTournament
}) => {
  const [selectedCategory, setSelectedCategory] = useState<RuleCategory>('all');
  const [expandedRuleIds, setExpandedRuleIds] = useState<Set<string>>(new Set(['foot-fault', 'underhand-serve', 'touching-net']));
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set(['underhand-serve']));
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'LEGAL' | 'FAULT' | 'PROCEDURE'>('ALL');

  const categories: { id: RuleCategory; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'serve', label: 'Serve & Delivery' },
    { id: 'rally', label: 'Rallies & In-Play' },
    { id: 'faults', label: 'Faults & Line Calls' },
    { id: 'hindrance', label: 'Hindrance & Touch' },
    { id: 'scoring', label: 'Scoring & Super Tiebreak' },
    { id: 'equipment', label: 'Equipment & Attire' },
    { id: 'conduct', label: 'Pace & Conduct' }
  ];

  const toggleExpand = (id: string) => {
    setExpandedRuleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter rules based on search, tournament, category, status
  const filteredRules = RULES_DATA.filter((rule) => {
    // Tournament filter
    if (selectedTournament !== 'all' && !rule.tournaments.includes('all') && !rule.tournaments.includes(selectedTournament)) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && rule.category !== selectedCategory) {
      return false;
    }

    // Status filter
    if (statusFilter === 'LEGAL' && rule.status !== 'LEGAL PLAY') return false;
    if (statusFilter === 'FAULT' && rule.status !== 'FAULT' && rule.status !== 'INFRACTION') return false;
    if (statusFilter === 'PROCEDURE' && rule.status !== 'PROCEDURE') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rule.title.toLowerCase().includes(q);
      const matchSummary = rule.summary.toLowerCase().includes(q);
      const matchNote = rule.umpiresNote.toLowerCase().includes(q);
      const matchRuleNum = rule.itfRule.toLowerCase().includes(q);
      const matchTags = rule.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchNote || matchRuleNum || matchTags;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Overview Card */}
      <div className="bg-white rounded-lg p-5 chalk-border court-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
                Official ITF Rules of Tennis & Grand Slam Code
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] font-semibold">
                Updated 2026 Season Codification
              </span>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#1C2826] mt-1">
              Grand Slam Rulebook & Chair Umpire Directives
            </h2>
            <p className="text-sm text-[#404941] max-w-2xl mt-0.5">
              Comprehensive legal clauses, fault classifications, and practical "Umpire's Notes" used by certified gold badge umpires on Centre Court and Arthur Ashe Stadium.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-3 bg-[#F8FAF8] p-3 rounded-[4px] border border-[#E2E8E4]">
            <div className="text-center px-3 border-r border-[#E2E8E4]">
              <div className="text-lg font-bold font-serif text-[#0E4D2B]">{filteredRules.length}</div>
              <div className="text-[10px] uppercase font-bold text-[#717971] tracking-wider">Rules Active</div>
            </div>
            <div className="text-center px-3">
              <div className="text-lg font-bold font-serif text-[#C5A059]">{bookmarkedIds.size}</div>
              <div className="text-[10px] uppercase font-bold text-[#717971] tracking-wider">Saved Case Studies</div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-5 pt-4 border-t border-[#E2E8E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3 py-1.5 rounded-[4px] font-semibold whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#0E4D2B] text-white'
                      : 'bg-[#F8FAF8] text-[#404941] hover:bg-[#F1F5F2]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold text-[#717971] uppercase tracking-wider mr-1 hidden md:inline">
              Ruling:
            </span>
            {(['ALL', 'LEGAL', 'FAULT', 'PROCEDURE'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-[4px] border transition-colors ${
                  statusFilter === status
                    ? 'bg-[#1C2826] text-white border-[#1C2826]'
                    : 'bg-[#FFFFFF] text-[#717971] border-[#CFD8D3] hover:bg-[#F1F5F2]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredRules.length === 0 ? (
          <div className="bg-white rounded-lg p-10 text-center chalk-border court-shadow">
            <div className="w-12 h-12 rounded-full bg-[#F1F5F2] text-[#717971] flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-semibold text-[#1C2826]">No Matching Rules Found</h3>
            <p className="text-sm text-[#404941] max-w-md mx-auto mt-1">
              Try adjusting your search query or reset the tournament and category filters to explore the full rulebook.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setStatusFilter('ALL');
                onSelectTournament('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-[4px] bg-[#0E4D2B] text-white hover:bg-[#00351a]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredRules.map((rule) => {
            const isExpanded = expandedRuleIds.has(rule.id);
            const isBookmarked = bookmarkedIds.has(rule.id);
            const isLegal = rule.status === 'LEGAL PLAY';
            const isFault = rule.status === 'FAULT' || rule.status === 'INFRACTION';
            const accentColor = isLegal ? '#2E7D32' : isFault ? '#C35831' : '#775a19';

            return (
              <div
                key={rule.id}
                className="bg-white rounded-lg chalk-border court-shadow overflow-hidden transition-all duration-200"
                style={{ borderLeft: `4px solid ${accentColor}` }}
              >
                {/* Rule Card Header Banner */}
                <div 
                  onClick={() => toggleExpand(rule.id)}
                  className="p-5 cursor-pointer hover:bg-[#F8FAF8] transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    {/* Badge and Rule Citation Row */}
                    <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                      {/* Status Tag */}
                      <span className={`text-[10px] font-bold tracking-[0.08em] px-2 py-0.5 rounded-full uppercase ${
                        isLegal ? 'bg-[#E8F2EC] text-[#2E7D32] border border-[#2E7D32]/30' :
                        isFault ? 'bg-[#FBEFEA] text-[#C35831] border border-[#C35831]/30' :
                        'bg-[#FFF8E7] text-[#775a19] border border-[#775a19]/30'
                      }`}>
                        {rule.status}
                      </span>

                      {/* Official Rule Citation */}
                      <span className="text-xs font-mono font-semibold text-[#717971]">
                        {rule.itfRule}
                      </span>

                      {/* Tournament Badges */}
                      {rule.tournaments.includes('all') ? (
                        <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F1F5F2] text-[#404941]">
                          ALL GRAND SLAMS
                        </span>
                      ) : (
                        rule.tournaments.map((t) => (
                          <span 
                            key={t}
                            className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] uppercase"
                          >
                            {t}
                          </span>
                        ))
                      )}
                    </div>

                    {/* Rule Title */}
                    <h3 className="text-xl font-serif font-semibold text-[#1C2826] flex items-center space-x-2">
                      <span>{rule.title}</span>
                    </h3>

                    {/* High-Level Summary */}
                    <p className="text-sm text-[#404941] leading-relaxed">
                      {rule.summary}
                    </p>
                  </div>

                  {/* Actions (Bookmark + Expand) */}
                  <div className="flex items-center space-x-2 self-end sm:self-start">
                    <button
                      onClick={(e) => toggleBookmark(rule.id, e)}
                      className={`p-1.5 rounded-[4px] border transition-colors ${
                        isBookmarked
                          ? 'bg-[#C5A059] text-white border-[#C5A059]'
                          : 'border-[#CFD8D3] text-[#717971] hover:bg-[#F1F5F2]'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Save Rule'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      className="p-1.5 rounded-[4px] border border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2]"
                      aria-label={isExpanded ? 'Collapse rule' : 'Expand rule'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Clauses & Umpire's Note Section */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#E2E8E4]/60 space-y-4">
                    
                    {/* Clause Breakdown */}
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#717971] mb-2 flex items-center space-x-1.5">
                        <Scale className="w-3.5 h-3.5 text-[#0E4D2B]" />
                        <span>Rule Anatomy & Specific Clauses:</span>
                      </div>
                      <div className="space-y-2">
                        {rule.clauses.map((clause, idx) => (
                          <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#1C2826] leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-[#F1F5F2] text-[#0E4D2B] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-[#E2E8E4]">
                              {idx + 1}
                            </span>
                            <span>{clause}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Umpire's Note Callout Card */}
                    <div className="bg-[#F1F5F2] rounded-[4px] p-4 border border-[#E2E8E4] relative overflow-hidden">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#C5A059] flex items-center justify-center text-[#C5A059] shrink-0 shadow-xs">
                          <Quote className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#775a19] mb-1">
                            Umpire's Certified Interpretation
                          </div>
                          <p className="text-xs font-serif italic text-[#1C2826] leading-relaxed">
                            "{rule.umpiresNote}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center space-x-1.5 flex-wrap pt-1">
                      <Tag className="w-3 h-3 text-[#717971] mr-1" />
                      {rule.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-[4px] bg-[#F8FAF8] border border-[#E2E8E4] text-[#404941]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
