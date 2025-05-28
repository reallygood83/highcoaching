'use client';

import { useState, useEffect } from 'react';
import { experts, categories } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, Star, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function ExpertsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredExperts, setFilteredExperts] = useState(experts);

  useEffect(() => {
    let filtered = experts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        expert =>
          expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expert.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
          expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryName = categories.find(c => c.id === selectedCategory)?.name;
      if (categoryName) {
        filtered = filtered.filter(expert =>
          expert.specialties.includes(categoryName)
        );
      }
    }

    // Sort by user interests if logged in
    if (user?.interests && user.interests.length > 0) {
      filtered.sort((a, b) => {
        const aMatch = a.specialties.some(specialty =>
          user.interests.some(interest =>
            categories.find(cat => cat.id === interest)?.name === specialty
          )
        );
        const bMatch = b.specialties.some(specialty =>
          user.interests.some(interest =>
            categories.find(cat => cat.id === interest)?.name === specialty
          )
        );
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });
    }

    setFilteredExperts(filtered);
  }, [searchQuery, selectedCategory, user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전문가 찾기</h1>
          <p className="text-gray-600">전국의 교육 전문가들과 함께 성장하세요</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="전문가 이름, 전문 분야로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">모든 분야</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Expert Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <div key={expert.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={expert.imageUrl}
                  alt={expert.name}
                  className="w-20 h-20 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{expert.name}</h3>
                  <p className="text-gray-600">{expert.title}</p>
                  <p className="text-gray-500 text-sm">{expert.organization}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1 text-gray-600">
                      {expert.rating} ({expert.reviewCount} 리뷰)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">{expert.bio}</p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {expert.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">커뮤니티 활동</span>
                  </div>
                  <Link
                    href={`/communities?expert=${expert.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    보기
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span className="text-sm">연수 프로그램</span>
                  </div>
                  <Link
                    href={`/courses?instructor=${expert.id}`}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}