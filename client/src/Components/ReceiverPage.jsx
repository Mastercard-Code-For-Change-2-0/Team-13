import { useState } from 'react';


const ReceiverPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newRequest, setNewRequest] = useState({
    title: '', description: '', category: '', amount: '', deadline: '', location: ''
  });

  // Sample data
  const [donationRequests, setDonationRequests] = useState([
    {
      id: 1, title: 'Medical Equipment', description: 'Urgent need for medical equipment',
      category: 'Medical', amount: 5000, raised: 3200, deadline: '2024-12-31',
      status: 'active', priority: 'high', createdAt: '2024-08-20', location: 'Pune, Maharashtra'
    },
    {
      id: 2, title: 'School Supplies', description: 'Educational materials for students',
      category: 'Education', amount: 2000, raised: 1800, deadline: '2024-11-30',
      status: 'active', priority: 'medium', createdAt: '2024-08-19', location: 'Pune, Maharashtra'
    }
  ]);

  const [donations] = useState([
    { id: 1, donor: 'Omkar', amount: 500, message: 'Hope this helps!', date: '2024-08-20', requestId: 1, city: 'Pune' },
    { id: 2, donor: 'Anurag', amount: 200, message: 'Keep up the great work!', date: '2024-08-19', requestId: 2, city: 'Pune' },
    { id: 3, donor: 'Anvi', amount: 1000, message: 'For the children!', date: '2024-08-18', requestId: 1, city: 'Pune' },
    { id: 4, donor: 'Shubham', amount: 750, message: 'Supporting the cause', date: '2024-08-17', requestId: 2, city: 'Pune' }
  ]);

  const categories = ['all', 'Medical', 'Education', 'Food', 'Shelter', 'Emergency', 'Other'];
  const statuses = ['all', 'active', 'urgent', 'completed'];

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (!newRequest.title || !newRequest.description || !newRequest.category || !newRequest.amount || !newRequest.deadline || !newRequest.location) {
      alert('Please fill in all required fields');
      return;
    }

    const request = {
      id: Date.now(),
      ...newRequest,
      amount: parseFloat(newRequest.amount),
      raised: 0,
      status: 'active',
      priority: 'medium',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setDonationRequests(prev => [...prev, request]);
    setNewRequest({ title: '', description: '', category: '', amount: '', deadline: '', location: '' });
    alert('Request created successfully!');
  };

  // Filter and sort
  const filteredRequests = donationRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600">{donationRequests.length}</h3>
          <p className="text-gray-600">Total Requests</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">
            Rs. {donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
          </h3>
          <p className="text-gray-600">Total Raised</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <h3 className="text-2xl font-bold text-orange-600">
            {donationRequests.filter(r => r.status === 'urgent').length}
          </h3>
          <p className="text-gray-600">Urgent Requests</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Donations</h3>
        <div className="space-y-3">
          {donations.map(donation => (
            <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{donation.donor}</p>
                <p className="text-sm text-gray-600">{donation.message}</p>
                <p className="text-xs text-gray-500">Request: {donationRequests.find(r => r.id === donation.requestId)?.title}</p>
                <p className="text-xs text-gray-500">Location: {donation.city}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">Rs. {donation.amount}</p>
                <p className="text-sm text-gray-500">{donation.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Requests = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Browse & Filter Requests</h3>
        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setStatusFilter('all'); }}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Clear Filters
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Showing {sortedRequests.length} of {donationRequests.length} requests
        </div>
      </div>

      {/* Create New Request */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Create New Donation Request</h3>
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={newRequest.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Request Title *"
              required
            />
            <select 
              name="category"
              value={newRequest.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select category *</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <textarea
            name="description"
            value={newRequest.description}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Description *"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="amount"
              value={newRequest.amount}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Amount (Rs.) *"
              min="0"
              step="0.01"
              required
            />
            <input
              type="date"
              name="deadline"
              value={newRequest.deadline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="text"
              name="location"
              value={newRequest.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Location *"
              required
            />
          </div>
          
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
            Create Request
          </button>
        </form>
      </div>

      {/* Request Items List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Request Items</h3>
        <div className="space-y-4">
          {sortedRequests.map(request => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold">{request.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{request.description}</p>
                  <p className="text-gray-500 text-sm">Location: {request.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Created: {request.createdAt}</p>
                  <p className="text-sm text-gray-500">Deadline: {request.deadline}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div><p className="text-gray-500">Category</p><p className="font-medium">{request.category}</p></div>
                <div><p className="text-gray-500">Amount Needed</p><p className="font-medium">Rs. {request.amount.toLocaleString()}</p></div>
                <div><p className="text-gray-500">Raised</p><p className="font-medium text-green-600">Rs. {request.raised.toLocaleString()}</p></div>
                <div><p className="text-gray-500">Progress</p><p className="font-medium">{Math.round((request.raised / request.amount) * 100)}%</p></div>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(request.raised / request.amount) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-right">
  <p
    className={`text-xs ${
      request.status === 'urgent' && request.raised < request.amount
        ? 'text-red-600'
        : 'text-gray-500'
    }`}
  >
    {request.raised >= request.amount
      ? 'Fully Funded!'
      : `Rs. ${(request.amount - request.raised).toLocaleString()} still needed`}
  </p>
</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const History = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Request History</h3>
        <div className="space-y-3">
          {donationRequests.map(request => (
            <div key={request.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">📝</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-gray-900">Request created: {request.title}</h5>
                  <span className="text-sm text-gray-500">{request.createdAt}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                <p className="text-sm text-gray-500 mt-1">Category: {request.category} • Amount: Rs. {request.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Donation History</h3>
        <div className="space-y-3">
          {donations.map(donation => (
            <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">💰</div>
                <div>
                  <h5 className="font-medium text-gray-900">{donation.donor}</h5>
                  <p className="text-sm text-gray-600">{donation.message}</p>
                  <p className="text-xs text-gray-500">Request: {donationRequests.find(r => r.id === donation.requestId)?.title}</p>
                  <p className="text-xs text-gray-500">Location: {donation.city}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">Rs. {donation.amount}</p>
                <p className="text-sm text-gray-500">{donation.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Profile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Receiver Profile</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
  src={Logo}
  alt="Seva Sahayog Foundation Logo"
  className="w-20 h-20 rounded-full object-cover border"
/>

            <div>
              <h4 className="text-lg font-semibold">Seva Sahayog Foundation</h4>
              <p className="text-gray-600">Verified Receiver</p>
              <p className="text-sm text-gray-500">Member since August 2024</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" value="Seva Sahayog Foundation" readOnly />
            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" value="contact@sevasahayog.org" readOnly />
            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" value="+91 (555) 123-4567" readOnly />
            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" value="Pune, Maharashtra, India" readOnly />
          </div>
          
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
            rows="3"
            value="We are dedicated to providing essential resources and support to communities in need across India, focusing on healthcare, education, and emergency relief through the spirit of seva (selfless service)."
            readOnly
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h5 className="font-semibold text-blue-800">Total Requests</h5>
              <p className="text-2xl font-bold text-blue-600">{donationRequests.length}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h5 className="font-semibold text-green-800">Success Rate</h5>
              <p className="text-2xl font-bold text-green-600">
                {Math.round((donationRequests.filter(r => r.raised >= r.amount).length / donationRequests.length) * 100)}%
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h5 className="font-semibold text-purple-800">Active Donors</h5>
              <p className="text-2xl font-bold text-purple-600">{new Set(donations.map(d => d.donor)).size}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img
  src={Logo}
  alt="Seva Sahayog Foundation Logo"
  className="w-10 h-10 rounded-lg object-contain"
/>

              <h1 className="text-2xl font-bold text-gray-900">Seva Sahayog Foundation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300">Settings</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Receiver Dashboard</h2>
          <p className="text-gray-600 mt-2">Manage your donation requests and track contributions</p>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'requests', label: 'Requests', icon: '📝' },
              { id: 'history', label: 'History', icon: '📚' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="min-h-[600px]">
          {activeTab === 'dashboard' && (
            <Dashboard donationRequests={donationRequests} donations={donations} />
          )}
          {activeTab === 'requests' && (
            <Requests
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categories={categories}
              statuses={statuses}
              sortedRequests={sortedRequests}
              donationRequests={donationRequests}
              newRequest={newRequest}
              handleInputChange={handleInputChange}
              handleSubmitRequest={handleSubmitRequest}
            />
          )}
          {activeTab === 'history' && (
            <History donationRequests={donationRequests} donations={donations} />
          )}
          {activeTab === 'profile' && (
            <Profile donationRequests={donationRequests} donations={donations} />
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 Seva Sahayog Foundation. All rights reserved.</p>
            <p className="mt-2">Making a difference, one donation at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReceiverPage;