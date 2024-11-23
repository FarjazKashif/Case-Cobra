"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thank you! Your order has been submitted.");
        // Reset form data after successful submission
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          email: "",
          notes: "",
        });
      } else {
        alert("Failed to submit the order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {/* <label htmlFor="name" className="block text-sm font-medium text-zinc-800">
            Full Name
          </label> */}
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full border border-gray-500 p-5 text-zinc-900"
            />
          </div>

          <div>
            {/* <label htmlFor="address" className="block text-sm font-medium text-zinc-800">
            Address
          </label> */}
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Street Address"
              className="w-full border border-gray-500 p-5 text-zinc-900"
            />
          </div>

          <div>
            {/* <label htmlFor="city" className="block text-sm font-medium text-zinc-800">
            City
          </label> */}
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="City"
              className="w-full border border-gray-500 p-5 text-zinc-900"
            />
          </div>

          <div>
            {/* <label htmlFor="zip" className="block text-sm font-medium text-zinc-800">
              ZIP Code
            </label> */}
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              placeholder="Postal / Zip Code"
              className="w-full border border-gray-500 p-5 text-zinc-900"
            />
          </div>

          <div>
            {/* <label htmlFor="phone" className="block text-sm font-medium text-zinc-800">
            Phone Number
          </label> */}
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone"
              className="w-full border border-gray-500 p-5 text-zinc-900"
            />
          </div>

          <div>
            {/* <label htmlFor="phone" className="block text-sm font-medium text-zinc-800">
            Phone Number
          </label> */}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full border border-gray-500 p-5 text-zinc-900"
            />
          </div>
        </div>

        <div>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any special instructions for delivery (Optional)..."
            rows={4}
            cols={8}
            className="w-full border border-gray-500 p-5 mt-5 text-zinc-900"
          />
        </div>

        <Button
          type="submit"
          className="w-auto text-white text-lg py-2 rounded-md transition duration-200"
          variant="default"
        >
          Submit Order
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
