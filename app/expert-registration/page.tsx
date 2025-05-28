'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Award, CheckCircle, FileText, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExpertRegistrationPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [bio, setBio] = useState('');
  const [achievements, setAchievements] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    router.push('/login');
    return null;
  }

  if (user.badges.length < 3) {
    router.push('/my-badges');
    return null;
  }

  if (user.isExpert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">이미 전문가로 등록되었습니다</h2>
          <p className="text-gray-600">프로필 페이지에서 전문가 정보를 확인하세요.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    updateUser({
      isExpert: true,
      expertProfile: {
        bio,
        achievements: achievements.split('\n').filter(a => a.trim()),
        specialties: user.interests.map(interest => 
          interest.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        ),
        verifiedAt: new Date()
      }
    });

    setSubmitting(false);
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">예비 전문가 등록</h1>
              <p className="text-purple-100">
                축하합니다! 3개의 뱃지를 획득하여 예비 전문가 등록 자격을 얻으셨습니다.
              </p>
            </div>
          </div>

          {/* Your Badges */}
          <div className="p-8 border-b">
            <h2 className="text-xl font-semibold mb-4">획득한 뱃지</h2>
            <div className="grid grid-cols-3 gap-4">
              {user.badges.slice(0, 3).map((badge) => (
                <div key={badge.id} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  전문가 소개
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="교육 철학, 전문 분야, 경력 등을 자유롭게 소개해주세요..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="inline h-4 w-4 mr-1" />
                  주요 성과 및 활동 (한 줄에 하나씩)
                </label>
                <textarea
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="예시:
2023년 우수 교육자상 수상
AI 교육 관련 논문 3편 발표
교사 연수 프로그램 10회 진행
학생 주도 프로젝트 멘토링 5년"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 mb-2">예비 전문가 혜택</h3>
                <ul className="space-y-1 text-sm text-purple-700">
                  <li>• 전문가 리스트에 프로필 등록</li>
                  <li>• 커뮤니티 운영 권한 부여</li>
                  <li>• 연수 프로그램 개설 자격 획득</li>
                  <li>• 전문가 네트워킹 행사 초대</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? '등록 중...' : '예비 전문가로 등록하기'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}