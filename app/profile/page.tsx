'use client';

import { useAuth } from '@/contexts/AuthContext';
import { categories } from '@/data/mockData';
import { User, Mail, Award, BookOpen, Users, Settings, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  const userInterests = user.interests.map(interest => 
    categories.find(cat => cat.id === interest)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32"></div>
          <div className="px-8 pb-8">
            <div className="flex items-end -mt-16 mb-4">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <div className="ml-6 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                {user.isExpert && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mt-2">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    예비 전문가
                  </span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-3">기본 정보</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Award className="h-5 w-5 mr-2" />
                    <span>{user.badges.length}개의 뱃지 보유</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span>{user.completedCourses.length}개의 연수 수료</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-3">관심 분야</h2>
                <div className="flex flex-wrap gap-2">
                  {userInterests.map((category) => (
                    <span
                      key={category!.id}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {category!.icon} {category!.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Profile */}
        {user.isExpert && user.expertProfile && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl font-bold mb-4">전문가 프로필</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">소개</h3>
              <p className="text-gray-700">{user.expertProfile.bio}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">전문 분야</h3>
              <div className="flex flex-wrap gap-2">
                {user.expertProfile.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">주요 성과</h3>
              <ul className="space-y-1">
                {user.expertProfile.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Recent Badges */}
        {user.badges.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">최근 획득 뱃지</h2>
              <Link href="/my-badges" className="text-blue-600 hover:text-blue-700">
                전체보기
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {user.badges.slice(-3).reverse().map((badge) => (
                <div key={badge.id} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-sm font-medium">{badge.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(badge.earnedAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold mb-4">계정 관리</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-gray-600" />
                <span>프로필 수정</span>
              </div>
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-gray-600" />
                <span>관심 분야 변경</span>
              </div>
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}