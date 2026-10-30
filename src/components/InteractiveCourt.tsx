import React, { useState, useRef } from 'react';
import { 
  Maximize2, 
  Eye, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Compass, 
  Info,
  Sparkles
} from 'lucide-react';
import { CourtSurface, GrandSlamId } from '../types/tennis';
import { COURT_ZONES, PRESET_HAWKEYE_POINTS, HawkEyeTestPoint } from '../data/courtData';

interface InteractiveCourtProps {
  selectedTournament: GrandSlamId | 'all';
  onSelectTournament: (slam: GrandSlamId) => void;
}

export const InteractiveCourt: React.FC<InteractiveCourtProps> = ({
  selectedTournament,
  onSelectTournament
}) => {
  // Surface mode (sync with selected tournament or independent toggle)
  const [surface, setSurface] = useState<CourtSurface>(() => {
    if (selectedTournament === 'roland-garros') return 'clay';
    if (selectedTournament === 'australian-open') return 'cyan-hard';
    if (selectedTournament === 'us-open') return 'decoturf-blue';
    return 'grass';
  });

  const [selectedZoneId, setSelectedZoneId] = useState<string>('deuce-service-box-near');
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [ballPosition, setBallPosition] = useState<{ xPercent: number; yPercent: number }>({
    xPercent: 52,
    yPercent: 74.8
  });
  const [currentVerdict, setCurrentVerdict] = useState<HawkEyeTestPoint>(PRESET_HAWKEYE_POINTS[0]);
  const [hawkEyeMode, setHawkEyeMode] = useState<boolean>(true);

  const courtRef = useRef<HTMLDivElement>(null);

  // Sync surface when tournament prop changes
  React.useEffect(() => {
    if (selectedTournament === 'roland-garros') setSurface('clay');
    else if (selectedTournament === 'australian-open') setSurface('cyan-hard');
    else if (selectedTournament === 'us-open') setSurface('decoturf-blue');
    else if (selectedTournament === 'wimbledon') setSurface('grass');
  }, [selectedTournament]);

  // Surface visual styles
  const surfaceStyles: Record<CourtSurface, {
    outer: string;
    inner: string;
    lines: string;
    net: string;
    name: string;
    slamName: string;
    textureClass: string;
  }> = {
    grass: {
      outer: '#114424',
      inner: '#185630',
      lines: '#FFFFFF',
      net: '#FFFFFF',
      name: 'Wimbledon Centre Court Grass',
      slamName: 'Wimbledon',
      textureClass: 'bg-[radial-gradient(#1e6b3c_1px,transparent_1px)] [background-size:16px_16px]'
    },
    clay: {
      outer: '#A6421F',
      inner: '#C8572B',
      lines: '#FFFFFF',
      net: '#F3E8E2',
      name: 'Roland-Garros Terre Battue Clay',
      slamName: 'Roland-Garros',
      textureClass: 'bg-[radial-gradient(#963919_1px,transparent_1px)] [background-size:12px_12px]'
    },
    'cyan-hard': {
      outer: '#0A2540',
      inner: '#0084CC',
      lines: '#FFFFFF',
      net: '#FFFFFF',
      name: 'Australian Open Cyan Hardcourt',
      slamName: 'Australian Open',
      textureClass: 'bg-[radial-gradient(#0070ad_1px,transparent_1px)] [background-size:20px_20px]'
    },
    'decoturf-blue': {
      outer: '#1A4D2E',
      inner: '#1B3B8B',
      lines: '#FFFFFF',
      net: '#FFFFFF',
      name: 'US Open DecoTurf Blue & Green',
      slamName: 'US Open',
      textureClass: 'bg-[radial-gradient(#153073_1px,transparent_1px)] [background-size:18px_18px]'
    }
  };

  const currentSurfaceStyle = surfaceStyles[surface];
  const selectedZone = COURT_ZONES.find((z) => z.id === selectedZoneId) || COURT_ZONES[0];

  // Calculate Hawk-Eye verdict based on coordinates (Court SVG coordinate space: x 0..100%, y 0..100%)
  const calculateVerdict = (x: number, y: number): HawkEyeTestPoint => {
    // Singles bounds: x from 20% to 80%
    // Baseline bounds: y from 25% to 75%
    const singlesLeft = 20;
    const singlesRight = 80;
    const baselineNear = 75;
    const baselineFar = 25;
    const netY = 50;

    let verdict: 'IN' | 'OUT' | 'LET' | 'FAULT' = 'IN';
    let marginMm = 4;
    let explanation = '';

    const distFromBaselineNear = Math.abs(y - baselineNear);
    const distFromSinglesLeft = Math.abs(x - singlesLeft);
    const distFromSinglesRight = Math.abs(x - singlesRight);

    if (y > 75.3) {
      verdict = 'OUT';
      marginMm = Math.round((y - 75) * 8);
      explanation = `Ball landed ${marginMm}mm long behind the baseline. Ruled OUT.`;
    } else if (y < 24.7) {
      verdict = 'OUT';
      marginMm = Math.round((25 - y) * 8);
      explanation = `Ball landed ${marginMm}mm beyond the far baseline. Ruled OUT.`;
    } else if (x < 19.7) {
      verdict = 'OUT';
      marginMm = Math.round((20 - x) * 9);
      explanation = `Ball landed ${marginMm}mm wide of the singles tramline into the doubles alley.`;
    } else if (x > 80.3) {
      verdict = 'OUT';
      marginMm = Math.round((x - 80) * 9);
      explanation = `Ball landed ${marginMm}mm wide of the right singles sideline.`;
    } else if (distFromBaselineNear < 1.0) {
      verdict = 'IN';
      marginMm = Math.max(1, Math.round(distFromBaselineNear * 4));
      explanation = `Chalk graze! Contact ellipse overlaps the white baseline chalk by ${marginMm}mm. Ruled 100% IN.`;
    } else if (distFromSinglesLeft < 1.0 || distFromSinglesRight < 1.0) {
      verdict = 'IN';
      marginMm = 2;
      explanation = `Sideline kiss! Ball touched the outer margin of the chalk line. Legal point.`;
    } else if (Math.abs(y - netY) < 1.5) {
      verdict = 'LET';
      marginMm = 0;
      explanation = `Net cord strike! The ball grazed the tape cord. If during serve, replayed as Let.`;
    } else {
      verdict = 'IN';
      marginMm = 35;
      explanation = `Clean placement deep inside the legal court boundaries. Verified by optical tracking.`;
    }

    return {
      label: `Custom Mark (${x.toFixed(1)}%, ${y.toFixed(1)}%)`,
      xPercent: x,
      yPercent: y,
      verdict,
      marginMm,
      explanation
    };
  };

  const handleCourtClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!courtRef.current) return;
    const rect = courtRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));

    setBallPosition({ xPercent: clampedX, yPercent: clampedY });
    const verdict = calculateVerdict(clampedX, clampedY);
    setCurrentVerdict(verdict);
  };

  const applyPreset = (preset: HawkEyeTestPoint) => {
    setBallPosition({ xPercent: preset.xPercent, yPercent: preset.yPercent });
    setCurrentVerdict(preset);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Surface Selector Controls */}
      <div className="bg-white rounded-lg p-5 chalk-border court-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
              Official ITF Specification Dimensions
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#0E4D2B] font-semibold">
              78 ft × 36 ft (23.77m × 10.97m)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#1C2826] mt-1">
            Interactive Court Geometry & Hawk-Eye Optical Tracker
          </h2>
          <p className="text-sm text-[#404941] max-w-2xl mt-0.5">
            Explore the exact millimeter divisions of Grand Slam courts. Tap any court zone or click to place the ball to trigger real-time Hawk-Eye line call calculations.
          </p>
        </div>

        {/* Surface Toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-[#717971] uppercase tracking-wider mr-1">Surface:</span>
          {(['grass', 'clay', 'cyan-hard', 'decoturf-blue'] as CourtSurface[]).map((surf) => {
            const isCurrent = surface === surf;
            const labels: Record<CourtSurface, string> = {
              grass: 'Grass (Wimbledon)',
              clay: 'Clay (Paris)',
              'cyan-hard': 'Cyan (AO)',
              'decoturf-blue': 'Blue (US Open)'
            };
            return (
              <button
                key={surf}
                onClick={() => setSurface(surf)}
                className={`text-xs px-3 py-1.5 rounded-[4px] font-semibold border transition-all ${
                  isCurrent
                    ? 'bg-[#0E4D2B] text-white border-[#C5A059] ring-1 ring-[#C5A059]'
                    : 'bg-[#F8FAF8] text-[#1C2826] border-[#CFD8D3] hover:bg-[#F1F5F2]'
                }`}
              >
                {labels[surf]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Court Visualizer on Left (8 cols) & Zone / Hawk-Eye Panel on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive SVG Tennis Court */}
        <div className="lg:col-span-8 bg-white rounded-lg p-4 sm:p-6 chalk-border court-shadow space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentSurfaceStyle.inner }} />
              <span className="text-sm font-bold text-[#1C2826]">{currentSurfaceStyle.name}</span>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={() => setShowDimensions(!showDimensions)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-[4px] border ${
                  showDimensions
                    ? 'bg-[#E8F2EC] text-[#0E4D2B] border-[#0E4D2B]'
                    : 'bg-[#F8FAF8] text-[#717971] border-[#CFD8D3]'
                }`}
              >
                <Maximize2 className="w-3 h-3" />
                <span>Dimensions</span>
              </button>

              <button
                onClick={() => setHawkEyeMode(!hawkEyeMode)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-[4px] border ${
                  hawkEyeMode
                    ? 'bg-[#0E4D2B] text-white border-[#C5A059]'
                    : 'bg-[#F8FAF8] text-[#717971] border-[#CFD8D3]'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Hawk-Eye Mode</span>
              </button>
            </div>
          </div>

          {/* Interactive SVG Court Container */}
          <div 
            ref={courtRef}
            onClick={handleCourtClick}
            className={`relative w-full aspect-[4/3] rounded-md overflow-hidden cursor-crosshair select-none border border-[#E2E8E4] ${currentSurfaceStyle.textureClass}`}
            style={{ backgroundColor: currentSurfaceStyle.outer }}
          >
            {/* The SVG Court */}
            <svg
              viewBox="0 0 1000 750"
              className="w-full h-full drop-shadow-md"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Outer Court Surroundings */}
              <rect x="0" y="0" width="1000" height="750" fill={currentSurfaceStyle.outer} />

              {/* Inner In-Play Court Bed */}
              {/* Width: 600, Height: 600, centered from x=200, y=75 */}
              <rect 
                x="200" 
                y="75" 
                width="600" 
                height="600" 
                fill={currentSurfaceStyle.inner} 
                stroke="#FFFFFF" 
                strokeWidth="6" 
              />

              {/* Doubles Sidelines (Outer Boundaries of Singles Court) */}
              {/* Singles Court is 450 wide, Doubles is 600 wide (Tramlines are 75 wide on each side) */}
              {/* Left Singles Sideline */}
              <line x1="275" y1="75" x2="275" y2="675" stroke="#FFFFFF" strokeWidth="5" />
              {/* Right Singles Sideline */}
              <line x1="725" y1="75" x2="725" y2="675" stroke="#FFFFFF" strokeWidth="5" />

              {/* Baselines (Far baseline y=75, Near baseline y=675) */}
              <line x1="200" y1="75" x2="800" y2="75" stroke="#FFFFFF" strokeWidth="8" />
              <line x1="200" y1="675" x2="800" y2="675" stroke="#FFFFFF" strokeWidth="8" />

              {/* Center Marks on Baselines */}
              <line x1="500" y1="75" x2="500" y2="95" stroke="#FFFFFF" strokeWidth="5" />
              <line x1="500" y1="655" x2="500" y2="675" stroke="#FFFFFF" strokeWidth="5" />

              {/* Service Lines (21 ft from net = y=225 for far, y=525 for near) */}
              <line x1="275" y1="225" x2="725" y2="225" stroke="#FFFFFF" strokeWidth="5" />
              <line x1="275" y1="525" x2="725" y2="525" stroke="#FFFFFF" strokeWidth="5" />

              {/* Center Service Line ("The T") dividing the service boxes (from y=225 to y=525) */}
              <line x1="500" y1="225" x2="500" y2="525" stroke="#FFFFFF" strokeWidth="5" />

              {/* THE NET & CENTER STRAP (at y=375) */}
              {/* Net cord shadow */}
              <rect x="180" y="373" width="640" height="4" fill="rgba(0,0,0,0.3)" />
              {/* Net Cord */}
              <line x1="180" y1="375" x2="820" y2="375" stroke="#E2E8E4" strokeWidth="4" />
              {/* Net Posts */}
              <circle cx="180" cy="375" r="7" fill="#2D3748" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="820" cy="375" r="7" fill="#2D3748" stroke="#FFFFFF" strokeWidth="2" />
              {/* Center White Strap */}
              <rect x="496" y="365" width="8" height="20" fill="#FFFFFF" rx="1" />

              {/* Umpire Chair Icon on Left Post */}
              <g transform="translate(130, 345)">
                <rect x="0" y="0" width="34" height="60" fill="#1C2826" rx="2" stroke="#C5A059" strokeWidth="1.5" />
                <line x1="5" y1="15" x2="29" y2="15" stroke="#C5A059" strokeWidth="1" />
                <line x1="5" y1="30" x2="29" y2="30" stroke="#C5A059" strokeWidth="1" />
                <line x1="5" y1="45" x2="29" y2="45" stroke="#C5A059" strokeWidth="1" />
                <text x="17" y="55" fill="#C5A059" fontSize="8" fontWeight="bold" textAnchor="middle">UMP</text>
              </g>

              {/* Interactive Zone Overlays (Hover/Click Targets) */}
              {/* Deuce Service Box Near (x: 500..725, y: 375..525) */}
              <rect
                x="500"
                y="375"
                width="225"
                height="150"
                fill={selectedZoneId === 'deuce-service-box-near' ? 'rgba(197, 160, 89, 0.28)' : 'transparent'}
                stroke={selectedZoneId === 'deuce-service-box-near' ? '#C5A059' : 'transparent'}
                strokeWidth="3"
                className="hover:fill-white/10 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('deuce-service-box-near');
                }}
              />

              {/* Ad Service Box Near (x: 275..500, y: 375..525) */}
              <rect
                x="275"
                y="375"
                width="225"
                height="150"
                fill={selectedZoneId === 'ad-service-box-near' ? 'rgba(197, 160, 89, 0.28)' : 'transparent'}
                stroke={selectedZoneId === 'ad-service-box-near' ? '#C5A059' : 'transparent'}
                strokeWidth="3"
                className="hover:fill-white/10 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('ad-service-box-near');
                }}
              />

              {/* Doubles Tramline Left (x: 200..275, y: 75..675) */}
              <rect
                x="200"
                y="75"
                width="75"
                height="600"
                fill={selectedZoneId === 'doubles-alley' ? 'rgba(197, 160, 89, 0.28)' : 'transparent'}
                stroke={selectedZoneId === 'doubles-alley' ? '#C5A059' : 'transparent'}
                strokeWidth="3"
                className="hover:fill-white/10 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('doubles-alley');
                }}
              />

              {/* Backcourt Near (No-Man's Land) (x: 275..725, y: 525..675) */}
              <rect
                x="275"
                y="525"
                width="450"
                height="150"
                fill={selectedZoneId === 'backcourt-near' ? 'rgba(197, 160, 89, 0.28)' : 'transparent'}
                stroke={selectedZoneId === 'backcourt-near' ? '#C5A059' : 'transparent'}
                strokeWidth="3"
                className="hover:fill-white/10 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZoneId('backcourt-near');
                }}
              />

              {/* Dimensions Labels if enabled */}
              {showDimensions && (
                <g fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="Hanken Grotesk, sans-serif" opacity="0.9">
                  {/* Baseline width */}
                  <text x="500" y="705" textAnchor="middle">36 ft (10.97m) Doubles Baseline</text>
                  <text x="500" y="665" textAnchor="middle" fontSize="10" fill="#E2E8E4">27 ft (8.23m) Singles Width</text>
                  
                  {/* Service box dimensions */}
                  <text x="612" y="455" textAnchor="middle" fontSize="10">21 ft × 13.5 ft</text>
                  <text x="387" y="455" textAnchor="middle" fontSize="10">21 ft × 13.5 ft</text>

                  {/* Net height */}
                  <text x="500" y="360" textAnchor="middle" fill="#C5A059" fontSize="10">Net: 3 ft (0.914m) Center</text>
                  <text x="180" y="355" textAnchor="middle" fill="#C5A059" fontSize="9">3.5 ft Post</text>
                  <text x="820" y="355" textAnchor="middle" fill="#C5A059" fontSize="9">3.5 ft Post</text>
                  
                  {/* Tramline width */}
                  <text x="237" y="370" textAnchor="middle" fontSize="9">4.5 ft</text>
                </g>
              )}
            </svg>

            {/* Simulated Tennis Ball Placement with Hawk-Eye Target Rings */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200"
              style={{
                left: `${ballPosition.xPercent}%`,
                top: `${ballPosition.yPercent}%`
              }}
            >
              {/* Outer pulsing laser ring */}
              <div className="w-9 h-9 -ml-1 -mt-1 rounded-full border-2 border-[#7CB342] animate-ping opacity-75" />
              
              {/* Tennis Ball with Felt Texture and Seam */}
              <div className="absolute top-0 left-0 w-7 h-7 rounded-full bg-[#7CB342] shadow-lg border border-white flex items-center justify-center">
                {/* Curved Tennis Ball Seam */}
                <div className="w-5 h-5 rounded-full border border-white/60 border-dashed" />
              </div>

              {/* Callout Marker Tag */}
              <div className={`absolute left-8 -top-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase whitespace-nowrap shadow-md text-white ${
                currentVerdict.verdict === 'IN' 
                  ? 'bg-[#2E7D32]' 
                  : currentVerdict.verdict === 'OUT' 
                  ? 'bg-[#C35831]' 
                  : 'bg-[#775a19]'
              }`}>
                {currentVerdict.verdict} • {currentVerdict.marginMm}mm
              </div>
            </div>

            {/* Click-to-test Hint Pill */}
            <div className="absolute bottom-3 left-3 bg-[#1C2826]/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-[4px] text-xs flex items-center space-x-1.5 pointer-events-none border border-white/20">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Tap anywhere on court to test Hawk-Eye ball bounce</span>
            </div>
          </div>

          {/* Hawk-Eye Preset Scenarios */}
          <div>
            <div className="text-xs font-bold text-[#717971] uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Preset Optical Test Scenarios:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_HAWKEYE_POINTS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className={`text-xs px-3 py-1.5 rounded-[4px] font-medium border transition-colors ${
                    preset.label === currentVerdict.label
                      ? 'bg-[#0E4D2B] text-white border-[#C5A059]'
                      : 'bg-[#F8FAF8] text-[#1C2826] border-[#CFD8D3] hover:bg-[#F1F5F2]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hawk-Eye Verdict & Selected Zone Intelligence Card */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Hawk-Eye Live Call Decision Box */}
          <div className="bg-white rounded-lg p-5 chalk-border court-shadow">
            <div className="flex items-center justify-between border-b border-[#E2E8E4] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#0E4D2B] text-[#C5A059] flex items-center justify-center font-bold text-xs">
                  HE
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-[#0E4D2B]">
                  Hawk-Eye Optical Ruling
                </span>
              </div>
              <span className="text-[11px] text-[#717971] font-mono">±1.2mm Accuracy</span>
            </div>

            {/* Verdict Display */}
            <div className="flex items-center space-x-3 mb-3">
              {currentVerdict.verdict === 'IN' ? (
                <div className="w-12 h-12 rounded-[4px] bg-[#E8F2EC] border border-[#2E7D32] flex items-center justify-center text-[#2E7D32]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : currentVerdict.verdict === 'OUT' ? (
                <div className="w-12 h-12 rounded-[4px] bg-[#FBEFEA] border border-[#C35831] flex items-center justify-center text-[#C35831]">
                  <XCircle className="w-8 h-8" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-[4px] bg-[#FFF8E7] border border-[#775a19] flex items-center justify-center text-[#775a19]">
                  <HelpCircle className="w-8 h-8" />
                </div>
              )}

              <div>
                <div className="text-2xl font-bold font-serif leading-none flex items-center space-x-2">
                  <span className={
                    currentVerdict.verdict === 'IN' ? 'text-[#2E7D32]' :
                    currentVerdict.verdict === 'OUT' ? 'text-[#C35831]' : 'text-[#775a19]'
                  }>
                    {currentVerdict.verdict}
                  </span>
                  <span className="text-sm font-sans font-normal text-[#717971]">
                    ({currentVerdict.marginMm} mm margin)
                  </span>
                </div>
                <div className="text-xs text-[#717971] mt-0.5">
                  Coordinate: X {ballPosition.xPercent.toFixed(1)}% | Y {ballPosition.yPercent.toFixed(1)}%
                </div>
              </div>
            </div>

            <p className="text-xs text-[#1C2826] leading-relaxed bg-[#F8FAF8] p-3 rounded-[4px] border border-[#E2E8E4]">
              {currentVerdict.explanation}
            </p>

            <div className="mt-3 text-[11px] text-[#717971] italic">
              ITF Grand Slam Standard: "If any fraction of the ball’s contact patch touches the white chalk line, the shot is legally IN."
            </div>
          </div>

          {/* Court Zone Breakdown Card */}
          <div className="bg-white rounded-lg p-5 chalk-border court-shadow border-l-[3px] border-l-[#2E7D32]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-[0.08em] text-[#0E4D2B] uppercase">
                Zone Intelligence
              </span>
              <span className="text-[11px] text-[#717971] font-mono">{selectedZone.dimensions}</span>
            </div>

            <h3 className="text-lg font-serif font-semibold text-[#1C2826] mb-1">
              {selectedZone.name}
            </h3>

            <p className="text-xs text-[#404941] leading-relaxed mb-3">
              {selectedZone.description}
            </p>

            {/* Tactical Advantage */}
            <div className="mb-3 bg-[#F1F5F2] p-2.5 rounded-[4px] border border-[#E2E8E4]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#0E4D2B] mb-0.5">
                Grand Slam Tactical Key
              </div>
              <div className="text-xs text-[#1C2826]">
                {selectedZone.tacticalNote}
              </div>
            </div>

            {/* Governed Rules List */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#717971] mb-1.5">
                Governing ITF Rules:
              </div>
              <div className="space-y-1">
                {selectedZone.rulesApplied.map((rule, idx) => (
                  <div key={idx} className="text-xs text-[#0E4D2B] font-medium flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Grand Slam Surface Specs */}
          <div className="bg-[#0E4D2B] text-white rounded-lg p-4 chalk-border shadow-sm">
            <div className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
              Surface Science Summary
            </div>
            <div className="text-sm font-serif font-semibold mb-2">
              {currentSurfaceStyle.slamName} Specifics
            </div>
            <p className="text-xs text-[#E8F2EC] leading-relaxed mb-3">
              {surface === 'grass' && 'Wimbledon 100% Perennial Ryegrass produces the lowest skid bounce (56cm) with lowest ball friction (0.52). Requires aggressive bent-knee posture.'}
              {surface === 'clay' && 'Roland-Garros crushed brick allows 2-meter controlled slides. Produces highest bounce (88cm) and rewards heavy topspin RPM.'}
              {surface === 'cyan-hard' && 'Australian Open GreenSet delivers consistent medium-fast true bounce (74cm). High temperature resilience.'}
              {surface === 'decoturf-blue' && 'US Open Laykold hardcourt offers explosive speed and sharp bounce (78cm). Promotes dominant first-strike tennis.'}
            </p>
            <button
              onClick={() => onSelectTournament(
                surface === 'grass' ? 'wimbledon' :
                surface === 'clay' ? 'roland-garros' :
                surface === 'cyan-hard' ? 'australian-open' : 'us-open'
              )}
              className="w-full py-1.5 text-xs font-semibold rounded-[4px] bg-[#C5A059] text-[#1C2826] hover:bg-[#ffdea5] transition-colors"
            >
              View Full Tournament Archive & Rules
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
