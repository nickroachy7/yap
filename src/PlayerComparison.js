import React, { useState } from 'react';
import GameLog from './GameLog';
import { FaShieldAlt, FaChevronDown, FaChevronUp, FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

function PlayerComparison({ players }) {
  const [showMoreAwards, setShowMoreAwards] = useState(false);
  
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

      {/* Combined Badges comparison */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between">
            <h4 className="font-semibold text-sm">{players[0].name}'s Badges</h4>
            <h4 className="font-semibold text-sm">{players[1].name}'s Badges</h4>
          </div>
          <div className="flex">
            {players.map((player, playerIndex) => (
              <div key={playerIndex} className={`w-1/2 p-4 ${playerIndex === 0 ? 'border-r border-gray-200' : ''}`}>
                <div className={`flex flex-wrap -m-1 ${playerIndex === 1 ? 'justify-end' : ''}`}>
                  {player.badges && player.badges.slice(0, 10).map((badge, index) => (
                    <div key={index} className="relative group m-1">
                      <div className="flex items-center justify-center">
                        <FaShieldAlt className={`text-3xl ${getBadgeColor(badge.type)}`} />
                      </div>
                      <span className={`absolute bottom-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 mb-1 ${
                        playerIndex === 0 ? 'left-0' : 'right-0'
                      }`}>
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Combined Awards comparison */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between">
            <h4 className="font-semibold text-sm">{players[0].name}'s Awards</h4>
            <h4 className="font-semibold text-sm">{players[1].name}'s Awards</h4>
          </div>
          <div className="flex">
            {players.map((player, playerIndex) => (
              <div key={playerIndex} className={`w-1/2 ${playerIndex === 0 ? 'border-r border-gray-200' : ''}`}>
                <div className="divide-y divide-gray-200">
                  {mainAwards.map((award, index) => renderAwardRow(award.label, player[award.countKey], award.Icon))}
                  
                  {showMoreAwards && (
                    <>
                      {additionalAwards.map((award, index) => renderAwardRow(award.label, player[award.countKey], award.Icon))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Show More button inside the bounding box */}
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
            <button
              className="w-full text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center"
              onClick={() => setShowMoreAwards(!showMoreAwards)}
            >
              {showMoreAwards ? (
                <>
                  <FaChevronUp className="mr-2" />
                  <span>Less</span>
                </>
              ) : (
                <>
                  <FaChevronDown className="mr-2" />
                  <span>More</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

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

      {/* Game Logs */}
      {players.map((player, index) => (
        <GameLog key={index} games={mockGameLog} playerName={player.name} />
      ))}
    </div>
  );
}

export default PlayerComparison;