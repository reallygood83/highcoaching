'use client';

import { useAuth } from '@/contexts/AuthContext';
import { experts, courses, categories } from '@/data/mockData';
import Link from 'next/link';
import { ArrowRight, Users, BookOpen, Award, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user } = useAuth();
  const [recommendedExperts, setRecommendedExperts] = useState(experts.slice(0, 3));
  const [recommendedCourses, setRecommendedCourses] = useState(courses.slice(0, 3));

  useEffect(() => {
    if (user?.interests && user.interests.length > 0) {
      // Filter experts and courses based on user interests
      const filteredExperts = experts.filter(expert =>
        expert.specialties.some(specialty =>
          user.interests.some(interest =>
            categories.find(cat => cat.id === interest)?.name === specialty
          )
        )
      );
      const filteredCourses = courses.filter(course =>
        user.interests.includes(course.category)
      );

      setRecommendedExperts(filteredExperts.slice(0, 3));
      setRecommendedCourses(filteredCourses.slice(0, 3));
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              교사 전문성 개발의 새로운 시작
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              전국의 교육 전문가들과 함께 성장하세요
            </p>
            {!user && (
              <Link
                href="/register"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                지금 시작하기
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">전문가 네트워크</h3>
              <p className="text-gray-600">
                전국의 교육 전문가들과 연결되어 지식을 공유하고 협력하세요
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">체계적인 연수</h3>
              <p className="text-gray-600">
                검증된 전문가의 연수 프로그램으로 실무 역량을 강화하세요
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">전문성 인증</h3>
              <p className="text-gray-600">
                연수 이수 후 디지털 뱃지로 전문성을 인증받으세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Experts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {user?.interests?.length ? '추천 전문가' : '인기 전문가'}
            </h2>
            <Link
              href="/experts"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              전체보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedExperts.map((expert) => (
              <div key={expert.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <img
                    src={expert.imageUrl}
                    alt={expert.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{expert.name}</h3>
                    <p className="text-gray-600 text-sm">{expert.title}</p>
                    <p className="text-gray-500 text-sm">{expert.organization}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">{expert.rating} ({expert.reviewCount})</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {expert.specialties.slice(0, 2).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Courses */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {user?.interests?.length ? '추천 연수' : '인기 연수'}
            </h2>
            <Link
              href="/courses"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              전체보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{course.instructor.name}</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        무료
                      </span>
                      <span className="text-xs text-gray-500">수료 시 뱃지 발급</span>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="block w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors text-center"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {user?.badges && user.badges.length === 9 && (
        <section className="py-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 animate-pulse"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="text-8xl mb-6 animate-bounce">🏆</div>
            <h2 className="text-4xl font-bold mb-4">
              완벽한 마스터! 모든 뱃지 획득 완료! 🎉
            </h2>
            <p className="text-xl mb-8 text-yellow-100">
              9개의 모든 뱃지를 획득하여 하이코칭 교육 전문가가 되셨습니다!
            </p>
            <div className="flex justify-center space-x-4">
              {!user.isExpert && (
                <Link
                  href="/expert-registration"
                  className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  🎓 마스터 전문가 등록하기
                </Link>
              )}
              <Link
                href="/my-badges"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                🏆 내 뱃지 컬렉션 보기
              </Link>
            </div>
          </div>
        </section>
      )}
      
      {user?.badges && user.badges.length >= 3 && user.badges.length < 9 && !user.isExpert && (
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              축하합니다! 예비 전문가 등록 자격을 획득하셨습니다 🎉
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              {user.badges.length}개의 뱃지를 획득하셨습니다. 이제 예비 전문가로 등록할 수 있습니다.
            </p>
            <Link
              href="/expert-registration"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              예비 전문가 등록하기
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}