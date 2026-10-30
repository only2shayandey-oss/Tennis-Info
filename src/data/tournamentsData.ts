import { GrandSlamTournament, ViolationStep, CodeInfraction } from '../types/tennis';

export const TOURNAMENTS_DATA: GrandSlamTournament[] = [
  {
    id: 'wimbledon',
    name: 'The Championships, Wimbledon',
    shortName: 'Wimbledon',
    founded: 1877,
    location: 'London, England',
    venue: 'All England Lawn Tennis and Croquet Club (AELTC)',
    surface: 'grass',
    surfaceTitle: '100% Perennial Ryegrass',
    surfaceComposition: 'Cut strictly to 8mm depth. Sown on heavy clay-silt soil bed to optimize ball speed and skid velocity.',
    colorHex: '#0E4D2B',
    surfaceTint: '#E8F2EC',
    borderTint: '#0E4D2B',
    ballType: 'Slazenger Wimbledon Ultra Vis Hydroguard',
    bounceHeightCm: 56,
    frictionIndex: 0.52,
    paceRating: 'Fast',
    keyTraditions: [
      'Strict 90%+ All-White Apparel Rule from locker room entry',
      'The Queue for grounds tickets on Church Road',
      '28,000 kg of Kent Strawberries and 10,000 liters of fresh cream',
      'Middle Sunday historically rest day (permanent play added 2022)',
      '11:00 PM local borough council curfew'
    ],
    specialRules: [
      'Ball change after first 7 games, then every 9 games thereafter',
      'Grass wear degradation monitored with Clegg Impact Soil Hammer',
      'Hawk-Eye electronic line calling with human chair umpire supervision',
      'Centre Court retractable roof deployed in 8-10 minutes with air conditioning stabilization'
    ],
    trophyMen: 'The Gentlemen’s Singles Trophy (Gilded Silver Pineapple Cup)',
    trophyWomen: 'The Venus Rosewater Dish (Sterling Silver Salver)',
    quote: 'To meet with Triumph and Disaster and treat those two impostors just the same.',
    quoteAuthor: 'Rudyard Kipling (Inscribed above Centre Court players entrance)'
  },
  {
    id: 'roland-garros',
    name: 'Roland-Garros (The French Open)',
    shortName: 'Roland-Garros',
    founded: 1891,
    location: 'Paris, France',
    venue: 'Stade Roland Garros, Porte d’Auteuil',
    surface: 'clay',
    surfaceTitle: 'Terre Battue (Crushed Red Brick)',
    surfaceComposition: '5 distinct geological layers: 0.5mm crushed red brick dust atop 8cm crushed white limestone, 15cm clinker, and 30cm gravel foundation.',
    colorHex: '#C35831',
    surfaceTint: '#FBEFEA',
    borderTint: '#C35831',
    ballType: 'Wilson Roland Garros Clay Court High-Density',
    bounceHeightCm: 88,
    frictionIndex: 0.85,
    paceRating: 'Low',
    keyTraditions: [
      'The slide technique (glissade) into baseline groundstrokes',
      'Court maintenance ritual: sweeping with drag mat & hand watering at set breaks',
      'La Coupe des Mousquetaires honoring Borotra, Brugnon, Cochet & Lacoste',
      'Passionate Parisian crowd applause and "Olé" cadence'
    ],
    specialRules: [
      'Chair umpire inspects physical ball marks imprinted in clay upon challenge',
      'Heavy topspin kicks up to 25% higher than hardcourts',
      'Rain delays allow clay drying without surface structural collapse',
      'Night sessions under Philippe-Chatrier floodlights added in 2021'
    ],
    trophyMen: 'La Coupe des Mousquetaires (Silver Bowl with Swan Handles)',
    trophyWomen: 'La Coupe Suzanne-Lenglen',
    quote: 'Victory belongs to the most tenacious.',
    quoteAuthor: 'Roland Garros (Aviation pioneer & tournament namesake)'
  },
  {
    id: 'australian-open',
    name: 'Australian Open (The Happy Slam)',
    shortName: 'Australian Open',
    founded: 1905,
    location: 'Melbourne, Australia',
    venue: 'Melbourne Park, Rod Laver Arena',
    surface: 'cyan-hard',
    surfaceTitle: 'GreenSet Cushion Acrylic Hardcourt',
    surfaceComposition: 'Multi-layer acrylic resin and silica sand over asphalt foundation. Engineered for consistent medium-fast true rebound.',
    colorHex: '#0082CA',
    surfaceTint: '#E5F4FC',
    borderTint: '#0082CA',
    ballType: 'Dunlop Australian Open Heavy Duty Felt',
    bounceHeightCm: 74,
    frictionIndex: 0.68,
    paceRating: 'Medium-Fast',
    keyTraditions: [
      'Opening Grand Slam of the calendar year in Southern Hemisphere summer',
      'Aussie fan fanfares, brass bands, and energetic summer carnival vibe',
      'Night sessions under Southern Cross stars',
      'The "Happy Slam" moniker coined by Roger Federer'
    ],
    specialRules: [
      'Extreme Heat Policy with 5-point Wet Bulb Globe Temperature (WBGT) scale',
      '10-minute cooling break between sets when Heat Stress Scale reaches 4.0',
      'Automated Electronic Line Calling Live (no line judges on court)',
      '10-point final set tiebreak pioneered in 2019'
    ],
    trophyMen: 'Norman Brookes Challenge Cup',
    trophyWomen: 'Daphne Akhurst Memorial Cup',
    quote: 'No matter how good you are, you can always get better and that is the exciting part.',
    quoteAuthor: 'Rod Laver (11-time Grand Slam Champion)'
  },
  {
    id: 'us-open',
    name: 'US Open Tennis Championships',
    shortName: 'US Open',
    founded: 1881,
    location: 'New York City, USA',
    venue: 'USTA Billie Jean King National Tennis Center, Arthur Ashe Stadium',
    surface: 'decoturf-blue',
    surfaceTitle: 'Laykold Acrylic Cushion Hardcourt',
    surfaceComposition: 'Advanced vapor-barrier polyurethane cushion system topped with textured acrylic. Signature tournament blue interior with forest green outer perimeter.',
    colorHex: '#1A3B8B',
    surfaceTint: '#E8EDF8',
    borderTint: '#1A3B8B',
    ballType: 'Wilson US Open Extra Duty Felt',
    bounceHeightCm: 78,
    frictionIndex: 0.64,
    paceRating: 'Fast',
    keyTraditions: [
      'Arthur Ashe Stadium: largest tennis stadium in the world (23,771 capacity)',
      'Electric, boisterous New York evening energy and celebrity attendance',
      'Honey Deuce signature cocktail tradition with honeydew melon balls',
      'Labor Day weekend blockbuster matches'
    ],
    specialRules: [
      'First Grand Slam to award equal prize money to men and women (1973)',
      'First Grand Slam to introduce final-set tiebreak (1970)',
      'Strict 25-second serve clock strictly displayed on stadium scoreboards',
      'Live electronic line calling across all 17 competition courts'
    ],
    trophyMen: 'US Open Men’s Singles Championship Trophy (Crafted by Tiffany & Co.)',
    trophyWomen: 'US Open Women’s Singles Championship Trophy (Crafted by Tiffany & Co.)',
    quote: 'Champions keep playing until they get it right.',
    quoteAuthor: 'Billie Jean King (39-time Grand Slam Champion)'
  }
];

export const VIOLATION_STEPS: ViolationStep[] = [
  {
    step: 1,
    name: 'First Offence',
    penalty: 'Official Warning',
    description: 'The player receives a formal public warning logged in the official chair umpire scoresheet. No points or games are deducted at this stage.',
    scoreImpact: 'Score remains unchanged. The player is placed on high alert.',
    supervisorRequired: false,
    announcementTemplate: 'Code violation, {infraction}, Warning, {player}.'
  },
  {
    step: 2,
    name: 'Second Offence',
    penalty: 'Point Penalty',
    description: 'The opposing player is awarded the subsequent point immediately before service commences.',
    scoreImpact: 'Opponent is awarded +1 point on the scoreboard.',
    supervisorRequired: false,
    announcementTemplate: 'Code violation, {infraction}, Point penalty, {player}. {newScore}.'
  },
  {
    step: 3,
    name: 'Third Offence',
    penalty: 'Game Penalty',
    description: 'The opposing player is awarded the entire subsequent game. If receiving, the opponent breaks serve by rule.',
    scoreImpact: 'Opponent is awarded +1 game on the match score sheet.',
    supervisorRequired: false,
    announcementTemplate: 'Code violation, {infraction}, Game penalty, {player}. Game {opponent}.'
  },
  {
    step: 4,
    name: 'Fourth Offence (or Gross Misconduct)',
    penalty: 'Default / Forfeiture',
    description: 'Immediate disqualification from the tournament match. Requires consultation with the on-site Grand Slam Supervisor or Chief Referee.',
    scoreImpact: 'Match terminated. Opponent awarded the victory by default.',
    supervisorRequired: true,
    announcementTemplate: 'Code violation, {infraction}, Default, {player}. Match to {opponent}.'
  }
];

export const CODE_INFRACTIONS: CodeInfraction[] = [
  {
    id: 'racket-abuse',
    name: 'Racket Abuse',
    category: 'Equipment',
    severity: 'standard',
    description: 'Deliberately smashing, breaking, violently kicking, or throwing a racket onto the court surface or net.',
    realWorldExample: 'Slamming a racket into the turf after losing a break point, splintering the graphite frame.'
  },
  {
    id: 'ball-abuse',
    name: 'Ball Abuse',
    category: 'Equipment',
    severity: 'standard',
    description: 'Hitting or violently launching a tennis ball out of the court enclosure or dangerously close to ball persons or spectators.',
    realWorldExample: 'Swatting a dead ball into the upper tier of the stadium in frustration.'
  },
  {
    id: 'audible-obscenity',
    name: 'Audible Obscenity',
    category: 'Speech',
    severity: 'standard',
    description: 'The use of words commonly known and understood to be profane, obscene, or offensive spoken aloud so as to be heard by officials or spectators.',
    realWorldExample: 'Cursing audibly at the chair umpire following a close overrule.'
  },
  {
    id: 'visible-obscenity',
    name: 'Visible Obscenity',
    category: 'Conduct',
    severity: 'standard',
    description: 'Making offensive, indecent, or profane gestures with hands, fingers, or equipment.',
    realWorldExample: 'Directing a derogatory hand gesture toward the grandstand.'
  },
  {
    id: 'time-violation',
    name: 'Time Delay (Serve Clock)',
    category: 'Time',
    severity: 'standard',
    description: 'Exceeding the 25-second limit between points without chair umpire permission or medical allowance.',
    realWorldExample: 'Taking 32 seconds to retrieve towels and perform pre-serve ball bounces.'
  },
  {
    id: 'unsportsmanlike-conduct',
    name: 'Unsportsmanlike Conduct',
    category: 'Conduct',
    severity: 'severe',
    description: 'Any misconduct, intimidation, taunting, or failure to give best effort that brings the sport of tennis into disrepute.',
    realWorldExample: 'Refusing to shake hands, confronting an opponent aggressively, or knocking drinks over.'
  },
  {
    id: 'physical-abuse',
    name: 'Physical Abuse / Endangerment',
    category: 'Conduct',
    severity: 'immediate-default',
    description: 'Striking, pushing, or causing bodily harm or direct dangerous contact with an umpire, linesperson, ball kid, or spectator.',
    realWorldExample: 'Accidentally or intentionally striking a linesperson in the throat with a struck ball (e.g. US Open 2020).'
  }
];
