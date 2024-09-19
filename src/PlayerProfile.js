import React, { useState } from 'react';
import GameLog from './GameLog';
import { FaShieldAlt, FaTrophy, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function PlayerProfile({ player }) {
  const [activeTab, setActiveTab] = useState('badges');
  const [expandedSeasons, setExpandedSeasons] = useState({ '2023': true });

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

  const awardLabels = {
    championships: "NBA Champion",
    mvps: "NBA MVP",
    allNBAFirstTeam: "All-NBA First Team",
    allStar: "NBA All-Star",
    scoringChampion: "NBA Scoring Champion",
    dpoy: "NBA Defensive Player of the Year",
    finalsMVP: "NBA Finals MVP",
  };

  const toggleSeason = (season) => {
    setExpandedSeasons(prev => ({
      ...prev,
      [season]: !prev[season]
    }));
  };

  // Mock data for game logs of different seasons
  const gameLogSeasons = {
    '2023': player.gameLog,
    '2022': player.gameLog.map(game => ({ ...game, date: game.date.replace('2023', '2022') })),
    '2021': player.gameLog.map(game => ({ ...game, date: game.date.replace('2023', '2021') }))
  };

  return (
    <div className="player-profile mt-4">
      {/* Player info section */}
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
      
      {/* Badges and Awards section */}
      <div className="mt-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
          <div className="flex bg-gray-100 relative">
            <button
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'badges'
                  ? 'bg-white text-gray-900 rounded-t-lg border-b-2 border-gray-900'
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('badges')}
            >
              Fantasy Badges
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'awards'
                  ? 'bg-white text-gray-900 rounded-t-lg border-b-2 border-gray-900'
                  : 'text-gray-500 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('awards')}
            >
              Awards and Career Achievements
            </button>
          </div>
          
          <div className="border-t border-gray-200">
            {activeTab === 'badges' && (
              <div className="p-4">
                <h5 className="font-semibold text-sm mb-2">2023</h5>
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
                <hr className="my-4 border-t border-gray-200 -mx-4" />
                <div className="mt-2">
                  {previousSeasonsBadges.map((season, seasonIndex) => (
                    <React.Fragment key={seasonIndex}>
                      {seasonIndex > 0 && <hr className={`border-t border-gray-200 -mx-4 ${expandedSeasons[season.season] ? 'my-2' : 'my-0.5'}`} />}
                      <div className="py-0.5"> {/* Reduced padding */}
                        <button 
                          className="flex items-center justify-between w-full text-left font-semibold text-sm h-7" // Reduced height
                          onClick={() => toggleSeason(season.season)}
                        >
                          <span>{season.season}</span>
                          {expandedSeasons[season.season] ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {expandedSeasons[season.season] && (
                          <div className="flex flex-wrap -m-1 mt-2">
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
                        )}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'awards' && (
              <div className="p-4">
                <ul className="list-none">
                  {Object.entries(player).map(([key, value], index) => {
                    if (typeof value === 'number' && key !== 'number' && awardLabels[key]) {
                      return (
                        <React.Fragment key={index}>
                          <li className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">{value}x {awardLabels[key]}</span>
                            </div>
                            <div className="flex">
                              {Array.from({ length: value }).map((_, i) => (
                                <FaTrophy key={i} className="text-yellow-400 ml-1" />
                              ))}
                            </div>
                          </li>
                          {index < Object.entries(player).length - 1 && (
                            <hr className="my-2 border-t border-gray-200 mx-[-1rem]" />
                          )}
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Log section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">{player.name}'s Game Log</h3>
        <GameLog 
          gameLogSeasons={gameLogSeasons}
          playerName={player.name}
          isNFL={player.sport === "NFL"}
          showTitle={false}
          expandedSeasons={expandedSeasons}
          toggleSeason={toggleSeason}
        />
      </div>
    </div>
  );
}

export default PlayerProfile;