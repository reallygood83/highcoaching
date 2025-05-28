'use client';

import { useAuth } from '@/contexts/AuthContext';
import { experts, courses, categories } from '@/data/mockData';
import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight, Users, BookOpen, Award } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-200 border border-blue-500/30">
                  🚀 대한민국 1위 교사 성장 플랫폼
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  교사 전문성 개발의
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  새로운 시작
                </span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                전국의 교육 전문가들과 함께 성장하고,<br />
                체계적인 연수와 뱃지 시스템으로 전문성을 인증받으세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <>
                    <Link
                      href="/register"
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      🎯 무료로 시작하기
                    </Link>
                    <Link
                      href="/experts"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      👥 전문가 둘러보기
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    📚 연수 프로그램 보기
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">10+</div>
                    <div className="text-sm opacity-90">전문가</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">9</div>
                    <div className="text-sm opacity-90">연수 프로그램</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">8</div>
                    <div className="text-sm opacity-90">커뮤니티</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">9</div>
                    <div className="text-sm opacity-90">디지털 뱃지</div>
                  </div>
                </div>
                <div className="text-center text-sm opacity-75">
                  실시간 업데이트되는 학습 현황
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              왜 <span className="text-blue-600">하이코칭</span>인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              교사들의 성장을 위해 설계된 체계적이고 혁신적인 학습 플랫폼
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">전문가 네트워크</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  전국의 교육 전문가들과 연결되어 지식을 공유하고 협력하세요. 
                  실시간 커뮤니티에서 경험을 나누고 함께 성장해보세요.
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    10+ 명의 전문가
                  </span>
                </div>
              </div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">체계적인 연수</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  검증된 전문가의 연수 프로그램으로 실무 역량을 강화하세요. 
                  모든 연수는 무료로 제공되며 언제든지 수강할 수 있습니다.
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    9개 연수 프로그램
                  </span>
                </div>
              </div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">전문성 인증</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  연수 이수 후 디지털 뱃지로 전문성을 인증받으세요. 
                  9개 뱃지 모두 획득하면 마스터 전문가로 등록할 수 있습니다.
                </p>
                <div className="mt-6 text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    9개 디지털 뱃지
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Experts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {user?.interests?.length ? '맞춤 추천 전문가' : '인기 전문가'}
            </h2>
            <p className="text-xl text-gray-600">
              각 분야의 최고 전문가들과 함께 성장하세요
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recommendedExperts.map((expert) => (
              <div key={expert.id} className="group">
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <NextImage
                        src={expert.imageUrl}
                        alt={expert.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {expert.rating}⭐
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{expert.name}</h3>
                    <p className="text-blue-600 font-medium text-sm mb-1">{expert.title}</p>
                    <p className="text-gray-500 text-sm mb-4">{expert.organization}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {expert.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {expert.specialties.slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-full border border-blue-100"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      {expert.reviewCount}명의 교사가 추천
                    </div>
                    <Link
                      href="/experts"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform group-hover:scale-105"
                    >
                      프로필 보기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/experts"
              className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              모든 전문가 보기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Courses */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {user?.interests?.length ? '맞춤 추천 연수' : '인기 연수 프로그램'}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              전문가의 체계적인 연수로 교육 역량을 한 단계 업그레이드하세요
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-full font-medium">
              🎉 모든 연수 무료 제공
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <NextImage
                      src={course.imageUrl}
                      alt={course.title}
                      width={400}
                      height={224}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        무료
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-6">
                      <NextImage
                        src={course.instructor.imageUrl}
                        alt={course.instructor.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">{course.instructor.name}</p>
                        <p className="text-gray-500 text-xs">{course.duration}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-700">수료 시 뱃지 발급</span>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/courses/${course.id}`}
                      className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-center font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform group-hover:scale-105"
                    >
                      연수 시작하기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-md"
            >
              모든 연수 프로그램 보기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">함께 성장하는 하이코칭</h2>
            <p className="text-xl text-blue-100">
              전국의 교사들이 선택한 신뢰할 수 있는 교육 플랫폼
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1,000+</div>
              <p className="text-blue-100">누적 회원 수</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10+</div>
              <p className="text-blue-100">검증된 전문가</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">9</div>
              <p className="text-blue-100">연수 프로그램</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">98%</div>
              <p className="text-blue-100">만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">교사들의 생생한 후기</h2>
            <p className="text-xl text-gray-600">하이코칭과 함께 성장한 교사들의 이야기</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <NextImage
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
                  alt="이선미"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">이선미</h4>
                  <p className="text-gray-600 text-sm">초등학교 교사</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;AI 교육 연수를 통해 수업의 질이 정말 향상되었어요. 학생들도 더 적극적으로 참여하고, 저 역시 더 효과적인 교육을 할 수 있게 되었습니다.&rdquo;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {'★'.repeat(5)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <NextImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="박준호"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">박준호</h4>
                  <p className="text-gray-600 text-sm">중학교 교사</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;전문가들과의 네트워킹이 정말 유용했어요. 현장에서 바로 적용할 수 있는 실질적인 조언들을 많이 얻었습니다. 9개 뱃지 모두 획득했어요!&rdquo;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {'★'.repeat(5)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <NextImage
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
                  alt="김영은"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">김영은</h4>
                  <p className="text-gray-600 text-sm">고등학교 교사</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &ldquo;무료로 이런 양질의 연수를 받을 수 있다는 게 정말 놀라워요. 커뮤니티에서 다른 선생님들과 소통하며 많은 영감을 받고 있습니다.&rdquo;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {'★'.repeat(5)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 디지털 전문교원 아카데미 하이코칭 3분과. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}