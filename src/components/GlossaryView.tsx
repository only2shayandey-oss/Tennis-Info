import React, { useState } from 'react';
import { Compass, Search, Tag, BookOpen, Sparkles } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossaryData';
import { GlossaryTerm } from '../types/tennis';

interface GlossaryViewProps {
  searchQuery: string;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [localQuery, setLocalQuery] = useState<string>('');

  const effectiveQuery = searchQuery || localQuery;

  const categories = ['All', 'Terminology', 'Stroke', 'Scoring', 'Officiating', 'Historical'];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    if (selectedCategory !== 'All' && term.category !== selectedCategory) {
      return false;
    }

    if (effectiveQuery.trim()) {
      const q = effectiveQuery.toLowerCase();
      const matchTerm = term.term.toLowerCase().includes(q);
      const matchDef = term.definition.toLowerCase().includes(q);
      const matchEtym = term.etymology?.toLowerCase().includes(q);
      return matchTerm || matchDef || matchEtym;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-lg p-5 chalk-border court-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
                Official Tennis Lexicon & Etymology
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] font-semibold">
                Historical Heritage Dictionary
              </span>
            </div>
            <h2 className="text-2xl font-serif font-semibold text-[#1C2826] mt-1">
              Lawn Tennis Glossary & Terminology Index
            </h2>
            <p className="text-sm text-[#404941] max-w-2xl mt-0.5">
              Unpack the etymology of "Love", the mechanics of the "Kick Serve", and the historical origins of terms dating back from medieval French cloisters to the grass of Worple Road.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#717971] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search term or phrase..."
              value={effectiveQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full bg-[#F8FAF8] border border-[#CFD8D3] focus:border-[#0E4D2B] text-sm pl-9 pr-3 py-1.5 rounded-[4px] outline-none"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-5 pt-4 border-t border-[#E2E8E4] flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-[4px] font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-[#0E4D2B] text-white'
                    : 'bg-[#F8FAF8] text-[#404941] hover:bg-[#F1F5F2]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Key-Value List with Hairline Dividers (From design system spec) */}
      <div className="bg-white rounded-lg chalk-border court-shadow overflow-hidden">
        <div className="divide-y divide-[#E2E8E4]">
          {filteredTerms.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#717971]">
              No glossary terms found matching your query.
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 sm:p-6 hover:bg-[#F8FAF8] transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                {/* Term and Category (Left) */}
                <div className="md:w-1/3 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#1C2826]">
                    {item.term}
                  </h3>
                </div>

                {/* Definition & Etymology (Right) */}
                <div className="md:w-2/3 space-y-2">
                  <p className="text-sm text-[#1C2826] leading-relaxed">
                    {item.definition}
                  </p>

                  {item.etymology && (
                    <div className="text-xs text-[#775a19] italic flex items-center space-x-1.5 pt-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>Etymology: {item.etymology}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
