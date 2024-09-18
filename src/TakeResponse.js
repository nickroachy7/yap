import React from 'react';

function TakeResponse({ take, onPlace, placed }) {
  // LeBron James profile photo URL
  const lebronPhotoUrl = "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254";

  return (
    <div className="take-response flex items-start bg-white rounded-lg overflow-hidden">
      <div className="w-24 h-24 bg-gray-300 flex-shrink-0 overflow-hidden rounded-lg">
        <img src={lebronPhotoUrl} alt="LeBron James" className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow p-4">
        <p className="text-sm font-medium mb-2">{take.takeText}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-500">Odds: {take.odds}</span>
            <span className="text-xs text-gray-500 ml-2">{take.date}</span>
          </div>
          {!placed && (
            <button
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition duration-300"
              onClick={() => onPlace(take)}
            >
              Place Take
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TakeResponse;