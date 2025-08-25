import React, { useState } from 'react';

const Matches = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      donationId: 101,
      requestId: 201,
      donorName: 'John Doe',
      receiverName: 'Emily Rodriguez',
      receiverOrganization: 'Local Homeless Shelter',
      item: 'Winter Jacket - Size L',
      category: 'Clothing',
      matchScore: 95,
      compatibility: 'Excellent',
      donorContact: 'john.doe@email.com',
      receiverContact: 'emily.r@email.com',
      matchedDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      donationId: 102,
      requestId: 202,
      donorName: 'Sarah Johnson',
      receiverName: 'Michael Chen',
      receiverOrganization: 'Community School Aid',
      item: 'School Supplies Set',
      category: 'Education',
      matchScore: 88,
      compatibility: 'Very Good',
      donorContact: 'sarah.j@email.com',
      receiverContact: 'mchen@schoolaid.org',
      matchedDate: '2024-01-14',
      status: 'pending'
    },
    {
      id: 3,
      donationId: 103,
      requestId: 203,
      donorName: 'Tech Solutions Inc.',
      receiverName: 'Jennifer Thompson',
      receiverOrganization: 'Digital Divide Foundation',
      item: 'Laptop - Dell Inspiron',
      category: 'Electronics',
      matchScore: 92,
      compatibility: 'Excellent',
      donorContact: 'donations@techsolutions.com',
      receiverContact: 'j.thompson@digitaldivide.org',
      matchedDate: '2024-01-13',
      status: 'pending'
    },
    {
      id: 4,
      donationId: 104,
      requestId: 204,
      donorName: 'Maria Garcia',
      receiverName: 'Local Library',
      receiverOrganization: 'Central Public Library',
      item: 'Children\'s Books Collection',
      category: 'Education',
      matchScore: 85,
      compatibility: 'Good',
      donorContact: 'maria.garcia@email.com',
      receiverContact: 'books@centrallibrary.org',
      matchedDate: '2024-01-12',
      status: 'pending'
    }
  ]);

  const handleApproveMatch = (matchId) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: 'approved' }
          : match
      )
    );
    console.log(`Match ${matchId} approved`);
  };

  const handleRejectMatch = (matchId) => {
    setMatches(prev => 
      prev.map(match => 
        match.id === matchId 
          ? { ...match, status: 'rejected' }
          : match
      )
    );
    console.log(`Match ${matchId} rejected`);
  };

  const pendingMatches = matches.filter(match => match.status === 'pending');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Clothing': return '👕';
      case 'Education': return '📚';
      case 'Electronics': return '💻';
      case 'Food': return '🍎';
      default: return '📦';
    }
  };

  const getCompatibilityColor = (compatibility) => {
    switch (compatibility) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Suggested Matches</h2>
          <p className="text-gray-600 mt-2">Review and approve suggested donation matches</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
          <span className="font-semibold">{pendingMatches.length} Pending Matches</span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">🎯</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Matches</p>
              <p className="text-xl font-bold text-gray-900">{matches.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">⏳</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-blue-600">{pendingMatches.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">✅</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-xl font-bold text-green-600">
                {matches.filter(m => m.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">📊</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg. Score</p>
              <p className="text-xl font-bold text-purple-600">
                {Math.round(matches.reduce((acc, m) => acc + m.matchScore, 0) / matches.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {pendingMatches.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
            <span className="text-6xl">🎉</span>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">No Pending Matches</h3>
            <p className="text-gray-500 mt-2">All matches have been reviewed!</p>
          </div>
        ) : (
          pendingMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              {/* Match Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getCategoryIcon(match.category)}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{match.item}</h3>
                    <p className="text-sm text-gray-600">Category: {match.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(match.matchScore)}`}>
                    {match.matchScore}%
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(match.compatibility)}`}>
                    {match.compatibility}
                  </span>
                </div>
              </div>

              {/* Match Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Donor Side */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-lg">🤝</span>
                    <h4 className="font-semibold text-blue-700 ml-2">Donor</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Name:</strong> {match.donorName}</p>
                    <p className="text-sm"><strong>Contact:</strong> {match.donorContact}</p>
                    <p className="text-sm"><strong>Donation ID:</strong> #{match.donationId}</p>
                  </div>
                </div>

                {/* Receiver Side */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <span className="text-lg">🏢</span>
                    <h4 className="font-semibold text-green-700 ml-2">Receiver</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Contact:</strong> {match.receiverName}</p>
                    <p className="text-sm"><strong>Organization:</strong> {match.receiverOrganization}</p>
                    <p className="text-sm"><strong>Email:</strong> {match.receiverContact}</p>
                    <p className="text-sm"><strong>Request ID:</strong> #{match.requestId}</p>
                  </div>
                </div>
              </div>

              {/* Match Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-700 mb-2">Match Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <p><strong>Match Date:</strong> {match.matchedDate}</p>
                  <p><strong>Match Score:</strong> {match.matchScore}%</p>
                  <p><strong>Compatibility:</strong> {match.compatibility}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleRejectMatch(match.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Reject Match
                </button>
                <button
                  onClick={() => handleApproveMatch(match.id)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Approve Match
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Matches;
