'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { categories } from '@/data/mockData';
import { CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const toggleInterest = (categoryId: string) => {
    setSelectedInterests(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleComplete = () => {
    if (selectedInterests.length === 0) {
      alert('최소 1개 이상의 관심 분야를 선택해주세요.');
      return;
    }

    updateUser({ interests: selectedInterests });
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              환영합니다, {user?.name}님! 👋
            </h1>
            <p className="text-lg text-gray-600">
              관심 있는 교육 분야를 선택해주세요. 맞춤형 전문가와 연수를 추천해드립니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleInterest(category.id)}
                className={`relative p-6 rounded-lg border-2 transition-all ${
                  selectedInterests.includes(category.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium text-gray-900">{category.name}</div>
                {selectedInterests.includes(category.id) && (
                  <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-blue-500" />
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleComplete}
              disabled={selectedInterests.length === 0}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              선택 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}