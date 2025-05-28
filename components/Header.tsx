'use client';

import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, Menu, X, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">하이코칭</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/experts" className="text-gray-700 hover:text-blue-600 transition-colors">
              전문가 찾기
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              연수 프로그램
            </Link>
            <Link href="/communities" className="text-gray-700 hover:text-blue-600 transition-colors">
              커뮤니티
            </Link>
            {user && (
              <Link href="/my-badges" className="text-gray-700 hover:text-blue-600 transition-colors">
                내 뱃지
              </Link>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                  로그인
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  회원가입
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <Link
                href="/experts"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                전문가 찾기
              </Link>
              <Link
                href="/courses"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                연수 프로그램
              </Link>
              <Link
                href="/communities"
                className="block text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                커뮤니티
              </Link>
              {user ? (
                <>
                  <Link
                    href="/my-badges"
                    className="block text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    내 뱃지
                  </Link>
                  <Link
                    href="/profile"
                    className="block text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    프로필
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-600 hover:text-red-700 transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/register"
                    className="block bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}