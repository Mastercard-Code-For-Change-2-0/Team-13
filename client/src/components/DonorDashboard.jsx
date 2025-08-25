import React, { useState, useEffect } from "react";
import DonationForm from "./DonationForm";
import DonationHistory from "./DonationHistory";

const DonorDashboard = ({ donorId = "donor123" }) => {
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("donate");

  useEffect(() => {}, [donorId]);

  const addDonation = (newDonation) => {
    const donation = {
      id: Date.now().toString(),
      ...newDonation,
      status: "pending",
      submittedAt: new Date().toISOString(),
      donorId: donorId,
    };
    setDonations([...donations, donation]);
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <header className="mb-8 p-8">
        <h1 className="text-4xl font-bold mb-2 text-black text-left">
          Donor Dashboard
        </h1>
      </header>

      <nav className="flex gap-4 mb-8 bg-white p-4 rounded-xl shadow-lg">
        <button
          className={`flex-1 py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 ${
            activeTab === "donate"
              ? "bg-blue-500 text-white shadow-lg"
              : "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("donate")}
        >
          Make Donation
        </button>
        <button
          className={`flex-1 py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 ${
            activeTab === "history"
              ? "bg-blue-500 text-white shadow-lg"
              : "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Donation History
        </button>
      </nav>

      <main className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {activeTab === "donate" ? (
          <div className="grid lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-2">
              <DonationForm onSubmit={addDonation} />
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Recent Donations
              </h3>
              {donations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No donations yet. Please make your first donation to see it
                    here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {donations
                    .slice(-3)
                    .reverse()
                    .map((donation) => (
                      <div
                        key={donation.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm"
                      >
                        <span className="font-medium text-gray-800">
                          {donation.itemName}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                            donation.status === "pending"
                              ? "bg-yellow-500"
                              : donation.status === "accepted"
                              ? "bg-green-500"
                              : donation.status === "rejected"
                              ? "bg-red-500"
                              : "bg-purple-500"
                          }`}
                        >
                          {donation.status === "pending"
                            ? "Awaiting Review"
                            : donation.status === "accepted"
                            ? "Accepted"
                            : donation.status === "rejected"
                            ? "Not Approved"
                            : "Other Status"}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <DonationHistory donations={donations} />
        )}
      </main>
    </div>
  );
};

export default DonorDashboard;
