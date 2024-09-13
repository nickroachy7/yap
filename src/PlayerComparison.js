import React from 'react';

function PlayerComparison({ players }) {
  const statCategories = ['PPG', 'RPG', 'APG', 'FG%', '3P%', 'FT%'];

  const calculateDifference = (stat1, stat2) => {
    const value1 = parseFloat(stat1);
    const value2 = parseFloat(stat2);
    return (value1 - value2).toFixed(1);
  };

  // Mock game log data for both players
  const mockGameLog = [
    { date: '2023-05-10', opponent: 'PHX', result: 'W 115-105', min: 37, pts: 32, reb: 8, ast: 9 },
    { date: '2023-05-07', opponent: 'LAC', result: 'W 122-112', min: 39, pts: 29, reb: 10, ast: 7 },
    { date: '2023-05-04', opponent: 'SAC', result: 'L 110-118', min: 38, pts: 27, reb: 6, ast: 11 },
    { date: '2023-05-01', opponent: 'GSW', result: 'W 120-110', min: 36, pts: 28, reb: 7, ast: 8 },
    { date: '2023-04-28', opponent: 'DEN', result: 'L 108-115', min: 38, pts: 25, reb: 9, ast: 6 },
  ];

  const renderGameLog = (player) => (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">{player.name}'s Game Log</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">OPP</th>
              <th className="px-4 py-2 text-left">Result</th>
              <th className="px-4 py-2 text-right">MIN</th>
              <th className="px-4 py-2 text-right">PTS</th>
              <th className="px-4 py-2 text-right">REB</th>
              <th className="px-4 py-2 text-right">AST</th>
            </tr>
          </thead>
          <tbody>
            {mockGameLog.map((game, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{game.date}</td>
                <td className="px-4 py-2">{game.opponent}</td>
                <td className="px-4 py-2">{game.result}</td>
                <td className="px-4 py-2 text-right">{game.min}</td>
                <td className="px-4 py-2 text-right">{game.pts}</td>
                <td className="px-4 py-2 text-right">{game.reb}</td>
                <td className="px-4 py-2 text-right">{game.ast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="player-comparison mt-4">
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

      <hr className="border-gray-300 mb-6" />

      <h3 className="text-xl font-semibold mb-3">Comparison:</h3>

      <div className="stats-comparison flex justify-center">
        <div className="relative w-full max-w-4xl">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {statCategories.map((category, index) => {
              const diff = calculateDifference(players[0].stats[category], players[1].stats[category]);
              const isPlayer0Better = diff > 0;
              const isPlayer1Better = diff < 0;
              return (
                <div key={index} className="stat-row flex justify-between items-center py-3 px-4 even:bg-gray-50">
                  <div className="w-20 text-right">
                    <span className="font-semibold text-base">
                      {players[0].stats[category]}
                    </span>
                  </div>
                  <div className="w-12 text-center">
                    {isPlayer0Better && (
                      <span className="text-green-600 text-xs font-semibold">
                        +{diff}
                      </span>
                    )}
                  </div>
                  <div className="w-16 text-center bg-gray-200 py-1 rounded">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </div>
                  <div className="w-12 text-center">
                    {isPlayer1Better && (
                      <span className="text-green-600 text-xs font-semibold">
                        +{Math.abs(diff)}
                      </span>
                    )}
                  </div>
                  <div className="w-20 text-left">
                    <span className="font-semibold text-base">
                      {players[1].stats[category]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add divider line here */}
      <hr className="border-gray-300 my-8" />

      {/* Game Logs */}
      <div className="game-logs">
        {players.map((player, index) => (
          <div key={index} className="mb-8">
            {renderGameLog(player)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerComparison;