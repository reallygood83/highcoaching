'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles, Star } from 'lucide-react';
import { Badge } from '@/types';

interface BadgeAnimationProps {
  badge: Badge;
  onClose: () => void;
}

export default function BadgeAnimation({ badge, onClose }: BadgeAnimationProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6
          }}
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              className="relative inline-block mb-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-16 h-16 text-white" />
              </div>
              
              {/* Sparkles animation */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [0, (Math.random() - 0.5) * 100],
                    y: [0, (Math.random() - 0.5) * 100],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5 + i * 0.1,
                    repeat: 2,
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              축하합니다! 🎉
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-700 mb-4"
            >
              새로운 뱃지를 획득하셨습니다!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {badge.name}
              </h3>
              <p className="text-gray-600">{badge.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center space-x-1 mb-6"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              계속하기
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}