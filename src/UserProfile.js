import React from 'react';
import { FaUser, FaTimes, FaTrophy } from 'react-icons/fa';
import TakeResponse from './TakeResponse';

function UserProfile({ onClose, placedTakes }) {
  const userData = {
    username: '@johndoe',
    followers: 1234,
    following: 567,
    takes: 89,
    trophies: 10,
    rank: 42,
    accuracy: 68,
  };

  const trophies = Array(userData.trophies).fill({ type: 'trophy' });

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <div className="relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 bg-black rounded-full p-1.5 shadow-md hover:bg-gray-800 transition duration-200"
          >
            <FaTimes className="text-white text-base" />
          </button>
          <div className="bg-gray-100 p-4 relative">
            <div className="absolute top-0 bottom-0 w-0.5 bg-gray-300" style={{ left: 'calc(33.333% - 1px)' }}></div>
            <div className="flex">
              <div className="w-1/3 pr-4">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaUser className="text-5xl text-gray-600" />
                </div>
                <p className="text-lg text-gray-600 text-center">{userData.username}</p>
              </div>
              <div className="w-2/3 pl-4 flex flex-col justify-center">
                <h4 className="font-semibold mb-3 text-center">Trophy Case</h4>
                <div className="grid grid-cols-5 gap-4 mb-2 mx-auto">
                  {trophies.map((_, index) => (
                    <div 
                      key={index} 
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm"
                    >
                      <FaTrophy className="text-gray-400 text-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 relative">
          <div className="absolute top-0 h-12 w-0.5 bg-gray-300" style={{ left: 'calc(33.333% - 1px)' }}></div>
          <div className="flex">
            <div className="w-1/3 flex justify-start items-center pl-6">
              <div className="flex space-x-12">
                <div className="text-center">
                  <p className="font-semibold text-lg">{userData.followers}</p>
                  <p className="text-xs text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">{userData.following}</p>
                  <p className="text-xs text-gray-600">Following</p>
                </div>
              </div>
            </div>
            <div className="w-2/3 flex justify-between pl-4">
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="font-semibold text-lg">#{userData.rank}</p>
                  <p className="text-xs text-gray-600">Rank</p>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="font-semibold text-lg">{userData.accuracy}%</p>
                  <p className="text-xs text-gray-600">Accuracy</p>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="font-semibold text-lg">{userData.trophies}</p>
                  <p className="text-xs text-gray-600">Trophies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {placedTakes.map((take, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <TakeResponse take={take} placed={true} />
        </div>
      ))}
    </div>
  );
}

export default UserProfile;