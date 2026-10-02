export type Memory = {
  id: string
  src: string
  alt: string
  title: string
  date: string
  location: string
  caption: string
  tag?: string
}

export const memories: Memory[] = [
  {
    id: 'mem-01',
    src: '/photos/photo-celebration.jpg',
    alt: 'Felina Doungel balancing the tournament runners-up trophy on her head with a smile and peace sign',
    title: 'Runners-Up Celebration',
    date: '2026.09.28',
    location: 'Tournament Arena, Bengaluru',
    caption: 'Balancing the cup on my head — proud of the team, the grit, and every minute on the pitch.',
    tag: 'CELEBRATION',
  },
  {
    id: 'mem-02',
    src: '/photos/photo-match.jpg',
    alt: 'Felina playing for Mighty Lions in pink jersey, controlling the football against opponents',
    title: 'Mighty Lions · Matchday',
    date: '2026.09.20',
    location: 'Football Pitch, Bengaluru',
    caption: 'In the zone with Mighty Lions — controlling possession and driving the ball forward.',
    tag: 'MATCH',
  },
  {
    id: 'mem-03',
    src: '/photos/photo-trophy-night.jpg',
    alt: 'Felina holding and hugging a silver trophy cup decorated with ribbons under stadium lights',
    title: 'Silver Cup Under Floodlights',
    date: '2026.09.15',
    location: 'Sports Ground, Bengaluru',
    caption: 'Holding onto the silverware after the final whistle. A night to remember.',
    tag: 'VICTORY',
  },
  {
    id: 'mem-04',
    src: '/photos/photo-best-player.jpg',
    alt: 'Felina holding up the Best Player golden trophy statuette in a courtyard',
    title: 'Best Player Honor',
    date: '2026.08.12',
    location: 'Bengaluru Sports Complex',
    caption: 'Recognized for individual effort and relentless energy throughout the tournament.',
    tag: 'AWARD',
  },
  {
    id: 'mem-05',
    src: '/photos/photo-foodcourt.jpg',
    alt: 'Felina sitting at a food court table with Chinese feast and Coca-Cola cans',
    title: 'Post-Match Food Court Run',
    date: '2026.07.24',
    location: 'Bengaluru',
    caption: 'Good food, Coke cans, endless noodles, and laughs with friends after a long day.',
    tag: 'CANDID',
  },
  {
    id: 'mem-06',
    src: '/photos/felina-portrait.webp',
    alt: 'Felina Doungel portrait — Bengaluru',
    title: 'Felina / Portrait 01',
    date: '2026.06.18',
    location: 'Bengaluru, India',
    caption: 'Student, creative, and human-first. Quiet daylight moments in Bengaluru.',
    tag: 'PORTRAIT',
  },
]
