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
    src: '/photos/felina-portrait.webp',
    alt: 'Felina Doungel portrait — Bengaluru',
    title: 'Felina / Portrait 01',
    date: '2026.09.28',
    location: 'Bengaluru, India',
    caption: 'Student, creative, and human-first. Quiet daylight moments in Bengaluru.',
    tag: 'PORTRAIT',
  },
  {
    id: 'mem-02',
    src: '/projects/signbridge-hero.jpg',
    alt: 'SignBridge Indian Sign Language study & build',
    title: 'SignBridge Dev Session',
    date: '2026.09.20',
    location: 'Studio / Workstation',
    caption: 'Building SignBridge — bridging Indian Sign Language and conversational technology.',
    tag: 'WORK',
  },
  {
    id: 'mem-03',
    src: '/projects/signbridge-interface.png',
    alt: 'SignBridge translation interface & landmark capture',
    title: 'Landmark Interface',
    date: '2026.09.15',
    location: 'Interface Lab',
    caption: 'Gesture-to-text landmark recognition pipeline with privacy-first on-device execution.',
    tag: 'PROJECT',
  },
  {
    id: 'mem-04',
    src: '/photos/memory-01.svg',
    alt: 'Campus and city notes in Bengaluru',
    title: 'Campus Notes & City',
    date: '2026.08.12',
    location: 'Bengaluru Campus',
    caption: 'Everyday campus notes, late evening discussions, and random ideas taking shape.',
    tag: 'ARCHIVE',
  },
  {
    id: 'mem-05',
    src: '/photos/memory-02.svg',
    alt: 'Design iterations and typography studies',
    title: 'Typography & Layout',
    date: '2026.07.24',
    location: 'Design Studio',
    caption: 'Exploring tactile interfaces, retro hardware aesthetics, and physical-digital mediums.',
    tag: 'STUDY',
  },
  {
    id: 'mem-06',
    src: '/photos/memory-03.svg',
    alt: 'Memories archive and candid moments',
    title: 'Moments Kept Close',
    date: '2026.06.18',
    location: 'Bengaluru',
    caption: 'Football evenings, singing sessions, and good conversations with friends.',
    tag: 'MEMORY',
  },
]

