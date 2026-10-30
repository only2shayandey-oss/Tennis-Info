import { QuizScenario } from '../types/tennis';

export const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 'hat-drop-rally',
    title: 'The Unintentional Cap Drop',
    situation: 'During an intense 22-shot baseline rally at Wimbledon, Player A hits an aggressive forehand winner down the line. However, midway through Player A’s swing, their white cap flies off and lands onto the grass court surface inside the singles alley.',
    question: 'Player B claims hindrance and stops playing. What is the correct ruling by the Chair Umpire?',
    options: [
      {
        id: 'opt-1',
        text: 'Immediate loss of point for Player A due to self-hindrance.',
        isCorrect: false,
        explanation: 'Involuntary equipment loss is not treated as a deliberate hindrance on the first occurrence.'
      },
      {
        id: 'opt-2',
        text: 'The point must be replayed as a Let (first occurrence of involuntary hindrance).',
        isCorrect: true,
        explanation: 'Correct! Under ITF Rule 26, when an item of clothing or equipment falls off unintentionally during play for the first time, it is deemed an involuntary hindrance and the point is replayed. (Note: A second occurrence in the same match would result in loss of point).'
      },
      {
        id: 'opt-3',
        text: 'Award the point to Player A because their shot was an unreturnable winner.',
        isCorrect: false,
        explanation: 'The distraction happened while the ball was still in flight, preventing Player B from executing an unobstructed defense.'
      },
      {
        id: 'opt-4',
        text: 'Issue a Code Violation for Equipment Misconduct and award point to Player B.',
        isCorrect: false,
        explanation: 'An accidental hat loss is not a disciplinary code violation.'
      }
    ],
    officialCitation: 'ITF Rule 26 (Hindrance) & Grand Slam Umpire Handbook Sec. 3.4',
    umpiresTake: 'If a player’s hat or towel falls off once, replay the point. If it happens a second time with the same player, rule it deliberate hindrance and award the point to the opponent!'
  },
  {
    id: 'ball-blown-back',
    title: 'The Extreme Backspin Drop Shot',
    situation: 'Player A hits an exquisite slice drop shot on Roland Garros clay with tremendous underspin. The ball bounces 6 inches past the net on Player B’s side, but due to severe backspin and wind, it hops backward over the net cord into Player A’s side before Player B can touch it.',
    question: 'Player B sprints forward and reaches their racket entirely over the net plane to swat the ball down into Player A’s court, without touching the net or Player A’s court surface. What is the call?',
    options: [
      {
        id: 'opt-1',
        text: 'Legal point for Player B. Player B wins the point.',
        isCorrect: true,
        explanation: 'Spot on! ITF Rule 25.b explicitly provides an exception: when a ball has bounced on a player’s side and spins or is blown back across the net, that player MAY reach over the net to hit the ball, provided they do not touch the net, cord, posts, or opponent’s court.'
      },
      {
        id: 'opt-2',
        text: 'Fault on Player B for crossing the vertical plane of the net before contact.',
        isCorrect: false,
        explanation: 'This is the singular exception in tennis where reaching across the net before hitting is permitted.'
      },
      {
        id: 'opt-3',
        text: 'Point to Player A automatically the moment the ball crosses back over the net.',
        isCorrect: false,
        explanation: 'The ball remains live until it either bounces twice or is struck.'
      },
      {
        id: 'opt-4',
        text: 'Replay the point as a natural environmental let.',
        isCorrect: false,
        explanation: 'Wind and backspin are standard legal elements of tennis physics.'
      }
    ],
    officialCitation: 'ITF Rule 25.b (Ball Blown Back Over the Net)',
    umpiresTake: 'This is one of the most exciting rare rulings in tennis. Remember: you can reach across the net ONLY if the ball has already bounced on your side and spun backwards over the net!'
  },
  {
    id: 'jumping-serve-baseline',
    title: 'The Airborne Baseline Jump Serve',
    situation: 'A server stands 2 inches behind the baseline, tosses the ball high, and jumps explosively forward. Their racket strikes the ball while their entire body is suspended in the air, 12 inches inside the boundary of the court past the baseline. They land on both feet well inside the court.',
    question: 'Did the server commit a Foot Fault?',
    options: [
      {
        id: 'opt-1',
        text: 'Yes, Foot Fault because their body crossed the baseline before contact.',
        isCorrect: false,
        explanation: 'The rule pertains to physical contact with the ground, not aerial position.'
      },
      {
        id: 'opt-2',
        text: 'No, this is completely LEGAL. No foot fault.',
        isCorrect: true,
        explanation: 'Correct! ITF Rule 18 stipulates that the server shall not touch with either foot the baseline or the court. As long as the feet launch from behind the baseline and do not touch the ground or line until AFTER the racket strikes the ball, it is 100% legal. All modern pro jump serves utilize this mechanic!'
      },
      {
        id: 'opt-3',
        text: 'Yes, because the landing occurred inside the court.',
        isCorrect: false,
        explanation: 'Landing inside the baseline after the strike is the natural outcome of modern forward momentum.'
      },
      {
        id: 'opt-4',
        text: 'It depends on whether the second foot touched the ground first.',
        isCorrect: false,
        explanation: 'Neither foot may touch the court prior to ball impact; afterward, any landing is legal.'
      }
    ],
    officialCitation: 'ITF Rule 18.a & 18.b (Foot Fault - Aerial Trajectory)',
    umpiresTake: 'The key phrase is "touch with either foot". You can be airborne over the baseline or court, as long as contact is made before the feet land on the turf.'
  },
  {
    id: 'racket-flies-winner',
    title: 'The Slipped Racket Volley',
    situation: 'Player A hits an overhead smash from the net. During the strike, sweaty palms cause the racket to slip out of Player A’s hand. The ball lands cleanly for a winner on Player B’s side, but Player A’s racket flies forward into the net cord while the ball is still bouncing.',
    question: 'Who is awarded the point?',
    options: [
      {
        id: 'opt-1',
        text: 'Player A, because the ball was struck before the racket slipped.',
        isCorrect: false,
        explanation: 'The ball was still in play (not dead) when the racket contacted the net.'
      },
      {
        id: 'opt-2',
        text: 'Player B wins the point because Player A’s equipment touched the net while the ball was in play.',
        isCorrect: true,
        explanation: 'Correct! Under ITF Rule 24.g, a player loses the point if the player, their racket, or anything they wear/carry touches the net while the ball is live. Because the racket struck the net before the ball bounced a second time or went out of bounds, Player A forfeits the point.'
      },
      {
        id: 'opt-3',
        text: 'Let is called and the point is replayed.',
        isCorrect: false,
        explanation: 'Slipping equipment is never cause for a let.'
      },
      {
        id: 'opt-4',
        text: 'Player A receives a Warning for Racket Abuse.',
        isCorrect: false,
        explanation: 'An accidental loss of grip is not deliberate racket abuse.'
      }
    ],
    officialCitation: 'ITF Rule 24.g (Touching Net Before Ball is Dead)',
    umpiresTake: 'The point is only dead after the ball bounces twice or touches an obstacle outside the court. Net contact before that instant loses the point every time.'
  },
  {
    id: 'bird-strike-point',
    title: 'The Airborne Bird Collision',
    situation: 'During the Australian Open in Melbourne, a seagull swoops low across Rod Laver Arena. Player A hits a deep forehand that directly strikes the bird in mid-air over the net. The deflected ball limps over the net and bounces in Player B’s court.',
    question: 'What is the official Chair Umpire ruling?',
    options: [
      {
        id: 'opt-1',
        text: 'Call a Let immediately and replay the point.',
        isCorrect: true,
        explanation: 'Spot on! Under ITF Rule 26, a live bird or animal entering the field of play is an external permanent fixture/interference. When a live ball in play strikes an external moving object, a Let is called immediately and the point is replayed from first serve.'
      },
      {
        id: 'opt-2',
        text: 'Good point to Player A because the ball landed in the opponent’s court.',
        isCorrect: false,
        explanation: 'An external collision invalidates the integrity of the stroke trajectory.'
      },
      {
        id: 'opt-3',
        text: 'Loss of point to Player A for hitting an animal.',
        isCorrect: false,
        explanation: 'An accidental collision carries no fault or penalty.'
      },
      {
        id: 'opt-4',
        text: 'Player B may choose whether to accept the shot or call a let.',
        isCorrect: false,
        explanation: 'The umpire must immediately intervene; players do not make this determination.'
      }
    ],
    officialCitation: 'ITF Rule 26 & Case 1 (Interference by Outside Agency)',
    umpiresTake: 'Outside agency interference (birds, stray tennis balls rolling onto court, paper blowing across) triggers an instant umpire whistle: "Let, first serve."'
  },
  {
    id: 'ball-around-post',
    title: 'The Around-the-Net-Post Winner',
    situation: 'Player A is pulled 10 feet out wide beyond the doubles tramline. They hit a low slicing banana shot that travels outside the net post, below the height of the net cord, and curls back in, landing cleanly inside Player B’s baseline.',
    question: 'Is this shot legal, or must the ball pass above the net cord?',
    options: [
      {
        id: 'opt-1',
        text: 'Legal! The shot is completely valid and Player A wins the point.',
        isCorrect: true,
        explanation: 'Masterful knowledge! Under ITF Rule 25.c, it is a Good Return if the ball is returned outside the net posts, either above or below the level of the top of the net, even though it touches the net post, provided it lands in the correct court!'
      },
      {
        id: 'opt-2',
        text: 'Illegal, because all shots must travel over the top edge of the net.',
        isCorrect: false,
        explanation: 'Popular myth: shots do not need to cross the net, only arrive in the legal court.'
      },
      {
        id: 'opt-3',
        text: 'Only legal if it passed above the height of the net post (3.5 feet).',
        isCorrect: false,
        explanation: 'The rule explicitly states: "either above or below the level of the top of the net".'
      },
      {
        id: 'opt-4',
        text: 'Point to Player B as an out-of-boundary trajectory.',
        isCorrect: false,
        explanation: 'The flight path through the air outside the court boundaries is entirely unrestricted.'
      }
    ],
    officialCitation: 'ITF Rule 25.c (Ball Returned Outside Net Posts)',
    umpiresTake: 'One of the most thrilling shots in Grand Slam history (often executed by Nadal or Federer). Traveling around the net post at ground level is 100% legal!'
  }
];
