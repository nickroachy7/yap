import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaUser } from 'react-icons/fa';
import BaseResponse from './BaseResponse';
import ResponseBubbles from './ResponseBubbles';
import PlayerProfile from './PlayerProfile';
import PlayerComparison from './PlayerComparison';
import TrendingBubbles from './TrendingBubbles';
import TakeResponse from './TakeResponse';
import UserProfile from './UserProfile';
import PollResponse from './PollResponse';
import GradeResponse from './GradeResponse';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [responseBubbles, setResponseBubbles] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [searchType, setSearchType] = useState('YAP');
  const [comparisonData, setComparisonData] = useState(null);
  const [showCommandDropdown, setShowCommandDropdown] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [takeData, setTakeData] = useState(null);
  const [placedTakes, setPlacedTakes] = useState([]);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [pollData, setPollData] = useState(null);
  const [gradeData, setGradeData] = useState(null);
  const [sport, setSport] = useState('nba');

  const inputRef = useRef(null);

  const commands = [
    { name: 'compare', description: 'Compare two players' },
    { name: 'take', description: 'Take command' },
    { name: 'poll', description: 'Create a poll' },
    { name: 'grade', description: 'Grade a player\'s performance' },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSearched(false);

    const filtered = commands.filter(cmd => cmd.name.toLowerCase().startsWith(value.toLowerCase().trim()));
    
    if (filtered.length === 1 && value.toLowerCase() === filtered[0].name.toLowerCase()) {
      // Autofill the command
      const fullCommand = filtered[0].name + ' ';
      setInputValue(fullCommand);
      setFilteredCommands([]);
      setShowCommandDropdown(false);
      
      // Move cursor to end of input
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(fullCommand.length, fullCommand.length);
        }
      }, 0);
    } else {
      setFilteredCommands(filtered);
      setShowCommandDropdown(filtered.length > 0);
    }
  };

  const handleCommandSelect = (command) => {
    // Use a callback to ensure we're working with the latest state
    setInputValue((prevValue) => command.name + ' ');
    setShowCommandDropdown(false);
    // Use setTimeout to ensure the input is focused after the state update
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
      }
    }, 0);
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

      if (lowercaseInput.startsWith('compare')) {
        const players = lowercaseInput.substring(8).trim().split(/\s+/);
        if (players.length >= 2) {
          const player1 = players[0] + ' ' + players[1];
          const player2 = players[2] + ' ' + (players[3] || '');
          const comparisonData = await mockCompareAPI(player1, player2);
          if (comparisonData) {
            setComparisonData(comparisonData);
            setPlayerData(null);
            setResponse('');
            setSearchType('Comparison');
          } else {
            setResponse('One or both players not found. Please check the names and try again.');
            setComparisonData(null);
            setPlayerData(null);
            setResponseBubbles([]);
            setSearchType('Search');
          }
        } else {
          setResponse('Please provide two player names for comparison. For example: compare LeBron James Stephen Curry');
          setComparisonData(null);
          setPlayerData(null);
          setResponseBubbles([]);
          setSearchType('Search');
        }
      } else if (lowercaseInput.startsWith('take')) {
        // Handle the take command
        setResponse('');
        setPlayerData(null);
        setComparisonData(null);
        setSearchType('Take');
        // Simulating a take response
        const takePlaceholder = {
          image: 'https://via.placeholder.com/160',
          takeText: 'LeBron James will score over 30 points in the next game',
          odds: '+150',
          date: '2023-05-15',
          takeId: '123456789',
          username: 'johndoe'
        };
        setTakeData(takePlaceholder);
      } else if (lowercaseInput.startsWith('poll')) {
        // Handle the poll command
        setResponse('');
        setPlayerData(null);
        setComparisonData(null);
        setTakeData(null);
        setSearchType('Poll');
        // Simulating a poll response
        const pollTemplates = [
          {
            question: 'Who will win the NBA Finals this year?',
            options: ['Golden State Warriors', 'Boston Celtics', 'Miami Heat', 'Los Angeles Lakers'],
            optionImages: [
              'https://example.com/warriors.jpg',
              'https://example.com/celtics.jpg',
              'https://example.com/heat.jpg',
              'https://example.com/lakers.jpg'
            ],
            image: 'https://via.placeholder.com/160',
          },
          {
            question: 'Which player will have the most points in the next game?',
            options: ['LeBron James', 'Stephen Curry', 'Kevin Durant', 'Giannis Antetokounmpo'],
            optionImages: [
              'https://example.com/lebron.jpg',
              'https://example.com/curry.jpg',
              'https://example.com/durant.jpg',
              'https://example.com/giannis.jpg'
            ],
            image: 'https://via.placeholder.com/160',
          },
          {
            question: 'Who will lead the NBA in assists this season?',
            options: ['Stephen Curry', 'James Harden', 'Chris Paul', 'Luka Doncic'],
            optionImages: [
              'https://example.com/curry.jpg',
              'https://example.com/harden.jpg',
              'https://example.com/paul.jpg',
              'https://example.com/doncic.jpg'
            ],
            image: 'https://via.placeholder.com/160',
          },
          {
            question: 'Which team will win the Western Conference this season?',
            options: ['Golden State Warriors', 'Los Angeles Lakers', 'Denver Nuggets', 'Phoenix Suns'],
            optionImages: [
              'https://example.com/warriors.jpg',
              'https://example.com/lakers.jpg',
              'https://example.com/nuggets.jpg',
              'https://example.com/suns.jpg'
            ],
            image: 'https://via.placeholder.com/160',
          }
        ];
        const randomIndex = Math.floor(Math.random() * pollTemplates.length);
        const pollPlaceholder = {
          ...pollTemplates[randomIndex],
          pollId: '987654321',
          username: 'pollster123'
        };
        setPollData(pollPlaceholder);
        // Set response bubbles for the poll
        setResponseBubbles([
          { text: 'NBA', type: 'tag-keywords', color: "bg-blue-200 hover:bg-blue-300" },
          { text: 'Finals', type: 'tag-keywords', color: "bg-green-200 hover:bg-green-300" },
          { text: 'Championship', type: 'tag-keywords', color: "bg-red-200 hover:bg-red-300" },
          { text: 'Warriors', type: 'tag-keywords', color: "bg-yellow-200 hover:bg-yellow-300" },
          { text: 'Lakers', type: 'tag-keywords', color: "bg-purple-200 hover:bg-purple-300" },
          { text: 'Celtics', type: 'tag-keywords', color: "bg-pink-200 hover:bg-pink-300" },
          { text: 'Heat', type: 'tag-keywords', color: "bg-indigo-200 hover:bg-indigo-300" },
          { text: 'Curry', type: 'tag-keywords', color: "bg-teal-200 hover:bg-teal-300" },
        ]);
      } else if (lowercaseInput.startsWith('grade')) {
        // Handle the grade command
        setResponse('');
        setPlayerData(null);
        setComparisonData(null);
        setTakeData(null);
        setPollData(null);
        setSearchType('Grade');
        // Simulating a grade response
        const gradePlaceholder = {
          player: 'LeBron James',
          statLine: '28 PTS, 10 REB, 8 AST, 2 STL, 1 BLK',
          overallGrade: 'A+',
          categoryGrades: {
            Scoring: 'A+',
            Rebounding: 'A',
            Playmaking: 'A+',
            Defense: 'B+',
            Efficiency: 'A',
          },
        };
        setGradeData(gradePlaceholder);
        // Set response bubbles for the grade
        setResponseBubbles([
          { text: 'Career Stats', type: 'tag-keywords', color: "bg-blue-200 hover:bg-blue-300" },
          { text: 'Team Performance', type: 'tag-keywords', color: "bg-green-200 hover:bg-green-300" },
          { text: 'Highlights', type: 'tag-keywords', color: "bg-red-200 hover:bg-red-300" },
          { text: 'Recent Form', type: 'tag-keywords', color: "bg-yellow-200 hover:bg-yellow-300" },
          { text: 'Matchup History', type: 'tag-keywords', color: "bg-purple-200 hover:bg-purple-300" },
          { text: 'Player Comparison', type: 'tag-keywords', color: "bg-pink-200 hover:bg-pink-300" }
        ]);
      } else if (lowercaseInput === 'lebron james' || lowercaseInput === 'stephen curry') {
        const mockPlayerData = await mockPlayerAPI(lowercaseInput);
        setPlayerData(mockPlayerData);
        setResponse('');
        setResponseBubbles(mockPlayerData.relatedBubbles);
        setSearchType('Player');
      } else if (lowercaseInput === 'tom brady') {
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
    setPlacedTakes([]); // Clear placed takes on new search
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBubbleClick = (text) => {
    setInputValue(prevValue => {
      const trimmedPrevValue = prevValue.trim();
      return trimmedPrevValue ? `${trimmedPrevValue} ${text}` : text;
    });
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
    setSearchType('YAP');
    setComparisonData(null);
    setTakeData(null); // Add this line to clear the takeData
    setPollData(null); // Add this line to clear the poll data
    setGradeData(null); // Add this line to clear the grade data
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTrendingBubbleClick = (text) => {
    setInputValue(prevValue => {
      const trimmedPrevValue = prevValue.trim();
      return trimmedPrevValue ? `${trimmedPrevValue} ${text}` : text;
    });
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
        number: "6",
        team: "Los Angeles Lakers",
        position: "Small Forward",
        nickname: "King James",
        image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254",
        championships: 4,
        mvps: 4,
        allNBAFirstTeam: 13,
        allStar: 19,
        scoringChampion: 1,
        dpoy: 0,
        finalsMVP: 4,
        bio: "LeBron James is an American professional basketball player for the Los Angeles Lakers of the NBA. Nicknamed 'King James', he is widely considered one of the greatest players of all time.",
        stats: { PPG: "27.2", RPG: "7.5", APG: "7.3", "FG%": "50.5", "3P%": "34.6", "FT%": "73.5" },
        relatedBubbles: [
          { text: 'Lakers', type: 'tag-keywords', color: "bg-blue-200 hover:bg-blue-300" },
          { text: 'NBA', type: 'tag-keywords', color: "bg-green-200 hover:bg-green-300" },
          { text: 'All-Star', type: 'tag-keywords', color: "bg-red-200 hover:bg-red-300" },
        ],
        badges: [
          { name: 'NBA Champion', type: 'champion' },
          { name: 'League MVP', type: 'mvp' },
          { name: 'All-Star', type: 'allStar' },
          { name: 'Scoring Leader', type: 'scoring' },
          { name: 'Assist Leader', type: 'scoring' },
          { name: 'All-NBA Team', type: 'allStar' },
          { name: 'All-Defensive Team', type: 'defense' },
          { name: 'Finals MVP', type: 'mvp' },
          { name: '30K Points Club', type: 'milestone' },
          { name: 'Triple-Double Leader', type: 'record' },
          { name: 'All-Star Game MVP', type: 'mvp' },
          { name: 'Rookie of the Year', type: 'mvp' },
          { name: 'Clutch Player', type: 'record' },
          { name: 'Blocks Leader', type: 'defense' },
          { name: 'Minutes Leader', type: 'record' },
          { name: 'Player of the Week', type: 'record' },
        ],
        gameLog: [
          { date: '2023-01-08', opponent: 'ATL', result: 'W 120-105', stats: { minutes: 35, points: 28, rebounds: 8, assists: 7 } },
          { date: '2023-01-01', opponent: 'CAR', result: 'W 115-100', stats: { minutes: 38, points: 32, rebounds: 10, assists: 9 } },
          { date: '2022-12-25', opponent: 'ARI', result: 'L 105-110', stats: { minutes: 40, points: 25, rebounds: 7, assists: 8 } },
          { date: '2022-12-18', opponent: 'CIN', result: 'W 110-95', stats: { minutes: 36, points: 30, rebounds: 9, assists: 8 } },
          { date: '2022-12-11', opponent: 'SF', result: 'W 125-100', stats: { minutes: 37, points: 35, rebounds: 7, assists: 10 } },
          { date: '2022-12-05', opponent: 'NO', result: 'W 110-105', stats: { minutes: 39, points: 28, rebounds: 8, assists: 9 } },
        ],
        sport: "NBA"
      };
    } else if (query === 'stephen curry') {
      return {
        name: "Stephen Curry",
        number: "30",
        team: "Golden State Warriors",
        position: "Point Guard",
        nickname: "Chef Curry",
        image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254",
        championships: 4,
        mvps: 2,
        allNBAFirstTeam: 8,
        allStar: 9,
        scoringChampion: 2,
        dpoy: 0,
        finalsMVP: 1,
        bio: "Stephen Curry is an American professional basketball player for the Golden State Warriors of the NBA. He is widely regarded as one of the greatest basketball players of all time, and the greatest shooter in NBA history.",
        stats: { PPG: "24.6", RPG: "4.7", APG: "6.5", "FG%": "47.3", "3P%": "42.8", "FT%": "90.9" },
        relatedBubbles: [
          { text: 'Warriors', type: 'tag-keywords', color: "bg-blue-200 hover:bg-blue-300" },
          { text: '3-Point', type: 'tag-keywords', color: "bg-green-200 hover:bg-green-300" },
          { text: 'MVP', type: 'tag-keywords', color: "bg-red-200 hover:bg-red-300" },
        ],
        badges: [
          { name: 'NBA Champion', type: 'champion' },
          { name: 'League MVP', type: 'mvp' },
          { name: 'All-Star', type: 'allStar' },
          { name: 'Scoring Leader', type: 'scoring' },
          { name: '3-Point Leader', type: 'scoring' },
          { name: 'All-NBA Team', type: 'allStar' },
          { name: '50-40-90 Club', type: 'milestone' },
          { name: 'Finals MVP', type: 'mvp' },
          { name: '3-Point Contest Winner', type: 'record' },
          { name: 'Assist Leader', type: 'scoring' },
          { name: 'Steals Leader', type: 'defense' },
          { name: 'Free Throw Leader', type: 'scoring' },
          { name: 'All-Star Game MVP', type: 'mvp' },
          { name: '20K Points Club', type: 'milestone' },
          { name: 'All-Time 3PM Leader', type: 'record' },
          { name: 'Player of the Month', type: 'record' },
        ],
        gameLog: [
          { date: '2023-01-08', opponent: 'ATL', result: 'W 120-105', stats: { minutes: 35, points: 28, rebounds: 8, assists: 7 } },
          { date: '2023-01-01', opponent: 'CAR', result: 'W 115-100', stats: { minutes: 38, points: 32, rebounds: 10, assists: 9 } },
          { date: '2022-12-25', opponent: 'ARI', result: 'L 105-110', stats: { minutes: 40, points: 25, rebounds: 7, assists: 8 } },
          { date: '2022-12-18', opponent: 'CIN', result: 'W 110-95', stats: { minutes: 36, points: 30, rebounds: 9, assists: 8 } },
          { date: '2022-12-11', opponent: 'SF', result: 'W 125-100', stats: { minutes: 37, points: 35, rebounds: 7, assists: 10 } },
          { date: '2022-12-05', opponent: 'NO', result: 'W 110-105', stats: { minutes: 39, points: 28, rebounds: 8, assists: 9 } },
        ],
        sport: "NBA"
      };
    } else if (query === 'tom brady') {
      return {
        name: "Tom Brady",
        number: "12",
        team: "Tampa Bay Buccaneers",
        position: "Quarterback",
        nickname: "TB12",
        image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/2330.png&w=350&h=254",
        championships: 7,
        mvps: 3,
        allProFirstTeam: 3,
        proBowl: 15,
        passingYardsLeader: 4,
        passingTouchdownsLeader: 4,
        superBowlMVP: 5,
        bio: "Tom Brady is an American football quarterback for the Tampa Bay Buccaneers of the NFL. He is widely considered to be the greatest quarterback of all time.",
        stats: { 
          "Pass Yards": "84,520", 
          "Pass TDs": "624", 
          "Completions": "7,263", 
          "Comp %": "64.3", 
          "INT": "203", 
          "Passer Rating": "97.2" 
        },
        relatedBubbles: [
          { text: 'Buccaneers', type: 'tag-keywords', color: "bg-red-200 hover:bg-red-300" },
          { text: 'NFL', type: 'tag-keywords', color: "bg-blue-200 hover:bg-blue-300" },
          { text: 'Super Bowl', type: 'tag-keywords', color: "bg-green-200 hover:bg-green-300" },
        ],
        badges: [
          { name: 'Super Bowl Champion', type: 'champion' },
          { name: 'NFL MVP', type: 'mvp' },
          { name: 'Pro Bowl', type: 'allStar' },
          { name: 'Passing Yards Leader', type: 'scoring' },
          { name: 'Passing TDs Leader', type: 'scoring' },
          { name: 'All-Pro Team', type: 'allStar' },
          { name: 'Super Bowl MVP', type: 'mvp' },
          { name: 'Comeback Player of the Year', type: 'mvp' },
          { name: '600 TD Club', type: 'milestone' },
          { name: '80K Passing Yards', type: 'milestone' },
          { name: 'Perfect Season', type: 'record' },
          { name: 'NFL 100th Anniversary Team', type: 'milestone' },
        ],
        gameLog: [
          { date: '2023-01-08', opponent: 'ATL', result: 'L 30-17', stats: { passYards: 281, passTD: 1, int: 1, rating: 84.5 } },
          { date: '2023-01-01', opponent: 'CAR', result: 'W 30-24', stats: { passYards: 432, passTD: 3, int: 0, rating: 127.3 } },
          { date: '2022-12-25', opponent: 'ARI', result: 'W 19-16', stats: { passYards: 281, passTD: 1, int: 2, rating: 72.2 } },
          { date: '2022-12-18', opponent: 'CIN', result: 'L 34-23', stats: { passYards: 312, passTD: 3, int: 2, rating: 96.0 } },
          { date: '2022-12-11', opponent: 'SF', result: 'L 35-7', stats: { passYards: 253, passTD: 1, int: 2, rating: 63.7 } },
          { date: '2022-12-05', opponent: 'NO', result: 'W 17-16', stats: { passYards: 281, passTD: 2, int: 1, rating: 89.7 } },
        ],
        sport: "NFL"
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
        image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254",
        stats: { PPG: "25.0", RPG: "7.7", APG: "7.8", "FG%": "50.4", "3P%": "34.5", "FT%": "73.1" },
        badges: [
          { name: 'NBA Champion', type: 'champion' },
          { name: 'League MVP', type: 'mvp' },
          { name: 'All-Star', type: 'allStar' },
          { name: 'Scoring Leader', type: 'scoring' },
          { name: 'All-NBA Team', type: 'allStar' },
          { name: 'Finals MVP', type: 'mvp' },
          { name: '30K Points Club', type: 'milestone' },
          { name: 'All-Defensive Team', type: 'defense' },
          { name: 'Assist Leader', type: 'scoring' },
          { name: 'Rookie of the Year', type: 'milestone' },
        ]
      },
      'stephen curry': {
        name: "Stephen Curry",
        team: "Golden State Warriors",
        image: "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254",
        stats: { PPG: "29.4", RPG: "6.1", APG: "6.3", "FG%": "48.7", "3P%": "42.8", "FT%": "91.5" },
        badges: [
          { name: 'NBA Champion', type: 'champion' },
          { name: 'League MVP', type: 'mvp' },
          { name: 'All-Star', type: 'allStar' },
          { name: '3-Point Leader', type: 'scoring' },
          { name: 'All-NBA Team', type: 'allStar' },
          { name: 'Scoring Champion', type: 'scoring' },
          { name: '50-40-90 Club', type: 'milestone' },
          { name: 'Finals MVP', type: 'mvp' },
          { name: 'Steals Leader', type: 'defense' },
          { name: '3-Point Contest Winner', type: 'record' },
        ]
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

  const handlePlaceTake = (take) => {
    setPlacedTakes(prevTakes => [...prevTakes, take]);
    setTakeData(null); // Clear the current take response
    
    // Reset the search bar to its initial state
    setInputValue('');
    setResponse('');
    setResponseBubbles([]);
    setPlayerData(null);
    setIsSearched(false);
    setSearchType('YAP');
    setComparisonData(null);
    
    // Focus on the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePlacePoll = (poll) => {
    // Similar to handlePlaceTake, but for polls
    setPlacedTakes(prevTakes => [...prevTakes, { type: 'poll', ...poll }]);
    setPollData(null);
    
    // Reset the search bar to its initial state
    setInputValue('');
    setResponse('');
    setResponseBubbles([]);
    setPlayerData(null);
    setIsSearched(false);
    setSearchType('YAP');
    setComparisonData(null);
    
    // Focus on the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePlaceGrade = (grade) => {
    setPlacedTakes(prevTakes => [...prevTakes, { type: 'grade', ...grade }]);
    setGradeData(null);
    
    // Reset the search bar to its initial state
    setInputValue('');
    setResponse('');
    setResponseBubbles([]);
    setPlayerData(null);
    setIsSearched(false);
    setSearchType('YAP');
    setComparisonData(null);
    
    // Focus on the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleUserProfileClick = () => {
    setShowUserProfile(true);
  };

  const handleCloseUserProfile = () => {
    setShowUserProfile(false);
  };

  return (
    <div className="relative mx-auto max-w-4xl mt-8">
      {!showUserProfile ? (
        <>
          <div className="search-container p-6 bg-white rounded-lg shadow-md mb-4">
            <div className="search-bar-container flex items-center mb-2 relative">
              <div className="flex-grow flex items-center">
                <button 
                  className="search-label mr-2 h-8 flex items-center justify-center px-3 bg-gray-200 rounded-l-full cursor-pointer text-sm whitespace-nowrap"
                  onClick={handleSearchReset}
                >
                  {searchType}
                </button>
                <div className="search-bar flex-grow mr-2 bg-gray-100 rounded-r-full flex items-center h-8 relative">
                  <input
                    type="text"
                    className="search-input w-full bg-transparent h-full pl-1 pr-3 text-sm"
                    placeholder="Search or enter a command..."
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
                          onMouseDown={(e) => {
                            e.preventDefault(); // Prevent blur event
                            handleCommandSelect(cmd);
                          }}
                        >
                          <span className="font-semibold">{cmd.name}</span>
                          <span className="ml-2 text-gray-500">{cmd.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <button 
                  className="search-button rounded-full p-1.5 bg-blue-500 h-10 w-10 flex items-center justify-center mr-2" 
                  onClick={handleSearch}
                >
                  <FaSearch className="text-white text-lg" />
                </button>
                <button 
                  className="profile-button rounded-full p-1.5 bg-gray-200 h-10 w-10 flex items-center justify-center"
                  onClick={handleUserProfileClick}
                >
                  <FaUser className="text-gray-600 text-lg" />
                </button>
              </div>
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
                <h3 className="text-sm font-semibold mb-4 text-black">Related Searches</h3>
                <ResponseBubbles 
                  bubbles={responseBubbles.slice(0, 8)}
                  onBubbleClick={handleBubbleClick}
                />
                <hr className="my-4 border-gray-200" />
              </>
            )}

            {response && <BaseResponse response={response} />}
            {playerData && <PlayerProfile player={playerData} />}
            {comparisonData && <PlayerComparison players={comparisonData} />}
            {takeData && (
              <>
                <hr className="my-4 border-gray-200" />
                <TakeResponse take={takeData} onPlace={handlePlaceTake} placed={false} />
              </>
            )}
            {pollData && (
              <>
                <hr className="my-4 border-gray-200" />
                <PollResponse poll={pollData} onPlace={handlePlacePoll} placed={false} />
              </>
            )}
            {gradeData && (
              <>
                <hr className="my-4 border-gray-200" />
                <GradeResponse 
                  grade={gradeData} 
                  bubbles={responseBubbles}
                  onBubbleClick={handleBubbleClick}
                />
              </>
            )}
          </div>

          {/* Render placed takes, polls, and grades in separate boxes */}
          {placedTakes.map((item, index) => (
            <div key={index} className="mb-4 bg-white rounded-lg shadow-md p-4">
              {item.type === 'poll' ? (
                <PollResponse poll={item} placed={true} />
              ) : item.type === 'grade' ? (
                <GradeResponse 
                  grade={item} 
                  bubbles={item.bubbles}
                  onBubbleClick={handleBubbleClick}
                />
              ) : (
                <TakeResponse take={item} placed={true} />
              )}
            </div>
          ))}
        </>
      ) : (
        <UserProfile onClose={handleCloseUserProfile} placedTakes={placedTakes} />
      )}
    </div>
  );
}

export default SearchBar;
