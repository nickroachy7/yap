import React, { useState, useEffect } from 'react';
import { FaCalendar, FaFilter, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

function GameLog({ games, playerName }) {
  const [filteredGames, setFilteredGames] = useState(games);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showStatFilter, setShowStatFilter] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statFilter, setStatFilter] = useState({ stat: 'pts', threshold: 30 });
  const [isFiltered, setIsFiltered] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    updateDisplayedGames();
  }, [filteredGames, showMore]);

  const updateDisplayedGames = () => {
    const gamesToShow = showMore ? 10 : 5;
    setDisplayedGames(filteredGames.slice(0, gamesToShow));
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleStatFilterChange = (e) => {
    setStatFilter({ ...statFilter, [e.target.name]: e.target.value });
  };

  const applyDateFilter = () => {
    let filtered = games;
    if (dateRange.start) {
      filtered = filtered.filter(game => new Date(game.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(game => new Date(game.date) <= new Date(dateRange.end));
    }
    setFilteredGames(filtered);
    setShowDateFilter(false);
    setIsFiltered(true);
    setShowMore(false);
  };

  const applyStatFilter = () => {
    const filtered = games.filter(game => game[statFilter.stat] >= parseInt(statFilter.threshold));
    setFilteredGames(filtered);
    setShowStatFilter(false);
    setIsFiltered(true);
    setShowMore(false);
  };

  const resetFilters = () => {
    setFilteredGames(games);
    setDateRange({ start: '', end: '' });
    setStatFilter({ stat: 'pts', threshold: 30 });
    setIsFiltered(false);
    setShowMore(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="mt-6">
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
              <option value="pts">Points</option>
              <option value="reb">Rebounds</option>
              <option value="ast">Assists</option>
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
              {displayedGames.map((game, index) => (
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
        {!isFiltered && filteredGames.length > 5 && (
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
            <button
              className="w-full text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center"
              onClick={toggleShowMore}
            >
              {showMore ? (
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
        )}
      </div>
    </div>
  );
}

export default GameLog;