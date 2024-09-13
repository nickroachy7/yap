import React from 'react';

function BaseResponse({ response }) {
  return (
    <div className="response mt-2">
      <div className="flex items-start">
        <div className="photo-box"></div>
        <div className="response-box">
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
}

export default BaseResponse;