import React, { useState } from "react";

const DonationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    itemName: "",
    category: "",
    quantity: "",
    description: "",
    condition: "good",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Clothing",
    "Food Items",
    "Books & Educational Materials",
    "Electronics",
    "Furniture",
    "Medical Supplies",
    "Toys & Games",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Photo size should be less than 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
        setFormData((prev) => ({
          ...prev,
          photo: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.donorName ||
      !formData.email ||
      !formData.itemName ||
      !formData.category ||
      !formData.quantity ||
      !formData.photo ||
      !formData.description
    ) {
      alert(
        "Please fill in all required fields, including description, and upload a photo"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit(formData);

      setFormData({
        donorName: "",
        email: "",
        phone: "",
        itemName: "",
        category: "",
        quantity: "",
        description: "",
        condition: "good",
        photo: null,
      });
      setPhotoPreview(null);

      alert(
        "Donation submitted successfully! It will be reviewed by our admin team."
      );
    } catch (error) {
      alert("Error submitting donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Make a Donation</h2>
        <p className="opacity-90">
          Help us help others by donating items in good condition
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Donor Information */}
        <div className="border-b border-gray-200 pb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Donor Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="donorName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="donorName"
                name="donorName"
                value={formData.donorName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 pb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Donation Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="itemName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Item Name *
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                required
                placeholder="What are you donating?"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Quantity *
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="How many items?"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="condition"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Condition
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              required
              placeholder="Additional details about the item"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Photo Upload *
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            Please upload a clear photo of the item for quality verification
          </p>

          <div className="mb-6">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
              required
              className="hidden"
            />
            <label
              htmlFor="photo"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg cursor-pointer font-semibold hover:bg-blue-600 transition-colors"
            >
              {photoPreview ? "Change Photo" : "Choose Photo"}
            </label>
          </div>

          {photoPreview && (
            <div className="text-center">
              <img
                src={photoPreview}
                alt="Donation item preview"
                className="max-w-xs max-h-48 object-cover rounded-lg border-4 border-gray-200 mx-auto"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Donation"}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
