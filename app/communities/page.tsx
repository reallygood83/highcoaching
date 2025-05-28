'use client';

import { useState, useEffect } from 'react';
import { communities, experts, categories } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function CommunitiesPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCommunities, setFilteredCommunities] = useState(communities);

  useEffect(() => {
    let filtered = communities;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        community =>
          community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          community.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(community => community.category === selectedCategory);
    }

    // Sort by user interests if logged in
    if (user?.interests && user.interests.length > 0) {
      filtered.sort((a, b) => {
        const aMatch = user.interests.includes(a.category);
        const bMatch = user.interests.includes(b.category);
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });
    }

    setFilteredCommunities(filtered);
  }, [searchQuery, selectedCategory, user]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">커뮤니티</h1>
          <p className="text-gray-600">전문가가 운영하는 커뮤니티에 참여하여 함께 성장하세요</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="커뮤니티 이름으로 검색..."
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

        {/* Community Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => {
            const expert = experts.find(e => e.id === community.expertId);
            return (
              <div key={community.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={community.imageUrl}
                  alt={community.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{community.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{community.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">{community.memberCount.toLocaleString()} 멤버</span>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {categories.find(c => c.id === community.category)?.name}
                    </span>
                  </div>

                  {expert && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-3">운영자</p>
                      <div className="flex items-center space-x-3">
                        <img
                          src={expert.imageUrl}
                          alt={expert.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">{expert.name}</p>
                          <p className="text-xs text-gray-500">{expert.title}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/communities/${community.id}`}
                    className="block w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    커뮤니티 참여하기
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCommunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* Create Community CTA for Experts */}
        {user?.isExpert && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">나만의 커뮤니티를 만들어보세요</h2>
            <p className="mb-6">예비 전문가로서 교육 커뮤니티를 운영할 수 있습니다</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              커뮤니티 만들기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}