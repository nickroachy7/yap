import React from 'react';

function Awards({ player, title }) {
  return (
    <div className="awards mt-4">
      <h3 className="text-xl font-bold">{title}</h3> {/* Updated title */}
      <ul className="list-disc list-inside">
        {player.badges.map((badge, index) => (
          <li key={index}>{badge.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Awards;