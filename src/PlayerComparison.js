import React, { useState } from 'react';
import GameLog from './GameLog';
import { FaShieldAlt, FaChevronDown, FaChevronUp, FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

function PlayerComparison({ players }) {
  const [showMoreAwards, setShowMoreAwards] = useState(false);
  const [expandedSeasons, setExpandedSeasons] = useState({ '2023': true, '2022': false, '2021': false });
  const [activeTab, setActiveTab] = useState('badges');
  
  const statCategories = ['PPG', 'RPG', 'APG', 'FG%', '3P%', 'FT%'];

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

  // Mock game log data for both players
  const mockGameLog = [
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

  // Create mock gameLogSeasons for each player
  const createMockGameLogSeasons = () => ({
    '2023': mockGameLog,
    '2022': mockGameLog.map(game => ({ ...game, date: game.date.replace('2023', '2022') })),
    '2021': mockGameLog.map(game => ({ ...game, date: game.date.replace('2023', '2021') }))
  });

  const toggleSeason = (season) => {
    setExpandedSeasons(prev => ({
      ...prev,
      [season]: !prev[season]
    }));
  };

  const renderAwardIcons = (count, Icon) => {
    return Array(count).fill().map((_, index) => <Icon key={index} className="text-yellow-400 ml-1" />);
  };

  const renderAwardRow = (label, count, Icon) => (
    <div className="px-4 py-2 flex justify-between items-center text-sm">
      <span className="font-medium flex items-center">
        {count}x {label}
      </span>
      <div className="flex items-center">
        {renderAwardIcons(count, Icon)}
      </div>
    </div>
  );

  const mainAwards = [
    { label: "NBA Champion", countKey: "championships", Icon: FaTrophy },
    { label: "NBA MVP", countKey: "mvps", Icon: FaMedal },
    { label: "All-NBA First Team", countKey: "allNBAFirstTeam", Icon: FaStar },
  ];

  const additionalAwards = [
    { label: "All-Star", countKey: "allStar", Icon: FaStar },
    { label: "Scoring Champion", countKey: "scoringChampion", Icon: FaTrophy },
    { label: "Defensive Player of the Year", countKey: "dpoy", Icon: FaMedal },
    { label: "Finals MVP", countKey: "finalsMVP", Icon: FaTrophy },
  ];

  const renderBadgesContent = () => {
    return (
      <div className="flex -mx-4 relative">
        {players.map((player, playerIndex) => (
          <div key={playerIndex} className="w-1/2 px-4">
            {['2023', '2022', '2021'].map((season, seasonIndex) => (
              <React.Fragment key={seasonIndex}>
                <div className="py-0.5">
                  <button 
                    className="flex items-center justify-between w-full text-left font-semibold text-sm h-7"
                    onClick={() => toggleSeason(season)}
                  >
                    <span>{season}</span>
                    {expandedSeasons[season] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSeasons[season] && (
                    <div className="flex flex-wrap -m-1 mt-2">
                      {player.badges.slice(0, season === '2023' ? 10 : 6).map((badge, badgeIndex) => (
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
                {seasonIndex < 2 && <hr className={`border-t border-gray-200 -mx-4 ${expandedSeasons[season] ? 'my-2' : 'my-0.5'}`} />}
              </React.Fragment>
            ))}
          </div>
        ))}
        {/* Vertical divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200"></div>
      </div>
    );
  };

  const renderAwardsContent = () => {
    return (
      <div className="flex -mx-4 relative">
        {players.map((player, playerIndex) => (
          <div key={playerIndex} className="w-1/2 px-4">
            {[...mainAwards, ...additionalAwards].map((award, index) => (
              <div key={index} className="flex items-center justify-between mb-2">
                <span className="text-sm">{award.label}</span>
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-semibold">{player[award.countKey]}</span>
                  {renderAwardIcons(player[award.countKey], award.Icon)}
                </div>
              </div>
            ))}
          </div>
        ))}
        {/* Vertical divider */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200"></div>
      </div>
    );
  };

  const renderComparisonContent = () => {
    return (
      <div className="space-y-4">
        {statCategories.map((category, index) => {
          const player0Value = parseFloat(players[0].stats[category]);
          const player1Value = parseFloat(players[1].stats[category]);
          const maxValue = Math.max(player0Value, player1Value);
          const player0Percentage = (player0Value / maxValue) * 50;
          const player1Percentage = (player1Value / maxValue) * 50;
          const player0IsBetter = player0Value > player1Value;
          
          // Add a mock league average (you should replace this with actual data)
          const leagueAverage = (player0Value + player1Value) / 2; // This is just a placeholder
          const leagueAveragePercentage = (leagueAverage / maxValue) * 50;

          return (
            <div key={index} className="flex items-center">
              <div className="w-1/4 text-right pr-4">
                <span className={`font-semibold ${player0IsBetter ? 'text-green-600' : 'text-gray-600'}`}>
                  {players[0].stats[category]}
                </span>
              </div>
              <div className="w-1/2">
                <div className="text-center text-sm font-medium text-gray-700 mb-1">
                  {category}
                </div>
                <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="w-1/2 flex justify-end">
                    <div
                      className={`h-full ${player0IsBetter ? 'bg-green-500' : 'bg-gray-400'}`}
                      style={{ width: `${player0Percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-1/2 flex justify-start">
                    <div
                      className={`h-full ${!player0IsBetter ? 'bg-green-500' : 'bg-gray-400'}`}
                      style={{ width: `${player1Percentage}%` }}
                    ></div>
                  </div>
                  {/* League average lines */}
                  <div 
                    className="absolute top-0 bottom-0 w-px bg-yellow-400" 
                    style={{ left: `${50 - leagueAveragePercentage}%` }}
                  ></div>
                  <div 
                    className="absolute top-0 bottom-0 w-px bg-yellow-400" 
                    style={{ left: `${50 + leagueAveragePercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-1/4 text-left pl-4">
                <span className={`font-semibold ${!player0IsBetter ? 'text-green-600' : 'text-gray-600'}`}>
                  {players[1].stats[category]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'badges':
        return renderBadgesContent();
      case 'awards':
        return renderAwardsContent();
      case 'comparison':
        return renderComparisonContent();
      default:
        return null;
    }
  };

  return (
    <div className="player-comparison mt-4">
      {/* Player info and VS section */}
      <div className="flex justify-between items-center relative mb-8">
        {players.map((player, index) => (
          <div key={index} className={`player-column ${index === 0 ? 'pr-4' : 'pl-4'} flex ${index === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
            <div className="w-32 h-32 bg-gray-200 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-300">
              {player.image && <img src={player.image} alt={player.name} className="w-full h-full object-cover" />}
            </div>
            <div className={`flex flex-col ${index === 0 ? 'ml-4 items-start' : 'mr-4 items-end'}`}>
              <h2 className="text-2xl font-bold">{player.name}</h2>
              <p className="text-base text-gray-600">{player.team}</p>
              {player.number && player.position && player.nickname && (
                <p className="text-sm text-gray-500">
                  #{player.number} | {player.position} | {player.nickname}
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-lg font-bold">VS</span>
        </div>
      </div>

      {/* Tabs and content */}
      <div className="mt-4">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === 'badges'
                  ? 'text-gray-900 bg-white border-b-2 border-gray-900'
                  : 'text-gray-500 bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('badges')}
            >
              Fantasy Badges
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === 'awards'
                  ? 'text-gray-900 bg-white border-b-2 border-gray-900'
                  : 'text-gray-500 bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('awards')}
            >
              Awards and Career Achievements
            </button>
            <button
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === 'comparison'
                  ? 'text-gray-900 bg-white border-b-2 border-gray-900'
                  : 'text-gray-500 bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('comparison')}
            >
              Stats Comparison
            </button>
          </div>
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Game Logs */}
      <div className="mt-8">
        <div className="flex flex-col space-y-8">
          {players.map((player, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-2">{player.name}'s Game Log</h4>
              <GameLog 
                gameLogSeasons={createMockGameLogSeasons()}
                playerName={player.name}
                isNFL={player.sport === "NFL"}
                showTitle={false}
                expandedSeasons={expandedSeasons}
                toggleSeason={toggleSeason}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerComparison;