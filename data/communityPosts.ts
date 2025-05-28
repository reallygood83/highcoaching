import { Post } from '@/types';
import { experts } from './mockData';

export const communityPosts: { [communityId: string]: Post[] } = {
  '1': [ // AI 교육 혁신가들
    {
      id: '1',
      authorId: '1',
      authorName: '김철수',
      authorImage: experts[0].imageUrl,
      authorTitle: '서울대학교 교육학과 교수',
      content: 'ChatGPT를 활용한 개별 맞춤형 학습지 제작 방법을 공유합니다! 학생들의 수준에 맞는 문제를 자동으로 생성하고, 즉시 피드백을 제공하는 시스템을 구축했어요. 관심 있으신 분들께 자세한 가이드를 공유드릴게요.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      createdAt: new Date('2024-01-15T10:30:00'),
      likes: 47,
      comments: [
        {
          id: '1',
          authorId: '2',
          authorName: '이영희',
          authorImage: experts[1].imageUrl,
          content: '정말 유용한 정보네요! 혹시 프롬프트 예시도 공유해 주실 수 있을까요?',
          createdAt: new Date('2024-01-15T11:15:00'),
          likes: 5,
          isLiked: false,
        },
        {
          id: '2',
          authorId: '7',
          authorName: '최동훈',
          authorImage: experts[6].imageUrl,
          content: '우리 학교에서도 도입을 검토 중입니다. 구체적인 활용 사례가 더 있다면 참고하고 싶어요.',
          createdAt: new Date('2024-01-15T14:20:00'),
          likes: 3,
          isLiked: false,
        }
      ],
      isLiked: true,
    },
    {
      id: '2',
      authorId: '7',
      authorName: '최동훈',
      authorImage: experts[6].imageUrl,
      authorTitle: '서울시교육청 교육연구사',
      content: '🚀 AI 시대의 교육자로서 우리가 갖춰야 할 역량은 무엇일까요? 개인적으로는 1) AI 도구 활용 능력 2) 비판적 사고 지도 3) 창의적 문제해결 지도가 핵심이라고 생각합니다. 여러분의 의견은 어떠신가요?',
      createdAt: new Date('2024-01-14T16:45:00'),
      likes: 32,
      comments: [
        {
          id: '3',
          authorId: '1',
          authorName: '김철수',
          authorImage: experts[0].imageUrl,
          content: '동의합니다! 여기에 더해 AI 윤리 교육도 중요하다고 생각해요.',
          createdAt: new Date('2024-01-14T17:10:00'),
          likes: 8,
          isLiked: true,
        }
      ],
      isLiked: false,
    }
  ],
  '2': [ // 창의교육 실천 공동체
    {
      id: '3',
      authorId: '10',
      authorName: '임하은',
      authorImage: experts[9].imageUrl,
      authorTitle: '한양대학교 융합교육원 연구교수',
      content: '오늘 수업에서 학생들과 함께 한 "미래의 교실" 디자인 프로젝트 결과물입니다! 💡 VR, 홀로그램, AI 튜터까지... 아이들의 상상력은 정말 무한하네요. 이런 창의적 활동을 통해 학생들이 미래를 주도적으로 그려나가는 모습이 인상적이었어요.',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
      createdAt: new Date('2024-01-13T14:20:00'),
      likes: 56,
      comments: [
        {
          id: '4',
          authorId: '2',
          authorName: '이영희',
          authorImage: experts[1].imageUrl,
          content: '와! 정말 멋진 아이디어들이네요. 프로젝트 진행 과정도 궁금해요.',
          createdAt: new Date('2024-01-13T15:30:00'),
          likes: 4,
          isLiked: false,
        }
      ],
      isLiked: true,
    }
  ],
  '3': [ // STEAM 교육 연구회
    {
      id: '4',
      authorId: '5',
      authorName: '한지우',
      authorImage: experts[4].imageUrl,
      authorTitle: '한국과학창의재단 선임연구원',
      content: '🔬 "바이러스와 백신" 융합 프로젝트 수업 후기를 공유합니다. 과학(바이러스 구조), 기술(현미경 관찰), 공학(모형 제작), 예술(인포그래픽), 수학(감염률 계산)을 모두 아우르는 수업이었어요. 학생들의 몰입도가 정말 높았습니다!',
      imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
      createdAt: new Date('2024-01-12T11:00:00'),
      likes: 41,
      comments: [],
      isLiked: false,
    }
  ]
};