import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

function Badges({ badges = [] }) {
  if (badges.length === 0) return null;

  // Limit to 10 visible badges
  const visibleBadges = badges.slice(0, 10);

  const getBadgeColor = (type) => {
    switch (type) {
      case 'champion': return 'text-yellow-400';
      case 'mvp': return 'text-red-500';
      case 'allStar': return 'text-blue-500';
      case 'scoring': return 'text-green-500';
      case 'defense': return 'text-purple-500';
      case 'record': return 'text-pink-500';
      case 'milestone': return 'text-indigo-500';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="mt-4 mb-6">
      <h3 className="text-xl font-semibold mb-2">Badges</h3>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h4 className="font-semibold text-sm">2023 Season</h4>
        </div>
        <div className="p-3">
          <div className="flex justify-between px-2">
            {visibleBadges.map((badge, index) => (
              <div key={index} className="relative group px-1">
                <div className="flex items-center justify-center">
                  <FaShieldAlt className={`text-3xl ${getBadgeColor(badge.type)}`} />
                </div>
                <span className={`absolute bottom-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 mb-1
                  ${index === 0 ? 'left-0' : index === visibleBadges.length - 1 ? 'right-0' : 'left-1/2 transform -translate-x-1/2'}`}>
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badges;