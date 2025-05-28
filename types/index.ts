export interface User {
  id: string;
  email: string;
  name: string;
  interests: string[];
  completedCourses: string[];
  badges: Badge[];
  isExpert: boolean;
  expertProfile?: ExpertProfile;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: Date;
  courseId: string;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  organization: string;
  specialties: string[];
  bio: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface ExpertProfile {
  bio: string;
  achievements: string[];
  specialties: string[];
  verifiedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Expert;
  duration: string;
  level: string;
  category: string;
  price: number;
  imageUrl: string;
  badgeId: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  expertId: string;
  category: string;
  imageUrl: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  authorTitle?: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  content: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
}