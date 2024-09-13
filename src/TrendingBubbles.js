import React from 'react';

function TrendingBubbles({ onBubbleClick }) {
  const trendingTopics = [
    { text: "NBA Finals", color: "bg-red-200 hover:bg-red-300" },
    { text: "LeBron James", color: "bg-blue-200 hover:bg-blue-300" },
    { text: "Stephen Curry", color: "bg-green-200 hover:bg-green-300" },
    { text: "Kevin Durant", color: "bg-yellow-200 hover:bg-yellow-300" },
    { text: "Giannis Antetokounmpo", color: "bg-purple-200 hover:bg-purple-300" }
  ];

  return (
    <div className="trending-bubbles mt-4">
      <h3 className="text-sm font-semibold mb-4">Trending Searches</h3>
      <div className="flex flex-wrap gap-2">
        {trendingTopics.map((topic, index) => (
          <button
            key={index}
            className={`${topic.color} rounded-full px-3 py-1 text-sm h-8 flex items-center transition duration-300 ease-in-out`}
            onClick={() => onBubbleClick(topic.text)}
          >
            {topic.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TrendingBubbles;