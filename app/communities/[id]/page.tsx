'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { communities, experts } from '@/data/mockData';
import { communityPosts } from '@/data/communityPosts';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Users, Heart, MessageCircle, Share2, MoreHorizontal, Image, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState(communityPosts[params.id as string] || []);

  const community = communities.find(c => c.id === params.id);
  const expert = community ? experts.find(e => e.id === community.expertId) : null;

  if (!community || !expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">커뮤니티를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleComment = (postId: string, content: string) => {
    if (!user || !content.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      authorId: user.id,
      authorName: user.name,
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      content: content.trim(),
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!user || !newPostContent.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      authorId: user.id,
      authorName: user.name,
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      authorTitle: user.isExpert ? '예비 전문가' : undefined,
      content: newPostContent.trim(),
      createdAt: new Date(),
      likes: 0,
      comments: [],
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <NextImage
              src={community.imageUrl}
              alt={community.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold">{community.name}</h1>
              <div className="flex items-center text-gray-600 text-sm">
                <Users className="h-4 w-4 mr-1" />
                <span>{community.memberCount.toLocaleString()}명의 멤버</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Community Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start space-x-4">
            <NextImage
              src={expert.imageUrl}
              alt={expert.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{expert.name}</h2>
              <p className="text-gray-600">{expert.title} · {expert.organization}</p>
              <p className="text-gray-700 mt-2">{community.description}</p>
            </div>
          </div>
        </div>

        {/* New Post */}
        {user && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex space-x-3">
              <NextImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                alt={user.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="이 커뮤니티와 생각을 공유해보세요..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex justify-between items-center mt-3">
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <Image className="h-5 w-5 mr-2" aria-label="사진 추가" />
                    사진 추가
                  </button>
                  <button
                    onClick={handleNewPost}
                    disabled={!newPostContent.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    게시
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-3">
                    <NextImage
                      src={post.authorImage}
                      alt={post.authorName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{post.authorName}</h3>
                      {post.authorTitle && (
                        <p className="text-sm text-gray-600">{post.authorTitle}</p>
                      )}
                      <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.imageUrl && (
                <div className="px-6 pb-4">
                  <NextImage
                    src={post.imageUrl}
                    alt="게시물 이미지"
                    width={600}
                    height={400}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 ${
                        post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      } transition-colors`}
                    >
                      <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{post.comments.length}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span>공유</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="space-y-3 mt-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <NextImage
                          src={comment.authorImage}
                          alt={comment.authorName}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="font-semibold text-sm">{comment.authorName}</p>
                            <p className="text-gray-900">{comment.content}</p>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{formatDate(comment.createdAt)}</span>
                            <button className="hover:text-red-500">좋아요</button>
                            <button className="hover:text-blue-500">답글</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comment Input */}
              {user && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="flex space-x-3 mt-4">
                    <NextImage
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="댓글을 입력하세요..."
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(post.id, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">아직 게시물이 없습니다</h3>
            <p className="text-gray-600">첫 번째 게시물을 작성해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}