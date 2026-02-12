import { Song, Project, ProjectStatus } from './types';

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: '네온 시티의 밤 (Neon City)',
    artist: '퓨처 신스',
    genre: 'Synthwave',
    bpm: 120,
    key: 'Am',
    price: 30000,
    coverUrl: 'https://picsum.photos/400/400?random=1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    tags: ['신나는', '드라이브', '도시'],
    description: '도심의 야경이 떠오르는 신나는 신스웨이브 트랙입니다.'
  },
  {
    id: '2',
    title: '나른한 오후',
    artist: '어쿠스틱 바이브',
    genre: 'Acoustic Pop',
    bpm: 85,
    key: 'C',
    price: 25000,
    coverUrl: 'https://picsum.photos/400/400?random=2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    tags: ['힐링', '따뜻한', '브이로그'],
    description: '부드러운 어쿠스틱 기타 선율이 돋보이는 곡입니다.'
  },
  {
    id: '3',
    title: '영웅의 여정',
    artist: '오케스트라 마인드',
    genre: 'Cinematic',
    bpm: 140,
    key: 'Dm',
    price: 50000,
    coverUrl: 'https://picsum.photos/400/400?random=3',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    tags: ['웅장한', '영화음악', '트레일러'],
    description: '가슴 벅차오르는 웅장한 오케스트라 빌드업.'
  },
  {
    id: '4',
    title: '여름 바캉스',
    artist: 'DJ 트로피컬',
    genre: 'Tropical House',
    bpm: 115,
    key: 'G',
    price: 35000,
    coverUrl: 'https://picsum.photos/400/400?random=4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    tags: ['파티', '여름', '댄스'],
    description: '청량감 넘치는 보컬 찹과 시원한 리듬.'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: '첫 번째 발라드 프로젝트',
    type: 'AI_ASSISTED',
    status: ProjectStatus.CONSULTATION,
    lastUpdated: '2023-10-25T14:30:00Z',
    expertName: '프로듀서 김작곡',
    aiData: {
      lyrics: "가로수길을 걷다가\n문득 네 생각이 났어...",
      melodyDescription: "느린 템포의 피아노 반주, 코러스에서 스트링이 들어오며 감정이 고조됨.",
      style: "감성 발라드"
    }
  },
  {
    id: 'p2',
    title: '기업 홍보영상 BGM',
    type: 'PURCHASE',
    status: ProjectStatus.COMPLETED,
    lastUpdated: '2023-10-20T09:00:00Z',
  }
];

export const GENRE_OPTIONS = [
  "K-Pop", "발라드", "R&B", "힙합", "락", "인디", "트로트", "재즈", "EDM"
];

export const MOOD_OPTIONS = [
  "슬픔", "행복", "활기찬", "차분한", "로맨틱", "긴장감", "몽환적"
];