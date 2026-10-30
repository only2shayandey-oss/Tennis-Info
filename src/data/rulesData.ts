import { TennisRule } from '../types/tennis';

export const RULES_DATA: TennisRule[] = [
  {
    id: 'foot-fault',
    title: 'Foot Fault on Service Delivery',
    category: 'serve',
    tournaments: ['all'],
    status: 'FAULT',
    itfRule: 'ITF Rule 18 (Foot Fault)',
    summary: 'During the delivery of the service, the server shall not touch with either foot the baseline or the area beyond the imaginary extension of the sideline or center mark.',
    clauses: [
      'The server must remain strictly behind the baseline between the imaginary extensions of the center mark and sideline until the ball is struck.',
      'Slight movements of the feet that do not materially affect the position originally taken up are permitted.',
      'A server who leaps into the air is permitted to land inside the baseline ONLY after the racket strikes the ball.',
      'Touching the chalk line before contact is an immediate fault.'
    ],
    umpiresNote: 'A foot fault cannot be challenged retrospectively by electronic line calling unless the tournament has enabled automated baseline cameras. Umpires watch for the leading toe grazing the white chalk before impact.',
    tags: ['Serve', 'Baseline', 'Footwork', 'Fault']
  },
  {
    id: 'underhand-serve',
    title: 'Underhand (Underarm) Service Legality',
    category: 'serve',
    tournaments: ['all'],
    status: 'LEGAL PLAY',
    itfRule: 'ITF Rule 16 (The Service)',
    summary: 'The ball may be struck before it touches the ground by the racket head in any direction or angle, including an underhand motion.',
    clauses: [
      'The server must release the ball from the hand into the air before striking it (striking directly out of hand is illegal).',
      'The server must wait until the receiver is ready before delivering the serve.',
      'The delivery must still land within the diagonally opposite service court.',
      'Underhand serves are fully codified and legal in all four Grand Slam championships.'
    ],
    umpiresNote: 'The sole prerequisite is receiver readiness. If the receiver is clearly looking down or adjusting strings, the chair umpire will call a Let and instruct the server to wait.',
    tags: ['Serve', 'Tactics', 'Etiquette', 'Deception']
  },
  {
    id: 'net-cord-let',
    title: 'Service Let (Net Cord Contact)',
    category: 'serve',
    tournaments: ['all'],
    status: 'PROCEDURE',
    itfRule: 'ITF Rule 22 (The Service Let)',
    summary: 'If a served ball touches the net, strap, or band, and is otherwise good, or touches the receiver before hitting the ground, it is a Let.',
    clauses: [
      'The service does not count, and the server shall serve that delivery again (either 1st or 2nd serve).',
      'If the ball clips the tape and lands outside the prescribed service box, it is an outright Fault, not a Let.',
      'Electronic net sensors on Grand Slam courts trigger an audible chirp or visual indicator to assist the chair umpire.'
    ],
    umpiresNote: 'Grand Slam events maintain the service let rule, unlike certain junior or Fast4 exhibition formats. If the ball touches the net cord and lands in, the point is immediately replayed from that serve.',
    tags: ['Serve', 'Net', 'Let', 'Audio Sensor']
  },
  {
    id: 'double-hit',
    title: 'Double Hit in Continuous Stroke',
    category: 'rally',
    tournaments: ['all'],
    status: 'LEGAL PLAY',
    itfRule: 'ITF Rule 24.e (Involuntary Double Hit)',
    summary: 'An unintentional, continuous double hit in the execution of a single stroke is legal.',
    clauses: [
      'A deliberate second swing or intentional double tap to redirect the ball results in immediate loss of the point.',
      'Accidental contact where the ball brushes the racket frame and then the stringbed during one fluent forward swing is ruled good.',
      'The umpire judges whether there was two distinct motions or one fluid reaction.'
    ],
    umpiresNote: 'Historically penalized prior to 1980, modern physics recognizes high-speed video proof that many off-center volleys involve a microscopic double touch. Only deliberate scooping or double redirection loses the point.',
    tags: ['Rally', 'Equipment', 'Stroke', 'Frame Hit']
  },
  {
    id: 'touching-net',
    title: 'Player or Racket Touching the Net',
    category: 'hindrance',
    tournaments: ['all'],
    status: 'FAULT',
    itfRule: 'ITF Rule 24.g (Player Touches Net)',
    summary: 'A player loses the point if the player, their racket, or anything they wear or carry touches the net, net posts, cord, strap, or the ground inside the opponent’s court while the ball is in play.',
    clauses: [
      'The ball remains in play until it bounces twice or lands out.',
      'If a player hits a clean winner that has bounced only once and then crashes into the net before the second bounce, they lose the point.',
      'Even a falling hat or detached vibration dampener touching the net cord loses the point.',
      'Touching the net after the ball has bounced twice or hit the back wall is harmless, as the point is officially dead.'
    ],
    umpiresNote: 'Timing is everything. Chair umpires must distinguish whether the net contact occurred before or after the ball was dead. A split-second delay decides the point.',
    tags: ['Net', 'Point Loss', 'Physical Contact', 'Infraction']
  },
  {
    id: 'reaching-over-net',
    title: 'Striking Ball Across the Net Plane',
    category: 'rally',
    tournaments: ['all'],
    status: 'LEGAL PLAY',
    itfRule: 'ITF Rule 25.b (Ball Blown Back Over Net)',
    summary: 'A player may reach over the net to strike the ball ONLY if backspin or wind blew the ball back across the net after bouncing.',
    clauses: [
      'General rule: A player must not strike the ball before it has crossed the plane of the net onto their side.',
      'Exception: If the ball has bounced in a player’s court and spins back over the net by wind or heavy backspin, the player MAY reach over the net to hit it.',
      'In doing so, neither the player nor their racket or clothes may touch the net or the opponent’s court surface.',
      'Follow-through: Hitting the ball on your side and letting the racket follow through across the net plane without touching the net is completely legal.'
    ],
    umpiresNote: 'This is the only scenario in tennis where a player is legally allowed to cross the plane of the net with their racket to strike the ball before impact. A masterclass tactical rarity.',
    tags: ['Net', 'Backspin', 'Drop Shot', 'Plane of Net']
  },
  {
    id: 'hindrance-rule',
    title: 'Hindrance (Deliberate vs. Involuntary)',
    category: 'hindrance',
    tournaments: ['all'],
    status: 'INFRACTION',
    itfRule: 'ITF Rule 26 (Hindrance)',
    summary: 'If a player is hindered in playing the point by a deliberate act of the opponent, the player wins the point. If involuntary, the point is replayed.',
    clauses: [
      'Deliberate hindrance (e.g., shouting "Out!", waving racket aggressively, yelling during opponent stroke): Immediate loss of point.',
      'Involuntary hindrance (e.g., player’s cap falls off, ball falls from pocket, external court intrusion): Point is replayed on the 1st occurrence.',
      'Second occurrence of an involuntary hindrance caused by the same player (e.g. second lost hat): Ruled deliberate; point is forfeited.'
    ],
    umpiresNote: 'The distinction between a natural grunt and deliberate vocal hindrance hinges on timing: grunts that extend past ball contact and interfere with the opponent’s split-second read are subject to umpire warning and point penalty.',
    tags: ['Hindrance', 'Fair Play', 'Grunting', 'Equipment Drop']
  },
  {
    id: 'shot-clock-time',
    title: '25-Second Serve Clock & Pace of Play',
    category: 'conduct',
    tournaments: ['all', 'us-open', 'australian-open', 'roland-garros', 'wimbledon'],
    status: 'PROCEDURE',
    itfRule: 'Grand Slam Code Section IV (Time Violation)',
    summary: 'Servers have 25 seconds between points to initiate service motion, tracked via on-court shot clocks.',
    clauses: [
      'Clock starts when the chair umpire announces the score or when the ball is dead after applause subsides.',
      'First violation: Warning.',
      'Second and subsequent violations: Loss of first serve (fault) if server; point penalty if receiver delays.',
      'Receivers must play to the reasonable pace of the server.'
    ],
    umpiresNote: 'Chair umpires hold discretion to pause the clock for extraordinary crowd noise, towel retrieval during intense rallies, or court sweeping.',
    tags: ['Shot Clock', 'Time Violation', 'Pace of Play', 'Chair Discretion']
  },
  {
    id: 'grand-slam-super-tiebreak',
    title: '10-Point Deciding Set Super Tiebreak',
    category: 'scoring',
    tournaments: ['all', 'wimbledon', 'roland-garros', 'australian-open', 'us-open'],
    status: 'PROCEDURE',
    itfRule: 'Grand Slam Unified Rule (Adopted 2022)',
    summary: 'At 6–6 in the final set, a 10-point tiebreak is played to decide the match. The first player to 10 points by a margin of 2 wins.',
    clauses: [
      'Replaces the historical endless advantage final sets (e.g., Isner-Mahut 70–68 in 2010).',
      'The player whose turn it is to serve delivers Point 1 from the Deuce court.',
      'Opponent serves Points 2 & 3 (Ad then Deuce court), alternating every 2 points thereafter.',
      'Players change ends every 6 points (e.g. at 4-2, 6-6, 9-9).'
    ],
    umpiresNote: 'Unanimously ratified by all four Grand Slam boards in March 2022 to preserve player health while guaranteeing epic, structured climaxes.',
    tags: ['Scoring', 'Super Tiebreak', 'Deciding Set', 'Grand Slam Union']
  },
  {
    id: 'ball-mark-inspection',
    title: 'Clay Court Ball Mark Inspection (Roland Garros)',
    category: 'rally',
    tournaments: ['roland-garros'],
    status: 'PROCEDURE',
    itfRule: 'Roland Garros Specific Code (Mark Inspection)',
    summary: 'On clay, players may request the chair umpire to inspect the mark left by the ball in the crushed brick surface.',
    clauses: [
      'The call must be questioned immediately before another stroke is played or before the server prepares for the next serve.',
      'The player must not erase or alter the mark before the umpire climbs down from the chair.',
      'The chair umpire’s inspection of the mark is final; if the chalk line is touched by the oval imprint, the ball is ruled good.',
      'Erasing the mark deliberately results in an unsportsmanlike conduct code violation.'
    ],
    umpiresNote: 'The umpire looks for the white halo of crushed limestone beneath the red powder. If there is no gap between the mark and the chalk line, the ball touched the line.',
    tags: ['Roland Garros', 'Clay', 'Ball Mark', 'Hawk-Eye']
  },
  {
    id: 'wimbledon-dress-code',
    title: 'Strict All-White Apparel Etiquette',
    category: 'equipment',
    tournaments: ['wimbledon'],
    status: 'PROCEDURE',
    itfRule: 'AELTC Rulebook Clause 9',
    summary: 'Competitors must be dressed in suitable tennis attire that is almost entirely white, effective from entering the court enclosure.',
    clauses: [
      'Off-white or cream is strictly unacceptable.',
      'A single trim of color around the neckline and cuff of no more than one centimeter (10mm) is allowed.',
      'Caps, headbands, bandanas, wristbands, socks, and shoe uppers must be almost entirely white.',
      'In 2023, female competitors were permitted to wear mid/dark-colored undershorts to ease anxiety around menstruation.'
    ],
    umpiresNote: 'Referees inspect player gear before they step onto Centre Court. Non-compliant apparel must be changed immediately in the clubhouse changing rooms before match play commences.',
    tags: ['Wimbledon', 'Tradition', 'Dress Code', 'Centre Court']
  },
  {
    id: 'coaching-from-box',
    title: 'Off-Court Coaching Trial Rules',
    category: 'conduct',
    tournaments: ['all'],
    status: 'LEGAL PLAY',
    itfRule: 'ITF Rule 30 (Coaching Trial)',
    summary: 'Coaching is permitted from designated player boxes, provided it does not disrupt play or hinder the opponent.',
    clauses: [
      'Verbal coaching is permitted only when the player is on the same end of the court as their player box.',
      'Verbal coaching must consist of brief words or short phrases; sustained conversation is forbidden.',
      'Non-verbal coaching (hand gestures and signals) is permitted at all times.',
      'Coaching during actual rally play or between first and second serves remains strictly prohibited.'
    ],
    umpiresNote: 'Conversations with coaches across the length of the court (when player is on opposite side) are penalized. The rule formalized what was previously an untracked grey area.',
    tags: ['Coaching', 'Player Box', 'Ethics', 'Modern Trial']
  }
];
