import React, { useState } from 'react';

const PendingDonations = () => {
  const [donations, setDonations] = useState([
    {
      id: 1,
      item: 'Winter Jacket - Size L',
      donorName: 'John Doe',
      donorEmail: 'john.doe@email.com',
      donorPhone: '+1-555-0123',
      description: 'Brand new winter jacket, never worn. Perfect for cold weather.',
      category: 'Clothing',
      condition: 'New',
      submittedDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      item: 'School Supplies Set',
      donorName: 'Sarah Johnson',
      donorEmail: 'sarah.j@email.com',
      donorPhone: '+1-555-0456',
      description: 'Complete set of school supplies including notebooks, pens, pencils, and calculator.',
      category: 'Education',
      condition: 'New',
      submittedDate: '2024-01-14',
      status: 'pending'
    },
    {
      id: 3,
      item: 'Laptop - Dell Inspiron',
      donorName: 'Tech Solutions Inc.',
      donorEmail: 'donations@techsolutions.com',
      donorPhone: '+1-555-0789',
      description: 'Refurbished Dell Inspiron laptop, works perfectly. Includes charger.',
      category: 'Electronics',
      condition: 'Refurbished',
      submittedDate: '2024-01-13',
      status: 'pending'
    },
    {
      id: 4,
      item: 'Children\'s Books Collection',
      donorName: 'Maria Garcia',
      donorEmail: 'maria.garcia@email.com',
      donorPhone: '+1-555-0321',
      description: 'Collection of 20 children\'s books, ages 5-12. All in excellent condition.',
      category: 'Education',
      condition: 'Good',
      submittedDate: '2024-01-12',
      status: 'pending'
    }
  ]);

  const handleApprove = (donationId) => {
    setDonations(prev => 
      prev.map(donation => 
        donation.id === donationId 
          ? { ...donation, status: 'approved' }
          : donation
      )
    );
    console.log(`Donation ${donationId} approved`);
  };

  const handleReject = (donationId) => {
    setDonations(prev => 
      prev.map(donation => 
        donation.id === donationId 
          ? { ...donation, status: 'rejected' }
          : donation
      )
    );
    console.log(`Donation ${donationId} rejected`);
  };

  const pendingDonations = donations.filter(donation => donation.status === 'pending');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Clothing': return '👕';
      case 'Education': return '📚';
      case 'Electronics': return '💻';
      case 'Food': return '🍎';
      default: return '📦';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'New': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Refurbished': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Pending Donations</h2>
          <p className="text-gray-600 mt-2">Review and approve incoming donations</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
          <span className="font-semibold">{pendingDonations.length} Pending</span>
        </div>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {pendingDonations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
            <span className="text-6xl">🎉</span>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">No Pending Donations</h3>
            <p className="text-gray-500 mt-2">All donations have been reviewed!</p>
          </div>
        ) : (
          pendingDonations.map((donation) => (
            <div key={donation.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{getCategoryIcon(donation.category)}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{donation.item}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(donation.condition)}`}>
                        {donation.condition}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Donor Information</h4>
                      <p className="text-sm text-gray-600"><strong>Name:</strong> {donation.donorName}</p>
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {donation.donorEmail}</p>
                      <p className="text-sm text-gray-600"><strong>Phone:</strong> {donation.donorPhone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Donation Details</h4>
                      <p className="text-sm text-gray-600"><strong>Category:</strong> {donation.category}</p>
                      <p className="text-sm text-gray-600"><strong>Submitted:</strong> {donation.submittedDate}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Description</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{donation.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleReject(donation.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(donation.id)}
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

export default PendingDonations;
