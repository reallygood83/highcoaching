'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courses, badges } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import BadgeAnimation from '@/components/BadgeAnimation';
import { Clock, User, DollarSign, CheckCircle, Award, BookOpen, Users } from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const course = courses.find(c => c.id === params.id);
  const badge = badges.find(b => b.id === course?.badgeId);
  const isEnrolled = user?.completedCourses.includes(course?.id || '');

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">연수를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setEnrolling(true);
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update user data
    const updatedCourses = [...user.completedCourses, course.id];
    const newBadge = badge ? {
      ...badge,
      earnedAt: new Date()
    } : null;
    
    const updatedBadges = newBadge ? [...user.badges, newBadge] : user.badges;

    updateUser({
      completedCourses: updatedCourses,
      badges: updatedBadges
    });

    setEnrolling(false);
    
    if (newBadge) {
      setShowBadgeAnimation(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {course.level}
              </span>
              {isEnrolled && (
                <span className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-1" />
                  수료 완료
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-700 mb-6">{course.description}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <User className="h-5 w-5 mr-2" />
                <span>{course.instructor.name}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-5 w-5 mr-2" />
                <span>₩{course.price.toLocaleString()}</span>
              </div>
            </div>

            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enrolling ? '수강 신청 중...' : '수강 신청하기'}
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium">이미 수료한 연수입니다</p>
              </div>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">연수 내용</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>최신 교육 트렌드와 방법론 학습</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>실제 교육 현장 적용 사례 공유</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>동료 교사들과의 네트워킹 기회</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>전문가의 1:1 피드백 제공</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">강사 소개</h2>
              <div className="flex items-start space-x-4">
                <img
                  src={course.instructor.imageUrl}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{course.instructor.name}</h3>
                  <p className="text-gray-600">{course.instructor.title}</p>
                  <p className="text-gray-500 text-sm">{course.instructor.organization}</p>
                  <p className="text-gray-700 mt-2">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold mb-4">수료 혜택</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-sm">디지털 뱃지 발급</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm">수료증 발급</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">전문가 커뮤니티 가입</span>
                </div>
              </div>
            </div>

            {badge && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4">획득 가능 뱃지</h3>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="font-semibold">{badge.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Badge Animation Modal */}
      {showBadgeAnimation && badge && (
        <BadgeAnimation
          badge={badge}
          onClose={() => {
            setShowBadgeAnimation(false);
            router.push('/my-badges');
          }}
        />
      )}
    </div>
  );
}