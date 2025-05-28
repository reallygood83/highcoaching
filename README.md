# 하이코칭 (HiCoaching) - 교사 전문성 개발 플랫폼

교사들을 위한 전문성 개발 및 인증 플랫폼입니다. 전국의 교육 전문가들과 연결하고, 체계적인 연수를 통해 성장하며, 디지털 뱃지로 전문성을 인증받을 수 있습니다.

## 주요 기능

### 👨‍🏫 전문가 찾기
- 관심 분야별 전문가 검색
- 전문가 프로필 및 활동 확인
- 커뮤니티 및 연수 프로그램 연결

### 📚 연수 프로그램
- 다양한 교육 분야의 체계적인 연수
- 레벨별 맞춤 프로그램
- 수료 시 디지털 뱃지 발급

### 🏆 뱃지 시스템
- 연수 수료 시 화려한 애니메이션과 함께 뱃지 획득
- 3개 뱃지 획득 시 예비 전문가 등록 자격 부여
- 프로필에서 획득한 뱃지 관리

### 👥 커뮤니티
- 전문가가 운영하는 교육 커뮤니티
- 분야별 네트워킹 및 지식 공유
- 예비 전문가의 커뮤니티 운영 권한

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **배포**: Vercel

## 시작하기

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start
```

## 프로젝트 구조

```
highcoaching/
├── app/                    # Next.js App Router 페이지
│   ├── login/             # 로그인 페이지
│   ├── register/          # 회원가입 페이지
│   ├── onboarding/        # 관심분야 선택
│   ├── experts/           # 전문가 리스트
│   ├── courses/           # 연수 프로그램
│   ├── communities/       # 커뮤니티
│   ├── my-badges/         # 내 뱃지
│   ├── profile/           # 프로필
│   └── expert-registration/ # 예비 전문가 등록
├── components/            # 재사용 가능한 컴포넌트
├── contexts/              # React Context (인증)
├── data/                  # 목업 데이터
├── lib/                   # 유틸리티 함수
└── types/                 # TypeScript 타입 정의
```

## Vercel 배포

이 프로젝트는 Vercel을 통해 쉽게 배포할 수 있습니다:

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com)에 로그인
3. "Import Project" 클릭
4. GitHub 저장소 선택
5. 자동 배포 완료

## 라이선스

MIT License
