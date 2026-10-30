import React, { useState } from 'react';
import { 
  Calculator, 
  RotateCcw, 
  ArrowLeftRight, 
  Trophy, 
  Check, 
  CircleDot, 
  Activity, 
  Flame,
  Undo2
} from 'lucide-react';

type GameScore = '0' | '15' | '30' | '40' | 'AD';

interface MatchState {
  player1Name: string;
  player2Name: string;
  sets: { p1: number; p2: number }[];
  currentGames: { p1: number; p2: number };
  currentGamePoints: { p1: GameScore; p2: GameScore };
  tiebreakPoints: { p1: number; p2: number };
  isTiebreak: boolean;
  tiebreakTarget: 7 | 10;
  server: 1 | 2;
  servingSide: 'DEUCE' | 'AD';
  matchFinished: boolean;
  winner: string | null;
}

export const Scorekeeper: React.FC = () => {
  const [history, setHistory] = useState<MatchState[]>([]);
  const [state, setState] = useState<MatchState>({
    player1Name: 'Player 1 (Server)',
    player2Name: 'Player 2 (Receiver)',
    sets: [],
    currentGames: { p1: 5, p2: 6 },
    currentGamePoints: { p1: '40', p2: '40' }, // initialized to exciting Deuce
    tiebreakPoints: { p1: 0, p2: 0 },
    isTiebreak: false,
    tiebreakTarget: 10,
    server: 1,
    servingSide: 'DEUCE',
    matchFinished: false,
    winner: null
  });

  const saveHistory = () => {
    setHistory((prev) => [JSON.parse(JSON.stringify(state)), ...prev.slice(0, 15)]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[0];
    setState(previous);
    setHistory((prev) => prev.slice(1));
  };

  // Add point to player 1 or player 2
  const addPoint = (player: 1 | 2) => {
    if (state.matchFinished) return;
    saveHistory();

    if (state.isTiebreak) {
      // Tiebreak scoring logic
      const p1Tb = player === 1 ? state.tiebreakPoints.p1 + 1 : state.tiebreakPoints.p1;
      const p2Tb = player === 2 ? state.tiebreakPoints.p2 + 1 : state.tiebreakPoints.p2;
      const totalPoints = p1Tb + p2Tb;
      const target = state.tiebreakTarget;

      // Check if won
      const won = (p1Tb >= target && p1Tb - p2Tb >= 2) || (p2Tb >= target && p2Tb - p1Tb >= 2);
      if (won) {
        const winningPlayer = p1Tb > p2Tb ? state.player1Name : state.player2Name;
        const newSets = [...state.sets, { p1: p1Tb > p2Tb ? state.currentGames.p1 + 1 : state.currentGames.p1, p2: p2Tb > p1Tb ? state.currentGames.p2 + 1 : state.currentGames.p2 }];
        setState((s) => ({
          ...s,
          sets: newSets,
          currentGames: { p1: 0, p2: 0 },
          tiebreakPoints: { p1: p1Tb, p2: p2Tb },
          matchFinished: true,
          winner: winningPlayer
        }));
        return;
      }

      // Tiebreak server rotation: Point 1 = Server 1, then every 2 points rotate
      // Points 2 & 3 = Server 2, 4 & 5 = Server 1, etc.
      const newServer = Math.floor((totalPoints + 1) / 2) % 2 === 1 ? 2 : 1;
      const nextSide = totalPoints % 2 === 0 ? 'DEUCE' : 'AD';

      setState((s) => ({
        ...s,
        tiebreakPoints: { p1: p1Tb, p2: p2Tb },
        server: newServer,
        servingSide: nextSide
      }));
      return;
    }

    // Standard Game Scoring Logic (0, 15, 30, 40, AD)
    const p1P = state.currentGamePoints.p1;
    const p2P = state.currentGamePoints.p2;

    const sequence: Record<GameScore, GameScore> = {
      '0': '15',
      '15': '30',
      '30': '40',
      '40': 'AD',
      'AD': 'AD'
    };

    let nextP1 = p1P;
    let nextP2 = p2P;
    let gameWonBy: 1 | 2 | null = null;

    if (player === 1) {
      if (p1P === '40') {
        if (p2P === '40') {
          nextP1 = 'AD';
        } else if (p2P === 'AD') {
          nextP2 = '40';
        } else {
          gameWonBy = 1;
        }
      } else if (p1P === 'AD') {
        gameWonBy = 1;
      } else {
        nextP1 = sequence[p1P];
      }
    } else {
      if (p2P === '40') {
        if (p1P === '40') {
          nextP2 = 'AD';
        } else if (p1P === 'AD') {
          nextP1 = '40';
        } else {
          gameWonBy = 2;
        }
      } else if (p2P === 'AD') {
        gameWonBy = 2;
      } else {
        nextP2 = sequence[p2P];
      }
    }

    if (gameWonBy) {
      // Award game
      const newP1Games = gameWonBy === 1 ? state.currentGames.p1 + 1 : state.currentGames.p1;
      const newP2Games = gameWonBy === 2 ? state.currentGames.p2 + 1 : state.currentGames.p2;

      // Check if tiebreak reached at 6–6
      if (newP1Games === 6 && newP2Games === 6) {
        setState((s) => ({
          ...s,
          currentGames: { p1: 6, p2: 6 },
          currentGamePoints: { p1: '0', p2: '0' },
          isTiebreak: true,
          tiebreakPoints: { p1: 0, p2: 0 },
          server: s.server === 1 ? 2 : 1,
          servingSide: 'DEUCE'
        }));
        return;
      }

      // Check if set won (standard 6 with margin 2)
      if ((newP1Games >= 6 && newP1Games - newP2Games >= 2) || (newP2Games >= 6 && newP2Games - newP1Games >= 2)) {
        const newSets = [...state.sets, { p1: newP1Games, p2: newP2Games }];
        setState((s) => ({
          ...s,
          sets: newSets,
          currentGames: { p1: 0, p2: 0 },
          currentGamePoints: { p1: '0', p2: '0' },
          server: s.server === 1 ? 2 : 1,
          servingSide: 'DEUCE'
        }));
        return;
      }

      // Regular next game
      setState((s) => ({
        ...s,
        currentGames: { p1: newP1Games, p2: newP2Games },
        currentGamePoints: { p1: '0', p2: '0' },
        server: s.server === 1 ? 2 : 1,
        servingSide: 'DEUCE'
      }));
    } else {
      // Calculate side for next point (alternate Deuce / Ad)
      const isDeucePoint = (nextP1 === '40' && nextP2 === '40');
      let nextSide: 'DEUCE' | 'AD' = 'DEUCE';
      if (isDeucePoint) nextSide = 'DEUCE';
      else if (nextP1 === 'AD' || nextP2 === 'AD') nextSide = 'AD';
      else {
        // Point index calculation
        const pointVal = (score: GameScore) => (score === '0' ? 0 : score === '15' ? 1 : score === '30' ? 2 : 3);
        const sum = pointVal(nextP1) + pointVal(nextP2);
        nextSide = sum % 2 === 0 ? 'DEUCE' : 'AD';
      }

      setState((s) => ({
        ...s,
        currentGamePoints: { p1: nextP1, p2: nextP2 },
        servingSide: nextSide
      }));
    }
  };

  const handleStartSuperTiebreak = () => {
    saveHistory();
    setState((s) => ({
      ...s,
      currentGames: { p1: 6, p2: 6 },
      currentGamePoints: { p1: '0', p2: '0' },
      isTiebreak: true,
      tiebreakTarget: 10,
      tiebreakPoints: { p1: 0, p2: 0 },
      server: 1,
      servingSide: 'DEUCE',
      matchFinished: false,
      winner: null
    }));
  };

  const handleResetMatch = () => {
    setState({
      player1Name: 'Player 1',
      player2Name: 'Player 2',
      sets: [],
      currentGames: { p1: 0, p2: 0 },
      currentGamePoints: { p1: '0', p2: '0' },
      tiebreakPoints: { p1: 0, p2: 0 },
      isTiebreak: false,
      tiebreakTarget: 10,
      server: 1,
      servingSide: 'DEUCE',
      matchFinished: false,
      winner: null
    });
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-lg p-5 chalk-border court-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
              Grand Slam Live Match Scorekeeper
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] font-semibold">
              Official Scoring & Deciding Set Super Tiebreak Engine
            </span>
          </div>
          <h2 className="text-2xl font-serif font-semibold text-[#1C2826] mt-1">
            Championship Scorecard & Tiebreak Arbiter
          </h2>
          <p className="text-sm text-[#404941] max-w-2xl mt-0.5">
            Keep official score for live matches with automatic server rotation, deuce/ad court indicator, and the unified 10-point Grand Slam Deciding Set Super Tiebreak.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2 self-start md:self-center">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-[4px] border ${
              history.length > 0
                ? 'border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2]'
                : 'border-[#E2E8E4] text-[#CFD8D3] cursor-not-allowed'
            }`}
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          <button
            onClick={handleResetMatch}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-[4px] border border-[#CFD8D3] text-[#1C2826] hover:bg-[#F1F5F2]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#717971]" />
            <span>Reset Match</span>
          </button>
        </div>
      </div>

      {/* Main Scoreboard Display (Centre Court Stadium Style) */}
      <div className="bg-[#00351a] text-white rounded-lg p-6 chalk-border shadow-md space-y-6">
        
        {/* Stadium Scoreboard Header */}
        <div className="flex items-center justify-between border-b border-[#0e4d2b] pb-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7CB342] animate-pulse" />
            <span className="font-bold tracking-widest uppercase text-[#C5A059]">
              {state.isTiebreak ? 'GRAND SLAM 10-POINT SUPER TIEBREAK' : 'LIVE MATCH PLAY'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[#97d4a7] font-mono">
            <span>Server: {state.server === 1 ? state.player1Name : state.player2Name}</span>
            <span>•</span>
            <span className="font-bold text-white">Court: {state.servingSide} SIDE</span>
          </div>
        </div>

        {/* Score Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-[#97d4a7] border-b border-[#0e4d2b]">
                <th className="pb-2 w-12 text-center">Srv</th>
                <th className="pb-2 font-semibold">Competitor</th>
                {state.sets.map((_, idx) => (
                  <th key={idx} className="pb-2 w-12 text-center">Set {idx + 1}</th>
                ))}
                <th className="pb-2 w-16 text-center">Games</th>
                <th className="pb-2 w-24 text-center text-[#fed488] font-bold">
                  {state.isTiebreak ? 'Points' : 'Points'}
                </th>
                <th className="pb-2 w-32 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0e4d2b]">
              
              {/* Player 1 Row */}
              <tr className="hover:bg-[#0e4d2b]/30 transition-colors">
                <td className="py-4 text-center">
                  {state.server === 1 && (
                    <div className="w-4 h-4 rounded-full bg-[#7CB342] mx-auto flex items-center justify-center text-[10px] text-[#00351a] font-bold">
                      ●
                    </div>
                  )}
                </td>
                <td className="py-4 font-serif text-lg font-bold">
                  <input
                    type="text"
                    value={state.player1Name}
                    onChange={(e) => setState({ ...state, player1Name: e.target.value })}
                    className="bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none text-white w-48 font-serif"
                  />
                </td>
                {state.sets.map((s, idx) => (
                  <td key={idx} className="py-4 text-center font-mono text-lg font-semibold text-[#cfddd9]">
                    {s.p1}
                  </td>
                ))}
                <td className="py-4 text-center font-mono text-2xl font-bold text-white">
                  {state.currentGames.p1}
                </td>
                <td className="py-4 text-center font-mono text-3xl font-extrabold text-[#fed488]">
                  {state.isTiebreak ? state.tiebreakPoints.p1 : state.currentGamePoints.p1}
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => addPoint(1)}
                    disabled={state.matchFinished}
                    className="px-4 py-2 rounded-[4px] bg-[#C5A059] text-[#1C2826] font-bold text-xs uppercase tracking-wider hover:bg-[#fed488] transition-colors disabled:opacity-50"
                  >
                    + Point P1
                  </button>
                </td>
              </tr>

              {/* Player 2 Row */}
              <tr className="hover:bg-[#0e4d2b]/30 transition-colors">
                <td className="py-4 text-center">
                  {state.server === 2 && (
                    <div className="w-4 h-4 rounded-full bg-[#7CB342] mx-auto flex items-center justify-center text-[10px] text-[#00351a] font-bold">
                      ●
                    </div>
                  )}
                </td>
                <td className="py-4 font-serif text-lg font-bold">
                  <input
                    type="text"
                    value={state.player2Name}
                    onChange={(e) => setState({ ...state, player2Name: e.target.value })}
                    className="bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none text-white w-48 font-serif"
                  />
                </td>
                {state.sets.map((s, idx) => (
                  <td key={idx} className="py-4 text-center font-mono text-lg font-semibold text-[#cfddd9]">
                    {s.p2}
                  </td>
                ))}
                <td className="py-4 text-center font-mono text-2xl font-bold text-white">
                  {state.currentGames.p2}
                </td>
                <td className="py-4 text-center font-mono text-3xl font-extrabold text-[#fed488]">
                  {state.isTiebreak ? state.tiebreakPoints.p2 : state.currentGamePoints.p2}
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => addPoint(2)}
                    disabled={state.matchFinished}
                    className="px-4 py-2 rounded-[4px] bg-[#C5A059] text-[#1C2826] font-bold text-xs uppercase tracking-wider hover:bg-[#fed488] transition-colors disabled:opacity-50"
                  >
                    + Point P2
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Tactical Match Status Banner */}
        <div className="bg-[#0e4d2b] p-3 rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-[#e6f4f0]">
            <Activity className="w-4 h-4 text-[#7CB342]" />
            <span>
              {state.currentGamePoints.p1 === '40' && state.currentGamePoints.p2 === '40'
                ? 'DEUCE — Advantage point required to win game'
                : state.currentGamePoints.p1 === 'AD' || state.currentGamePoints.p2 === 'AD'
                ? `ADVANTAGE ${state.currentGamePoints.p1 === 'AD' ? state.player1Name : state.player2Name} — Game Point`
                : state.isTiebreak
                ? `Deciding Super Tiebreak — First to ${state.tiebreakTarget} by 2 points (Change ends every 6 points)`
                : 'Standard set progression: First to 6 games with 2-game margin'}
            </span>
          </div>

          {!state.isTiebreak && (
            <button
              onClick={handleStartSuperTiebreak}
              className="text-[#C5A059] hover:underline font-bold self-start sm:self-auto"
            >
              Simulate 10-Point Super Tiebreak at 6–6
            </button>
          )}
        </div>

        {/* Winner Banner if match concluded */}
        {state.matchFinished && (
          <div className="bg-[#fed488] text-[#1C2826] p-4 rounded-[4px] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-[#775a19]" />
              <span className="font-serif font-bold text-base">
                Victory to {state.winner}! Championship Concluded.
              </span>
            </div>
            <button
              onClick={handleResetMatch}
              className="px-3 py-1.5 rounded-[4px] bg-[#0E4D2B] text-white text-xs font-semibold"
            >
              Start New Match
            </button>
          </div>
        )}

      </div>

      {/* Educational Guide on Tennis Scoring & The 10-Point Tiebreak Rule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Origin of 15-30-40 */}
        <div className="bg-white rounded-lg p-5 chalk-border court-shadow space-y-2">
          <h3 className="text-base font-serif font-semibold text-[#1C2826]">
            Why 15, 30, 40? (Historical Clock-Face Scoring)
          </h3>
          <p className="text-xs text-[#404941] leading-relaxed">
            Lawn tennis scoring dates back to medieval French <em>Jeu de Paume</em>. A clock face in the courtyard was used to keep score: the minute hand moved 15 minutes each point (15, 30, 45). Because 45 was considered cumbersome to shout across the court, players shortened it to "40".
          </p>
        </div>

        {/* Unified Grand Slam Tiebreak Rule */}
        <div className="bg-white rounded-lg p-5 chalk-border court-shadow space-y-2">
          <h3 className="text-base font-serif font-semibold text-[#1C2826]">
            The Unified 10-Point Super Tiebreak Rule (2022)
          </h3>
          <p className="text-xs text-[#404941] leading-relaxed">
            Prior to 2022, all 4 Grand Slams had different final set rules (Wimbledon played a tiebreak at 12–12, Roland-Garros played to infinity, US Open at 6–6 with 7 points, Australian Open at 6–6 with 10 points). The Grand Slam Board ratified the universal 10-point tiebreak at 6–6 in all final sets.
          </p>
        </div>

      </div>
    </div>
  );
};
