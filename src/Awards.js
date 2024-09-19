import React, { useState } from 'react';
import { FaTrophy, FaMedal, FaStar, FaChevronUp, FaChevronDown } from 'react-icons/fa';

function Awards({ player, compact = false, showMore: externalShowMore = false, showButton = true }) {
  const [internalShowMore, setInternalShowMore] = useState(false);
  const showMore = showButton ? internalShowMore : externalShowMore;
  const isNFL = player.sport === "NFL";

  const renderAwardIcons = (count, Icon) => {
    return Array(count).fill().map((_, index) => <Icon key={index} className="text-yellow-400 ml-1" />);
  };

  const renderAwardRow = (label, count, Icon) => (
    <div className={`px-4 py-2 flex justify-between items-center ${compact ? 'text-sm' : ''}`}>
      <span className="font-medium flex items-center">
        {count}x {label}
      </span>
      <div className="flex items-center">
        {renderAwardIcons(count, Icon)}
      </div>
    </div>
  );

  const mainAwards = isNFL
    ? [
        { label: "Super Bowl Champion", count: player.championships, Icon: FaTrophy },
        { label: "NFL MVP", count: player.mvps, Icon: FaMedal },
        { label: "Pro Bowl", count: player.proBowl, Icon: FaStar },
      ]
    : [
        { label: "NBA Champion", count: player.championships, Icon: FaTrophy },
        { label: "NBA MVP", count: player.mvps, Icon: FaMedal },
        { label: "All-NBA First Team", count: player.allNBAFirstTeam, Icon: FaStar },
      ];

  const additionalAwards = isNFL
    ? [
        { label: "All-Pro First Team", count: player.allProFirstTeam, Icon: FaStar },
        { label: "Passing Yards Leader", count: player.passingYardsLeader, Icon: FaTrophy },
        { label: "Passing TDs Leader", count: player.passingTouchdownsLeader, Icon: FaTrophy },
        { label: "Super Bowl MVP", count: player.superBowlMVP, Icon: FaMedal },
      ]
    : [
        { label: "All-Star", count: player.allStar, Icon: FaStar },
        { label: "Scoring Champion", count: player.scoringChampion, Icon: FaTrophy },
        { label: "Defensive Player of the Year", count: player.dpoy, Icon: FaMedal },
        { label: "Finals MVP", count: player.finalsMVP, Icon: FaTrophy },
      ];

  return (
    <div className={compact ? '' : 'mt-4'}>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h4 className="font-semibold text-sm">{player.name}'s Awards and Career Achievements</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {mainAwards.map((award, index) => renderAwardRow(award.label, award.count, award.Icon))}
          
          {showMore && (
            <>
              {additionalAwards.map((award, index) => renderAwardRow(award.label, award.count, award.Icon))}
            </>
          )}
        </div>
        {showButton && (
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
            <button
              className="w-full text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center"
              onClick={() => setInternalShowMore(!internalShowMore)}
            >
              {internalShowMore ? (
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

export default Awards;