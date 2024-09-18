import React from 'react';
import ResponseBubbles from './ResponseBubbles';

function GradeResponse({ grade, bubbles, onBubbleClick }) {
  const { player, statLine, overallGrade, categoryGrades } = grade;

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="grade-response">
      {bubbles && bubbles.length > 0 && (
        <>
          <h3 className="text-sm font-semibold mb-4 text-black">Related Searches</h3>
          <ResponseBubbles 
            bubbles={bubbles}
            onBubbleClick={onBubbleClick}
          />
          <hr className="my-4 border-gray-200" />
        </>
      )}

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h3 className="font-bold text-lg">{player}</h3>
          <p className="text-sm text-gray-500">{statLine}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Overall Grade</h4>
        <div className="flex items-center">
          <div className={`text-4xl font-bold ${getGradeColor(overallGrade)}`}>
            {overallGrade}
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <h4 className="font-semibold text-sm">Category Grades</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {Object.entries(categoryGrades).map(([category, grade]) => (
            <div key={category} className="flex justify-between items-center px-4 py-3">
              <div className="text-sm font-medium text-gray-700">{category}</div>
              <div className={`text-sm font-bold ${getGradeColor(grade)}`}>
                {grade}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GradeResponse;