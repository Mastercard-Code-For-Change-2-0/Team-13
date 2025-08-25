import React, { useState } from "react";

const DonationHistory = ({ donations }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredDonations = donations.filter((donation) => {
    if (filter === "all") return true;
    return donation.status === filter;
  });

  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.submittedAt) - new Date(a.submittedAt);
    } else {
      return new Date(a.submittedAt) - new Date(b.submittedAt);
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "accepted":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      case "completed":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (donations.length === 0) {
    return (
      <div className="p-8">
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            No Donations Yet
          </h3>
          <p className="text-gray-600">
            Your donation history will appear here once you start donating.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Donation History
        </h2>
        <p className="text-gray-600">Track the status of all your donations</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">
            Filter by Status:
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Donations</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sortedDonations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start p-6 bg-gray-50 border-b">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {donation.itemName}
                </h3>
                <span className="text-gray-600 text-sm">
                  {donation.category}
                </span>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-semibold ${getStatusColor(
                  donation.status
                )}`}
              >
                <span>
                  {donation.status === "pending"
                    ? "Awaiting Review"
                    : donation.status === "accepted"
                    ? "Accepted"
                    : donation.status === "rejected"
                    ? "Not Approved"
                    : donation.status === "completed"
                    ? "Completed"
                    : "Other Status"}
                </span>
              </div>
            </div>

            <div className="p-6">
              {donation.photo && (
                <div className="mb-4 text-center">
                  <img
                    src={donation.photo}
                    alt={donation.itemName}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <span className="text-gray-800">{donation.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    Condition:
                  </span>
                  <span className="text-gray-800 capitalize">
                    {donation.condition}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    Submitted:
                  </span>
                  <span className="text-gray-800 text-sm">
                    {formatDate(donation.submittedAt)}
                  </span>
                </div>
                {donation.description && (
                  <div className="pt-2">
                    <span className="font-semibold text-gray-700 block mb-1">
                      Description:
                    </span>
                    <p className="text-gray-800 text-sm bg-gray-50 p-2 rounded">
                      {donation.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 border-t">
              <small className="text-gray-500">
                Donation ID: {donation.id}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {donations.length}
            </div>
            <div className="text-gray-600 text-sm">Total Donations</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {donations.filter((d) => d.status === "pending").length}
            </div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {donations.filter((d) => d.status === "accepted").length}
            </div>
            <div className="text-gray-600 text-sm">Accepted</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {donations.filter((d) => d.status === "completed").length}
            </div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
