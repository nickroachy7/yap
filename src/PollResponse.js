import React, { useState } from 'react';

function PollResponse({ poll, onPlace, placed }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitVote = () => {
    console.log(`Voted for: ${selectedOption}`);
  };

  return (
    <div className="poll-response">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h3 className="font-bold">{poll.question}</h3>
          <p className="text-sm text-gray-500">Posted by {poll.username}</p>
        </div>
      </div>
      
      {/* Four smaller square photos with options aligned below */}
      <div className="mb-4 flex justify-between">
        {poll.options.map((option, index) => (
          <div key={index} className="w-1/5 px-1 flex flex-col">
            <div className="aspect-square bg-gray-300 rounded mb-2"></div>
            <button
              className={`w-full p-2 rounded text-sm ${
                selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
      
      {!placed && (
        <div className="flex justify-between">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => onPlace(poll)}
          >
            Post Poll
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmitVote}
            disabled={!selectedOption}
          >
            Vote
          </button>
        </div>
      )}
      {placed && (
        <div className="relative h-10"> {/* Increased height for larger button */}
          <button
            className="absolute bottom-0 right-0 bg-blue-500 text-white px-4 py-2 rounded text-sm"
            onClick={handleSubmitVote}
            disabled={!selectedOption}
          >
            Vote
          </button>
        </div>
      )}
    </div>
  );
}

export default PollResponse;