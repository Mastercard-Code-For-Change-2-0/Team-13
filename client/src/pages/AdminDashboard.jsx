import React, { useState } from 'react';
import Overview from '../components/admin/Overview';
import PendingDonations from '../components/admin/PendingDonations';
import PendingRequests from '../components/admin/PendingRequests';
import Matches from '../components/admin/Matches';
import ApprovedTransactions from '../components/admin/ApprovedTransactions';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'pending-donations', label: 'Pending Donations', icon: '🎁' },
    { id: 'pending-requests', label: 'Pending Requests', icon: '📝' },
    { id: 'matches', label: 'Matches', icon: '🔗' },
    { id: 'approved-transactions', label: 'Approved Transactions', icon: '✅' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ];

  const handleSectionChange = (sectionId) => {
    if (sectionId === 'logout') {
      // Handle logout logic here
      console.log('Logout clicked');
      return;
    }
    setActiveSection(sectionId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'pending-donations':
        return <PendingDonations />;
      case 'pending-requests':
        return <PendingRequests />;
      case 'matches':
        return <Matches />;
      case 'approved-transactions':
        return <ApprovedTransactions />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Donation Matching Portal Management</p>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="mt-8">
            <div className="px-4">
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleSectionChange(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                        activeSection === item.id
                          ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${item.id === 'logout' ? 'mt-8 text-red-600 hover:bg-red-50' : ''}`}
                    >
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
