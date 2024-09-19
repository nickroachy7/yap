import React, { useState } from 'react';
import GameLog from './GameLog';
import { FaShieldAlt, FaChevronDown, FaChevronUp, FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

function PlayerComparison({ players }) {
  const [showMoreAwards, setShowMoreAwards] = useState(false);
  const [expandedSeasons, setExpandedSeasons] = useState({ '2023': true });
  const [activeTab, setActiveTab] = useState('badges');
  
  const statCategories = ['PPG', 'RPG', 'APG', 'FG%', '3P%', 'FT%'];

  const calculatePercentage = (value, max) => {
    return (parseFloat(value) / max) * 100;
  };

  const getMaxStat = (category) => {
    return Math.max(parseFloat(players[0].stats[category]), parseFloat(players[1].stats[category]));
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

  const renderBadgesAndAwards = () => {
    return (
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
          </div>
          <div className="flex relative">
            {players.map((player, playerIndex) => (
              <React.Fragment key={playerIndex}>
                <div className="w-1/2 p-4">
                  {activeTab === 'badges' && (
                    <div>
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
                      {['2022', '2021'].map((season, seasonIndex) => (
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
                                {player.badges.slice(0, 6).map((badge, badgeIndex) => (
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
                          {seasonIndex < 1 && <hr className={`border-t border-gray-200 -mx-4 ${expandedSeasons[season] ? 'my-2' : 'my-0.5'}`} />}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                  {activeTab === 'awards' && (
                    <div>
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
                  )}
                </div>
                {playerIndex === 0 && (
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
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
            </div>
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-lg font-bold">VS</span>
        </div>
      </div>

      {/* Badges and Awards comparison */}
      {renderBadgesAndAwards()}

      {/* Add more space here */}
      <div className="mt-12">
        {/* Stats comparison box */}
        <h3 className="text-xl font-semibold mb-3">Player Comparison</h3>
        <div className="flex">
          {/* Left player stats */}
          <div className="w-1/6 pr-2 flex flex-col justify-between">
            {statCategories.map((category, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-1 mb-2 text-center h-12 flex items-center justify-center">
                <div className="font-semibold text-sm">{players[0].stats[category]}</div>
              </div>
            ))}
          </div>

          {/* Comparison bars */}
          <div className="w-2/3 bg-white rounded-lg border border-gray-300 overflow-hidden">
            <div className="stats-comparison">
              {statCategories.map((category, index) => {
                const maxStat = getMaxStat(category);
                const player0Value = parseFloat(players[0].stats[category]);
                const player1Value = parseFloat(players[1].stats[category]);
                const player0Percentage = calculatePercentage(player0Value, maxStat);
                const player1Percentage = calculatePercentage(player1Value, maxStat);
                const player0IsBetter = player0Value > player1Value;

                return (
                  <div key={index} className="p-3 border-b last:border-b-0">
                    <div className="text-center font-medium mb-1 text-sm">{category}</div>
                    <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${player0IsBetter ? 'bg-green-500 rounded-l-full' : 'bg-gray-400'}`}
                        style={{ width: `${player0Percentage / 2}%`, marginLeft: `${50 - player0Percentage / 2}%` }}
                      ></div>
                      <div
                        className={`h-full ${!player0IsBetter ? 'bg-green-500 rounded-r-full' : 'bg-gray-400'}`}
                        style={{ width: `${player1Percentage / 2}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right player stats */}
          <div className="w-1/6 pl-2 flex flex-col justify-between">
            {statCategories.map((category, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-1 mb-2 text-center h-12 flex items-center justify-center">
                <div className="font-semibold text-sm">{players[1].stats[category]}</div>
              </div>
            ))}
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