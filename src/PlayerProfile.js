import React from 'react';

function PlayerProfile({ player }) {
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

  return (
    <div className="player-profile pt-2 px-6"> {/* Changed pt-4 to pt-2 */}
      <div className="flex flex-col md:flex-row">
        <div className="w-40 h-40 bg-gray-200 rounded-lg md:mr-6 flex-shrink-0 mb-4 md:mb-0">
          {player.image && <img src={player.image} alt={player.name} className="w-full h-full object-cover rounded-lg" />}
        </div>
        <div className="flex-grow">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <p className="text-gray-600">{player.team} • {player.position}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-gray-100 rounded-lg p-2">
              <p className="text-xl font-semibold">{player.ppg}</p>
              <p className="text-sm text-gray-600">PPG</p>
            </div>
            <div className="text-center bg-gray-100 rounded-lg p-2">
              <p className="text-xl font-semibold">{player.rpg}</p>
              <p className="text-sm text-gray-600">RPG</p>
            </div>
            <div className="text-center bg-gray-100 rounded-lg p-2">
              <p className="text-xl font-semibold">{player.apg}</p>
              <p className="text-sm text-gray-600">APG</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-4">{player.bio}</p>

      {/* Game Log Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Game Log</h3>
        <div className="overflow-x-auto"> {/* Removed max-h-96 */}
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
              {gameLog.map((game, index) => (
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
    </div>
  );
}

export default PlayerProfile;