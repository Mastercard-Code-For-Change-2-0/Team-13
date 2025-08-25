import React, { useState } from 'react';

const PendingRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      itemNeeded: 'Winter Clothing',
      receiverName: 'Emily Rodriguez',
      receiverEmail: 'emily.r@email.com',
      receiverPhone: '+1-555-1234',
      organization: 'Local Homeless Shelter',
      description: 'Need winter clothing for adults and children staying at our shelter during cold months.',
      category: 'Clothing',
      urgency: 'High',
      quantity: '50 items',
      submittedDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      itemNeeded: 'Educational Supplies',
      receiverName: 'Michael Chen',
      receiverEmail: 'mchen@schoolaid.org',
      receiverPhone: '+1-555-5678',
      organization: 'Community School Aid',
      description: 'School supplies needed for underprivileged students in grades K-12.',
      category: 'Education',
      urgency: 'Medium',
      quantity: '100 sets',
      submittedDate: '2024-01-14',
      status: 'pending'
    },
    {
      id: 3,
      itemNeeded: 'Computers/Laptops',
      receiverName: 'Jennifer Thompson',
      receiverEmail: 'j.thompson@digitaldivide.org',
      receiverPhone: '+1-555-9012',
      organization: 'Digital Divide Foundation',
      description: 'Laptops needed for students to access online learning and complete homework.',
      category: 'Electronics',
      urgency: 'High',
      quantity: '20 laptops',
      submittedDate: '2024-01-13',
      status: 'pending'
    },
    {
      id: 4,
      itemNeeded: 'Food Packages',
      receiverName: 'David Williams',
      receiverEmail: 'dwilliams@foodbank.org',
      receiverPhone: '+1-555-3456',
      organization: 'Central Food Bank',
      description: 'Non-perishable food items for families facing food insecurity.',
      category: 'Food',
      urgency: 'Critical',
      quantity: '200 packages',
      submittedDate: '2024-01-12',
      status: 'pending'
    }
  ]);

  const handleApprove = (requestId) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'approved' }
          : request
      )
    );
    console.log(`Request ${requestId} approved`);
  };

  const handleReject = (requestId) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'rejected' }
          : request
      )
    );
    console.log(`Request ${requestId} rejected`);
  };

  const pendingRequests = requests.filter(request => request.status === 'pending');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Clothing': return '👕';
      case 'Education': return '📚';
      case 'Electronics': return '💻';
      case 'Food': return '🍎';
      default: return '📋';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'Critical': return '🚨';
      case 'High': return '⚠️';
      case 'Medium': return '📍';
      case 'Low': return '✅';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pending Requests</h2>
          <p className="text-gray-600 mt-2">Review and approve incoming requests for assistance</p>
        </div>
        <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
          <span className="font-semibold">{pendingRequests.length} Pending</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filter by urgency:</span>
            <button className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Critical</button>
            <button className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">High</button>
            <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Medium</button>
            <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Low</button>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {pendingRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
            <span className="text-6xl">🎉</span>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">No Pending Requests</h3>
            <p className="text-gray-500 mt-2">All requests have been reviewed!</p>
          </div>
        ) : (
          pendingRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getCategoryIcon(request.category)}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{request.itemNeeded}</h3>
                    <p className="text-sm text-gray-600">Requested by: {request.organization}</p>
                  </div>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full border ${getUrgencyColor(request.urgency)}`}>
                  <span className="mr-1">{getUrgencyIcon(request.urgency)}</span>
                  <span className="text-xs font-medium">{request.urgency}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Contact:</strong> {request.receiverName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {request.receiverEmail}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Phone:</strong> {request.receiverPhone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Organization:</strong> {request.organization}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Request Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Category:</strong> {request.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Quantity:</strong> {request.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Submitted:</strong> {request.submittedDate}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{request.description}</p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleReject(request.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(request.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingRequests;
