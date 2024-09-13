import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import BaseResponse from './BaseResponse';
import ResponseBubbles from './ResponseBubbles';
import PlayerProfile from './PlayerProfile';
import PlayerComparison from './PlayerComparison';
import TrendingBubbles from './TrendingBubbles';
import TakeResponse from './TakeResponse';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [responseBubbles, setResponseBubbles] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [searchType, setSearchType] = useState('Search');
  const [comparisonData, setComparisonData] = useState(null);
  const [showCommandDropdown, setShowCommandDropdown] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState([]);

  const inputRef = useRef(null);

  const commands = [
    { name: '/compare', description: 'Compare two players' },
    { name: '/take', description: 'Take command' },
    // Add more commands here
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSearched(false);

    if (value.startsWith('/')) {
      setShowCommandDropdown(true);
      const filtered = commands.filter(cmd => cmd.name.startsWith(value.toLowerCase()));
      setFilteredCommands(filtered);
    } else {
      setShowCommandDropdown(false);
    }
  };

  const handleCommandSelect = (command) => {
    setInputValue(command.name + ' ');
    setShowCommandDropdown(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowCommandDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (inputValue.trim()) {
      setIsSearched(true);
      const lowercaseInput = inputValue.toLowerCase();

      if (lowercaseInput.startsWith('/compare')) {
        const players = lowercaseInput.substring(8).trim().split(' vs ');
        if (players.length === 2) {
          const player1 = players[0].trim();
          const player2 = players[1].trim();
          const comparisonData = await mockCompareAPI(player1, player2);
          if (comparisonData) {
            setComparisonData(comparisonData);
            setPlayerData(null);
            setResponse('');
            // ResponseBubbles are now set in mockCompareAPI
            setSearchType('Comparison');
          } else {
            setResponse('One or both players not found. Please check the names and try again.');
            setComparisonData(null);
            setPlayerData(null);
            setResponseBubbles([]);
            setSearchType('Search');
          }
        } else {
          setResponse('Please provide two player names for comparison, separated by "vs". For example: /compare LeBron James vs Stephen Curry');
          setComparisonData(null);
          setPlayerData(null);
          setResponseBubbles([]);
          setSearchType('Search');
        }
      } else if (lowercaseInput.startsWith('/take')) {
        // Handle the take command
        setResponse('');
        setPlayerData(null);
        setComparisonData(null);
        setSearchType('Take');
        // You'll need to implement the logic for the take command here
      } else if (lowercaseInput === 'lebron james' || lowercaseInput === 'stephen curry') {
        const mockPlayerData = await mockPlayerAPI(lowercaseInput);
        setPlayerData(mockPlayerData);
        setResponse('');
        setResponseBubbles(mockPlayerData.relatedBubbles);
        setSearchType('Player');
      } else {
        const mockResponse = await mockSearchAPI(inputValue);
        setResponse(mockResponse.text);
        setResponseBubbles(mockResponse.bubbles); // Ensure this line is present
        setPlayerData(null);
        setComparisonData(null);
        setSearchType('Search');
      }
    } else {
      handleSearchReset();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBubbleClick = (text) => {
    setInputValue(prevValue => prevValue ? `${prevValue} ${text}` : text);
  };

  const handleClearSearch = () => {
    handleSearchReset();
  };

  const handleSearchReset = () => {
    setInputValue('');
    setResponse('');
    setResponseBubbles([]);
    setPlayerData(null);
    setIsSearched(false);
    setSearchType('Search');
    setComparisonData(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTrendingBubbleClick = (text) => {
    setInputValue(text);
    setIsSearched(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Mock API function
  const mockSearchAPI = async (query) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      text: `This is a mock response for the query: "${query}"`,
      bubbles: [
        { text: 'Related 1', type: 'tag-keywords', color: "bg-purple-200 hover:bg-purple-300" },
        { text: 'Related 2', type: 'tag-keywords', color: "bg-yellow-200 hover:bg-yellow-300" },
        { text: 'Related 3', type: 'tag-keywords', color: "bg-pink-200 hover:bg-pink-300" },
      ]
    };
  };

  // Updated Mock Player API function
  const mockPlayerAPI = async (query) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (query === 'lebron james') {
      return {
        name: "LeBron James",
        team: "Los Angeles Lakers",
        position: "Small Forward",
        image: "https://example.com/lebron-james.jpg", // Replace with actual image URL
        ppg: "25.0",
        rpg: "7.7",
        apg: "7.8",
        bio: "LeBron James is an American professional basketball player for the Los Angeles Lakers of the NBA. Nicknamed 'King James', he is widely considered one of the greatest players of all time.",
        relatedBubbles: [
          { text: 'Lakers', type: 'tag-keywords', color: "bg-blue-200 hover:bg-blue-300" },
          { text: 'NBA', type: 'tag-keywords', color: "bg-green-200 hover:bg-green-300" },
          { text: 'All-Star', type: 'tag-keywords', color: "bg-red-200 hover:bg-red-300" },
        ]
      };
    } else if (query === 'stephen curry') {
      return {
        name: "Stephen Curry",
        team: "Golden State Warriors",
        position: "Point Guard",
        image: "https://example.com/stephen-curry.jpg", // Replace with actual image URL
        ppg: "29.4",
        rpg: "6.1",
        apg: "6.3",
        bio: "Stephen Curry is an American professional basketball player for the Golden State Warriors of the NBA. He is widely considered to be one of the greatest basketball players of all time, and the greatest shooter in NBA history.",
        relatedBubbles: [
          { text: 'Warriors', type: 'tag-keywords', color: "bg-yellow-200 hover:bg-yellow-300" },
          { text: '3-Point', type: 'tag-keywords', color: "bg-purple-200 hover:bg-purple-300" },
          { text: 'MVP', type: 'tag-keywords', color: "bg-pink-200 hover:bg-pink-300" },
        ]
      };
    }
  };

  // Mock Compare API function
  const mockCompareAPI = async (player1, player2) => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const playerStats = {
      'lebron james': {
        name: "LeBron James",
        team: "Los Angeles Lakers",
        image: "https://example.com/lebron-james.jpg",
        stats: { PPG: "25.0", RPG: "7.7", APG: "7.8", "FG%": "50.4", "3P%": "34.5", "FT%": "73.1" }
      },
      'stephen curry': {
        name: "Stephen Curry",
        team: "Golden State Warriors",
        image: "https://example.com/stephen-curry.jpg",
        stats: { PPG: "29.4", RPG: "6.1", APG: "6.3", "FG%": "48.7", "3P%": "42.8", "FT%": "91.5" }
      }
    };

    const p1 = playerStats[player1.toLowerCase()];
    const p2 = playerStats[player2.toLowerCase()];

    if (p1 && p2) {
      // Add response bubbles for comparison
      const comparisonBubbles = [
        { text: 'Stats', type: 'tag-keywords', color: "bg-blue-200 hover:bg-blue-300" },
        { text: 'Career', type: 'tag-keywords', color: "bg-green-200 hover:bg-green-300" },
        { text: 'Head-to-Head', type: 'tag-keywords', color: "bg-red-200 hover:bg-red-300" },
      ];
      setResponseBubbles(comparisonBubbles);
      return [p1, p2];
    } else {
      return null;
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl mt-8">
      <div className="search-container p-6">
        <div className="search-bar-container flex items-center mb-2 relative">
          <button 
            className="search-label mr-2 h-8 flex items-center px-3 bg-gray-200 rounded-l-full cursor-pointer text-sm"
            onClick={handleSearchReset}
          >
            {searchType}
          </button>
          <div className="search-bar flex-grow mr-2 bg-gray-100 rounded-r-full flex items-center h-8 relative">
            <input
              type="text"
              className="search-input w-full bg-transparent h-full px-3 text-sm"
              placeholder="Search..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              ref={inputRef}
            />
            {(inputValue || response || playerData) && (
              <button 
                className="clear-button mr-2" 
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
            {showCommandDropdown && filteredCommands.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {filteredCommands.map((cmd, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCommandSelect(cmd)}
                  >
                    <span className="font-semibold">{cmd.name}</span>
                    <span className="ml-2 text-gray-500">{cmd.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="search-button rounded-full p-1.5 bg-gray-200 h-8 w-8 flex items-center justify-center" onClick={handleSearch}>
            <FaSearch className="search-icon text-sm" />
          </button>
        </div>

        {!isSearched && !response && !playerData && !comparisonData && (
          <>
            <hr className="my-4 border-gray-200" />
            <TrendingBubbles onBubbleClick={handleTrendingBubbleClick} />
          </>
        )}

        {(response || playerData || comparisonData) && (
          <>
            <hr className="my-4 border-gray-200" />
            <ResponseBubbles 
              bubbles={responseBubbles}
              onBubbleClick={handleBubbleClick}
            />
          </>
        )}

        {response && <BaseResponse response={response} />}
        {playerData && <PlayerProfile player={playerData} />}
        {comparisonData && <PlayerComparison players={comparisonData} />}
      </div>
    </div>
  );
}

export default SearchBar;
