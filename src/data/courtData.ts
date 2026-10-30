import { CourtZoneInfo } from '../types/tennis';

export const COURT_ZONES: CourtZoneInfo[] = [
  {
    id: 'deuce-service-box-near',
    name: 'Deuce Service Box (Near Court)',
    label: 'DEUCE SERVICE',
    dimensions: '21 ft length × 13.5 ft width (6.40m × 4.11m)',
    description: 'The target delivery quadrant for the server delivering from the right side of the baseline (Deuce court). The serve must bounce inside or on the chalk lines defining this rectangle.',
    tacticalNote: 'Prime targets: Wide slice dragging the returner off court, or hard flat serve driving down the "T" line.',
    rulesApplied: ['ITF Rule 15 (Ball in Play)', 'ITF Rule 17 (Serving to Service Court)', 'ITF Rule 22 (Service Let)'],
    bounds: { x: 50, y: 160, width: 90, height: 140 }
  },
  {
    id: 'ad-service-box-near',
    name: 'Ad (Advantage) Service Box (Near Court)',
    label: 'AD SERVICE',
    dimensions: '21 ft length × 13.5 ft width (6.40m × 4.11m)',
    description: 'The target delivery quadrant for the server delivering from the left side of the baseline (Ad court), used for all 30-15, 40-30, Advantage points.',
    tacticalNote: 'Crucial for high-pressure points (break points and game points). Righties often target a kicking serve to the receiver’s backhand.',
    rulesApplied: ['ITF Rule 17 (Service Court Order)', 'ITF Rule 18 (Foot Fault)'],
    bounds: { x: 140, y: 160, width: 90, height: 140 }
  },
  {
    id: 'center-service-line',
    name: 'Center Service Line ("The T")',
    label: 'CENTER "T" LINE',
    dimensions: '2 inches wide (5cm), 42 ft total length across net',
    description: 'Divides the two service courts down the exact middle of the tennis court. If a served ball touches any millimeter of the white chalk on this line, it is ruled IN.',
    tacticalNote: 'The fastest path to an ace because it minimizes the angle of return and travels the shortest distance across the lowest part of the net.',
    rulesApplied: ['ITF Rule 1 (The Court)', 'ITF Rule 17 (Service Line In-Bounds)'],
    bounds: { x: 138, y: 160, width: 4, height: 280 }
  },
  {
    id: 'doubles-alley',
    name: 'Doubles Alley (Tramlines)',
    label: 'DOUBLES ALLEY',
    dimensions: '4.5 ft width × 78 ft length (1.37m × 23.77m)',
    description: 'The 4.5-foot outer corridors on each side of the court. In singles play, this zone is strictly OUT of bounds. In doubles play, it is fully in-bounds during live points.',
    tacticalNote: 'Doubles servers frequently slice out wide into the alley to open the middle court for an intercepting net partner poach.',
    rulesApplied: ['ITF Rule 1 (Singles vs. Doubles Court)', 'ITF Rule 24 (Ball Lands Out in Singles)'],
    bounds: { x: 20, y: 20, width: 30, height: 560 }
  },
  {
    id: 'backcourt-near',
    name: 'Backcourt ("No-Man’s Land")',
    label: 'BACKCOURT',
    dimensions: '18 ft length × 27 ft width (5.49m × 8.23m)',
    description: 'The transitional territory between the service line and the baseline. Players caught standing here are vulnerable to balls landing at their shoelaces on half-volleys.',
    tacticalNote: 'Tactically termed "No-Man’s Land". Elite players strive either to stay behind the baseline to rally or close decisively to the net to volley.',
    rulesApplied: ['ITF Rule 24 (Live Ball Groundstroke)', 'ITF Rule 25 (Good Return)'],
    bounds: { x: 50, y: 300, width: 180, height: 120 }
  },
  {
    id: 'baseline-near',
    name: 'Baseline & Center Mark',
    label: 'BASELINE',
    dimensions: '36 ft total width; lines 2-4 inches wide (10cm max)',
    description: 'The back boundary line of the court, 39 feet (11.89m) from the net. The server must stand behind this line. The 4-inch center mark dictates Deuce vs Ad service sides.',
    tacticalNote: 'Touching the line with the ball is ruled good ("99% out is 100% in"). Modern baseline tennis revolves around heavy topspin depth landing within 1 meter of this line.',
    rulesApplied: ['ITF Rule 18 (Foot Fault)', 'ITF Rule 19 (Fault)', 'ITF Rule 24 (Line is Part of Court)'],
    bounds: { x: 20, y: 420, width: 240, height: 20 }
  },
  {
    id: 'net-and-strap',
    name: 'The Net, Band & Center Strap',
    label: 'THE NET & STRAP',
    dimensions: '3 feet (0.914m) high at center; 3.5 feet (1.07m) at posts',
    description: 'The corded barrier suspended across the center of the court. The white center strap holds the net securely at exactly 36 inches (0.914 meters) above the ground.',
    tacticalNote: 'Because the net is 6 inches lower in the center than at the posts, crosscourt groundstrokes are the highest-percentage shots in tennis.',
    rulesApplied: ['ITF Rule 1 (Net Height)', 'ITF Rule 22 (Service Let)', 'ITF Rule 24.g (Touching Net)'],
    bounds: { x: 10, y: 155, width: 260, height: 10 }
  }
];

export interface HawkEyeTestPoint {
  label: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  verdict: 'IN' | 'OUT' | 'LET' | 'FAULT';
  marginMm: number;
  explanation: string;
}

export const PRESET_HAWKEYE_POINTS: HawkEyeTestPoint[] = [
  {
    label: 'Baseline Chalk Skimmer',
    xPercent: 52,
    yPercent: 74.8,
    verdict: 'IN',
    marginMm: 2,
    explanation: 'The compressed felt touched the rear white edge of the baseline by 2 millimeters. If any part of the ball’s contact ellipse touches any fraction of the chalk, it is 100% IN.'
  },
  {
    label: 'Deep Baseline Overhit',
    xPercent: 50,
    yPercent: 78.5,
    verdict: 'OUT',
    marginMm: 14,
    explanation: 'The ball landed 14mm beyond the back edge of the baseline. Clear out call verified by automated optical tracking.'
  },
  {
    label: 'Singles Sideline Clipper',
    xPercent: 20.8,
    yPercent: 62.0,
    verdict: 'IN',
    marginMm: 1,
    explanation: 'A razor-thin passing shot kissing the outer edge of the singles sideline. The mark overlaps the line by 1mm.'
  },
  {
    label: 'Service Box "T" Ace',
    xPercent: 50.5,
    yPercent: 53.5,
    verdict: 'IN',
    marginMm: 6,
    explanation: 'The serve clipped the center service line ("The T") cleanly inside the Deuce service box. Perfect ace down the middle.'
  },
  {
    label: 'Wide Service Fault',
    xPercent: 79.5,
    yPercent: 52.0,
    verdict: 'FAULT',
    marginMm: 22,
    explanation: 'The serve landed 22mm outside the singles sideline boundary of the service box. Ruled an immediate Service Fault.'
  }
];
