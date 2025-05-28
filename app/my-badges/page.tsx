'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Award, Share2, Download, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MyBadgesPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  const totalBadges = 8; // Total possible badges
  const earnedBadges = user.badges.length;
  const progress = (earnedBadges / totalBadges) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">내 뱃지 컬렉션</h1>
          
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">전체 진행률</span>
              <span className="text-gray-900 font-semibold">{earnedBadges} / {totalBadges} 뱃지</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
              />
            </div>
          </div>

          {/* Special Achievement Notice */}
          {earnedBadges >= 3 && !user.isExpert && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">
                    🎉 축하합니다! 예비 전문가 등록 자격을 획득하셨습니다!
                  </h3>
                  <p className="text-purple-700 text-sm">
                    3개 이상의 뱃지를 획득하여 예비 전문가로 등록할 수 있습니다.
                  </p>
                </div>
                <Link
                  href="/expert-registration"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  등록하기
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Badge Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {user.badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{badge.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
                <p className="text-xs text-gray-500 mb-4">
                  획득일: {new Date(badge.earnedAt).toLocaleDateString('ko-KR')}
                </p>
                
                <div className="flex justify-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Locked Badges */}
          {[...Array(Math.max(0, totalBadges - earnedBadges))].map((_, index) => (
            <div
              key={`locked-${index}`}
              className="bg-gray-100 rounded-lg p-6 border-2 border-dashed border-gray-300"
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-500 mb-1">미획득 뱃지</h3>
                <p className="text-gray-400 text-sm">연수를 수료하여 뱃지를 획득하세요</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {user.badges.length === 0 && (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">아직 획득한 뱃지가 없습니다</h3>
            <p className="text-gray-500 mb-6">연수 프로그램을 수료하여 첫 번째 뱃지를 획득해보세요!</p>
            <Link
              href="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              연수 프로그램 둘러보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}