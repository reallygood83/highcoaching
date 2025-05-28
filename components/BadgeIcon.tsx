import { Award } from 'lucide-react';

interface BadgeIconProps {
  name: string;
  className?: string;
}

export default function BadgeIcon({ name, className = "w-12 h-12" }: BadgeIconProps) {
  // Return different colored badges based on name
  const getBadgeGradient = () => {
    if (name.includes('AI')) return 'from-blue-400 to-cyan-500';
    if (name.includes('PBL') || name.includes('프로젝트')) return 'from-green-400 to-emerald-500';
    if (name.includes('창의')) return 'from-purple-400 to-pink-500';
    if (name.includes('정서')) return 'from-rose-400 to-red-500';
    return 'from-yellow-400 to-orange-500';
  };

  return (
    <div className={`bg-gradient-to-br ${getBadgeGradient()} rounded-full flex items-center justify-center ${className}`}>
      <Award className="w-1/2 h-1/2 text-white" />
    </div>
  );
}