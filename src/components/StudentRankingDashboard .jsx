import React, { useState } from 'react';
import axios from 'axios';

const StudentRankingDashboard = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [courseType, setCourseType] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedStudents, setMatchedStudents] = useState([]);
  const [error, setError] = useState('');

  const findMatches = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/StudentMatching/match', {
        jobDescription: jobDescription,
        courseType: courseType || null,
        limit: 5
      });
      
      setMatchedStudents(response.data);
    } catch (err) {
      setError('Failed to find matches. Please try again.');
      console.error('Error finding matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      findMatches();
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Student Job Matching</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Find Top Matching Students</h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Course Type (Optional)</label>
          <select
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
          >
            <option value="">All Courses</option>
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend Development</option>
          </select>
        </div>
        
        {/* Chat-like job description input */}
        <div className="mb-4">
          <div className="rounded-lg border border-gray-300 bg-white overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center">
              <span className="text-sm font-medium text-gray-700">Job Description</span>
            </div>
            
            <div className="p-0">
              <textarea
                className="w-full p-4 border-0 focus:ring-0 focus:outline-none resize-none min-h-40"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste the job description here... Press Enter to find matches"
                rows={6}
                style={{ 
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}
              />
            </div>
            
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Press Enter to search, Shift+Enter for new line
              </div>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 text-sm"
                onClick={findMatches}
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="text-red-500 bg-red-50 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
      </div>
      
      {matchedStudents.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Matching Students</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Feedback
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {matchedStudents.map((student, index) => (
                  <tr key={student.studentId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.courseType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(student.similarityScore * 100).toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-h-40 overflow-y-auto">{student.feedback}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRankingDashboard;