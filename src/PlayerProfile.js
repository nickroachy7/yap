import React, { useState } from 'react';
import GameLog from './GameLog';
import Awards from './Awards';
import { FaShieldAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function PlayerProfile({ player }) {
  const [showMoreSeasons, setShowMoreSeasons] = useState(false);

  // Extended mock game log data
  const gameLog = [
    { date: '2023-05-10', opponent: 'PHX', result: 'W 115-105', min: 37, pts: 32, reb: 8, ast: 9 },
    { date: '2023-05-07', opponent: 'LAC', result: 'W 122-112', min: 39, pts: 29, reb: 10, ast: 7 },
    { date: '2023-05-04', opponent: 'SAC', result: 'L 110-118', min: 38, pts: 27, reb: 6, ast: 11 },
    { date: '2023-05-01', opponent: 'GSW', result: 'W 120-110', min: 36, pts: 28, reb: 7, ast: 8 },
    { date: '2023-04-28', opponent: 'DEN', result: 'L 108-115', min: 38, pts: 25, reb: 9, ast: 6 },
    { date: '2023-04-26', opponent: 'MEM', result: 'W 125-118', min: 35, pts: 30, reb: 8, ast: 10 },
    { date: '2023-04-23', opponent: 'POR', result: 'W 130-120', min: 34, pts: 26, reb: 7, ast: 12 },
    { date: '2023-04-21', opponent: 'UTA', result: 'W 118-105', min: 36, pts: 31, reb: 9, ast: 8 },
    { date: '2023-04-19', opponent: 'OKC', result: 'L 112-115', min: 37, pts: 28, reb: 8, ast: 7 },
    { date: '2023-04-16', opponent: 'HOU', result: 'W 125-109', min: 33, pts: 24, reb: 6, ast: 9 },
  ];

  // Function to truncate bio text
  const truncateBio = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

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

  // Mock data for previous seasons' badges
  const previousSeasonsBadges = [
    {
      season: '2022',
      badges: player.badges.slice(0, 8) // Just using a subset of current badges for demonstration
    },
    {
      season: '2021',
      badges: player.badges.slice(0, 6)
    }
  ];

  return (
    <div className="player-profile mt-4">
      <div className="flex mb-4">
        <div className="w-40 h-40 bg-gray-200 rounded-lg mr-6 flex-shrink-0">
          {player.image && <img src={player.image} alt={player.name} className="w-full h-full object-cover rounded-lg" />}
        </div>
        <div className="flex-grow flex flex-col h-40">
          <div>
            <h2 className="text-2xl font-bold">
              {player.name}
              {player.number && <span className="ml-2 text-gray-500">#{player.number}</span>}
            </h2>
            <p className="text-gray-600">{player.team} • {player.position}</p>
            {player.nickname && <p className="text-gray-500 italic">"{player.nickname}"</p>}
          </div>
          <div className="bg-gray-100 p-3 rounded-lg mt-auto">
            <p className="text-gray-700 text-sm line-clamp-3">{truncateBio(player.bio, 150)}</p>
          </div>
        </div>
      </div>
      
      {player.badges && player.badges.length > 0 && (
        <div className="mt-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-semibold text-sm">{player.name}'s 2023 Fantasy Badges</h4>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap -m-1">
                {player.badges.slice(0, 10).map((badge, index) => (
                  <div key={index} className="relative group m-1">
                    <div className="flex items-center justify-center">
                      <FaShieldAlt className={`text-3xl ${getBadgeColor(badge.type)}`} />
                    </div>
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 mb-1">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {showMoreSeasons && (
              <div className="border-t border-gray-200">
                {previousSeasonsBadges.map((season, seasonIndex) => (
                  <div key={seasonIndex} className="p-4 border-b border-gray-200 last:border-b-0">
                    <h5 className="font-semibold text-sm mb-2">{player.name}'s {season.season} Fantasy Badges</h5>
                    <div className="flex flex-wrap -m-1">
                      {season.badges.map((badge, badgeIndex) => (
                        <div key={badgeIndex} className="relative group m-1">
                          <div className="flex items-center justify-center">
                            <FaShieldAlt className={`text-3xl ${getBadgeColor(badge.type)}`} />
                          </div>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 mb-1">
                            {badge.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
              <button
                className="w-full text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center"
                onClick={() => setShowMoreSeasons(!showMoreSeasons)}
              >
                {showMoreSeasons ? (
                  <>
                    <FaChevronUp className="mr-2" />
                    <span>Less</span>
                  </>
                ) : (
                  <>
                    <FaChevronDown className="mr-2" />
                    <span>More Seasons</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Awards player={player} />

      <GameLog games={player.gameLog} playerName={player.name} isNFL={player.sport === "NFL"} />
    </div>
  );
}

export default PlayerProfile;