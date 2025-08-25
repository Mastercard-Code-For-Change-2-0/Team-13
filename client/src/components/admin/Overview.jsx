import React from 'react';

const Overview = () => {
  const summaryData = {
    totalDonations: 156,
    totalRequests: 89,
    pendingMatches: 23,
    approvedTransactions: 67,
    pendingDonations: 12,
    pendingRequests: 18
  };

  const summaryCards = [
    {
      title: 'Total Donations',
      value: summaryData.totalDonations,
      icon: '🎁',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Requests',
      value: summaryData.totalRequests,
      icon: '📝',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Matches',
      value: summaryData.pendingMatches,
      icon: '🔗',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Approved Transactions',
      value: summaryData.approvedTransactions,
      icon: '✅',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Pending Donations',
      value: summaryData.pendingDonations,
      icon: '⏳',
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'Pending Requests',
      value: summaryData.pendingRequests,
      icon: '⌛',
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'New donation submitted', item: 'Winter Jacket', donor: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Request approved', item: 'School Supplies', receiver: 'Jane Smith', time: '4 hours ago' },
    { id: 3, action: 'Match created', item: 'Laptop', donor: 'Tech Corp', receiver: 'Student Aid', time: '6 hours ago' },
    { id: 4, action: 'Donation completed', item: 'Food Package', donor: 'Food Bank', receiver: 'Family Support', time: '1 day ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-2">Monitor and manage your donation matching portal</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className={`${card.color} rounded-full p-3 text-white text-2xl`}>
                {card.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    Item: <span className="font-medium">{activity.item}</span>
                    {activity.donor && (
                      <> • Donor: <span className="font-medium">{activity.donor}</span></>
                    )}
                    {activity.receiver && (
                      <> • Receiver: <span className="font-medium">{activity.receiver}</span></>
                    )}
                  </p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="text-center">
              <span className="text-2xl">🎁</span>
              <p className="mt-2 text-sm font-medium text-gray-700">Review Donations</p>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <span className="text-2xl">📝</span>
              <p className="mt-2 text-sm font-medium text-gray-700">Review Requests</p>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
            <div className="text-center">
              <span className="text-2xl">🔗</span>
              <p className="mt-2 text-sm font-medium text-gray-700">Create Matches</p>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <span className="text-2xl">📊</span>
              <p className="mt-2 text-sm font-medium text-gray-700">View Reports</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
