import React, { useState, useEffect } from 'react';
import { FaCalendar, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function GameLog({ gameLogSeasons, playerName, isNFL, expandedSeasons, toggleSeason, showTitle = true }) {
  const [filteredGames, setFilteredGames] = useState({});
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showStatFilter, setShowStatFilter] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statFilter, setStatFilter] = useState(isNFL ? { stat: 'passYards', threshold: 300 } : { stat: 'pts', threshold: 30 });
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (gameLogSeasons) {
      setFilteredGames(gameLogSeasons);
    }
  }, [gameLogSeasons]);

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleStatFilterChange = (e) => {
    setStatFilter({ ...statFilter, [e.target.name]: e.target.value });
  };

  const applyDateFilter = () => {
    const filtered = Object.entries(gameLogSeasons).reduce((acc, [season, games]) => {
      acc[season] = games.filter(game => {
        const gameDate = new Date(game.date);
        return (!dateRange.start || gameDate >= new Date(dateRange.start)) &&
               (!dateRange.end || gameDate <= new Date(dateRange.end));
      });
      return acc;
    }, {});
    setFilteredGames(filtered);
    setShowDateFilter(false);
    setIsFiltered(true);
  };

  const applyStatFilter = () => {
    const filtered = Object.entries(gameLogSeasons).reduce((acc, [season, games]) => {
      acc[season] = games.filter(game => game[statFilter.stat] >= parseInt(statFilter.threshold));
      return acc;
    }, {});
    setFilteredGames(filtered);
    setShowStatFilter(false);
    setIsFiltered(true);
  };

  const resetFilters = () => {
    setFilteredGames(gameLogSeasons);
    setDateRange({ start: '', end: '' });
    setStatFilter(isNFL ? { stat: 'passYards', threshold: 300 } : { stat: 'pts', threshold: 30 });
    setIsFiltered(false);
  };

  const renderGameLog = (games) => {
    return (
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Opp</th>
            <th className="px-4 py-2">Result</th>
            {isNFL ? (
              <>
                <th className="px-4 py-2">Pass Yds</th>
                <th className="px-4 py-2">Pass TD</th>
                <th className="px-4 py-2">INT</th>
                <th className="px-4 py-2">Rush Yds</th>
                <th className="px-4 py-2">Rush TD</th>
              </>
            ) : (
              <>
                <th className="px-4 py-2">Min</th>
                <th className="px-4 py-2">Pts</th>
                <th className="px-4 py-2">Reb</th>
                <th className="px-4 py-2">Ast</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2">{game.date}</td>
              <td className="px-4 py-2">{game.opponent}</td>
              <td className="px-4 py-2">{game.result}</td>
              {isNFL ? (
                <>
                  <td className="px-4 py-2">{game.passYards}</td>
                  <td className="px-4 py-2">{game.passTD}</td>
                  <td className="px-4 py-2">{game.int}</td>
                  <td className="px-4 py-2">{game.rushYards}</td>
                  <td className="px-4 py-2">{game.rushTD}</td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2">{game.min}</td>
                  <td className="px-4 py-2">{game.pts}</td>
                  <td className="px-4 py-2">{game.reb}</td>
                  <td className="px-4 py-2">{game.ast}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (!gameLogSeasons) {
    return null; // or return a placeholder component
  }

  return (
    <div className="mt-6">
      {showTitle && (
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">{playerName}'s Game Log</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300"
              title="Date Filter"
            >
              <FaCalendar className="text-xs" />
            </button>
            <button
              onClick={() => setShowStatFilter(!showStatFilter)}
              className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition duration-300"
              title="Stat Filter"
            >
              <FaFilter className="text-xs" />
            </button>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition duration-300"
                title="Reset Filters"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>
      )}

      {showDateFilter && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-4">
            <input
              type="date"
              name="start"
              value={dateRange.start}
              onChange={handleDateChange}
              className="border rounded px-2 py-1"
            />
            <span>to</span>
            <input
              type="date"
              name="end"
              value={dateRange.end}
              onChange={handleDateChange}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={applyDateFilter}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {showStatFilter && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center space-x-4">
            <select
              name="stat"
              value={statFilter.stat}
              onChange={handleStatFilterChange}
              className="border rounded px-2 py-1"
            >
              {isNFL ? (
                <>
                  <option value="passYards">Pass Yards</option>
                  <option value="passTD">Pass TD</option>
                  <option value="int">INT</option>
                  <option value="rushYards">Rush Yards</option>
                  <option value="rushTD">Rush TD</option>
                </>
              ) : (
                <>
                  <option value="pts">Points</option>
                  <option value="reb">Rebounds</option>
                  <option value="ast">Assists</option>
                  <option value="min">Minutes</option>
                </>
              )}
            </select>
            <input
              type="number"
              name="threshold"
              value={statFilter.threshold}
              onChange={handleStatFilterChange}
              className="border rounded px-2 py-1 w-20"
            />
            <span>or more</span>
            <button
              onClick={applyStatFilter}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
        <div className="p-4">
          {Object.entries(filteredGames)
            .sort(([a], [b]) => parseInt(b) - parseInt(a))
            .map(([season, games], index) => (
              <React.Fragment key={season}>
                {index > 0 && <hr className="my-4 border-t border-gray-200" />}
                <div>
                  <button 
                    className="flex items-center justify-between w-full text-left font-semibold text-sm mb-2"
                    onClick={() => toggleSeason(season)}
                  >
                    <span>{season}</span>
                    {expandedSeasons[season] ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expandedSeasons[season] && (
                    <div className="mt-2 overflow-hidden rounded-lg border border-gray-300">
                      <div className="overflow-x-auto">
                        {renderGameLog(games)}
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default GameLog;