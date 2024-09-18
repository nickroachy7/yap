import React from 'react';

function ResponseBubbles({ bubbles, onBubbleClick }) {
  return (
    <div className="flex flex-wrap -m-1">
      {bubbles.map((bubble, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-full text-sm m-1 ${bubble.color}`}
          onClick={() => onBubbleClick(bubble.text)}
        >
          {bubble.text}
        </button>
      ))}
    </div>
  );
}

export default ResponseBubbles;