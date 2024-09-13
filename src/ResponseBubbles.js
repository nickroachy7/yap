import React from 'react';

function ResponseBubbles({ bubbles, onBubbleClick }) {
  const colors = [
    "bg-red-200 hover:bg-red-300",
    "bg-blue-200 hover:bg-blue-300",
    "bg-green-200 hover:bg-green-300",
    "bg-yellow-200 hover:bg-yellow-300",
    "bg-purple-200 hover:bg-purple-300"
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {bubbles.map((bubble, index) => (
        <button
          key={index}
          className={`${colors[index % colors.length]} rounded-full px-3 py-1 text-sm h-8 flex items-center transition duration-300 ease-in-out`}
          onClick={() => onBubbleClick(bubble.text)}
        >
          {bubble.text}
        </button>
      ))}
    </div>
  );
}

export default ResponseBubbles;