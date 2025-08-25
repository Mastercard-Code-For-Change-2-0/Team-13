import React, { useState } from 'react';

const ApprovedTransactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      transactionId: 'TXN-2024-001',
      donorName: 'Alice Cooper',
      receiverName: 'City Food Bank',
      receiverOrganization: 'City Food Bank',
      item: 'Canned Food Collection',
      category: 'Food',
      quantity: '50 cans',
      donorContact: 'alice.cooper@email.com',
      receiverContact: 'donations@cityfoodbank.org',
      approvedDate: '2024-01-10',
      completedDate: '2024-01-12',
      status: 'completed',
      deliveryMethod: 'Pickup',
      notes: 'Donor delivered items directly to food bank'
    },
    {
      id: 2,
      transactionId: 'TXN-2024-002',
      donorName: 'Tech Innovators LLC',
      receiverName: 'Youth Center',
      receiverOrganization: 'Downtown Youth Center',
      item: 'Refurbished Computers',
      category: 'Electronics',
      quantity: '5 laptops',
      donorContact: 'donations@techinnovators.com',
      receiverContact: 'programs@youthcenter.org',
      approvedDate: '2024-01-08',
      completedDate: '2024-01-11',
      status: 'completed',
      deliveryMethod: 'Delivery',
      notes: 'Corporate donation program - quarterly contribution'
    },
    {
      id: 3,
      transactionId: 'TXN-2024-003',
      donorName: 'Linda Martinez',
      receiverName: 'Sunshine Elementary',
      receiverOrganization: 'Sunshine Elementary School',
      item: 'Art Supplies',
      category: 'Education',
      quantity: '30 art kits',
      donorContact: 'linda.martinez@email.com',
      receiverContact: 'supplies@sunshine-elem.edu',
      approvedDate: '2024-01-09',
      completedDate: '2024-01-13',
      status: 'completed',
      deliveryMethod: 'Pickup',
      notes: 'Teacher requested specific art supplies for creative projects'
    },
    {
      id: 4,
      transactionId: 'TXN-2024-004',
      donorName: 'Robert Kim',
      receiverName: 'Winter Shelter',
      receiverOrganization: 'Emergency Winter Shelter',
      item: 'Warm Blankets',
      category: 'Clothing',
      quantity: '25 blankets',
      donorContact: 'robert.kim@email.com',
      receiverContact: 'intake@wintershelter.org',
      approvedDate: '2024-01-07',
      completedDate: '2024-01-10',
      status: 'completed',
      deliveryMethod: 'Delivery',
      notes: 'Urgent winter weather response donation'
    },
    {
      id: 5,
      transactionId: 'TXN-2024-005',
      donorName: 'Green Earth Foundation',
      receiverName: 'Community Garden',
      receiverOrganization: 'Riverside Community Garden',
      item: 'Gardening Tools',
      category: 'Tools',
      quantity: '15 tool sets',
      donorContact: 'grants@greenearth.org',
      receiverContact: 'coordinator@riversidegarden.org',
      approvedDate: '2024-01-06',
      completedDate: '2024-01-09',
      status: 'completed',
      deliveryMethod: 'Pickup',
      notes: 'Supporting urban agriculture initiative'
    },
    {
      id: 6,
      transactionId: 'TXN-2024-006',
      donorName: 'BookLovers United',
      receiverName: 'Literacy Program',
      receiverOrganization: 'Adult Literacy Program',
      item: 'Educational Books',
      category: 'Education',
      quantity: '100 books',
      donorContact: 'books@booklovers.org',
      receiverContact: 'coordinator@literacyprogram.org',
      approvedDate: '2024-01-05',
      completedDate: '2024-01-14',
      status: 'in-transit',
      deliveryMethod: 'Delivery',
      notes: 'Monthly book donation for adult education classes'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Clothing': return '👕';
      case 'Education': return '📚';
      case 'Electronics': return '💻';
      case 'Food': return '🍎';
      case 'Tools': return '🔧';
      default: return '📦';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-transit': return '🚚';
      case 'processing': return '⏳';
      default: return '📋';
    }
  };

  const getDeliveryIcon = (method) => {
    return method === 'Delivery' ? '🚚' : '📍';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const statusMatch = filterStatus === 'all' || transaction.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || transaction.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const categories = [...new Set(transactions.map(t => t.category))];
  const statuses = [...new Set(transactions.map(t => t.status))];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Approved Transactions</h2>
          <p className="text-gray-600 mt-2">Track completed and in-progress donation transactions</p>
        </div>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <span className="font-semibold">{filteredTransactions.length} Transactions</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">✅</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-green-600">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">🚚</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">In Transit</p>
              <p className="text-xl font-bold text-blue-600">
                {transactions.filter(t => t.status === 'in-transit').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">📊</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-xl font-bold text-purple-600">$12,450</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex items-center">
            <span className="text-2xl">🎯</span>
            <div className="ml-3">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-bold text-orange-600">{transactions.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="all">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
            <span className="text-6xl">📋</span>
            <h3 className="text-xl font-semibold text-gray-700 mt-4">No Transactions Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              {/* Transaction Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getCategoryIcon(transaction.category)}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{transaction.item}</h3>
                    <p className="text-sm text-gray-600">Transaction ID: {transaction.transactionId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    <span className="mr-1">{getStatusIcon(transaction.status)}</span>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* Donor Info */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Donor</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600"><strong>Name:</strong> {transaction.donorName}</p>
                    <p className="text-sm text-gray-600"><strong>Contact:</strong> {transaction.donorContact}</p>
                  </div>
                </div>

                {/* Receiver Info */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Receiver</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600"><strong>Organization:</strong> {transaction.receiverOrganization}</p>
                    <p className="text-sm text-gray-600"><strong>Contact:</strong> {transaction.receiverContact}</p>
                  </div>
                </div>

                {/* Transaction Info */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Details</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600"><strong>Quantity:</strong> {transaction.quantity}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Delivery:</strong> 
                      <span className="ml-1">{getDeliveryIcon(transaction.deliveryMethod)} {transaction.deliveryMethod}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-700 mb-3">Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><strong>Approved:</strong> {transaction.approvedDate}</p>
                  {transaction.completedDate && (
                    <p><strong>Completed:</strong> {transaction.completedDate}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              {transaction.notes && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{transaction.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApprovedTransactions;
