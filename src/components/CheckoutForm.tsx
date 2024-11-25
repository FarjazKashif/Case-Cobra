"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import router from 'next/router';
import { saveConfig, SaveConfigArgs } from "@/app/order/shipping/action"
import { useMutation } from '@tanstack/react-query';
import { toast, useToast } from "@/hooks/use-toast"
import { PrismaClient } from "@prisma/client";

const CheckoutForm = () => {

  const prisma = new PrismaClient();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
  });

  // Handler to update state when input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const saveConfiguration = async (data: typeof formData) => {
  //   try {
  //     const result = await prisma.shippingAddress.create({
  //       data: {
  //         name: formData.name,
  //         street: formData.address,
  //         city: formData.city,
  //         postalCode: formData.zip,
  //         phoneNumber: formData.phone,
  //         email: formData.email,
  //         notes: formData.notes,
  //       },
  //     });
  //     return result; // Optional: Return the saved data
  //   } catch (error) {
  //     console.error("Error saving configuration:", error);
  //     throw new Error("Failed to save configuration");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);
      // Directly call the saveConfig function
      await saveConfig({
        name: formData.name,
        street: formData.address,
        city: formData.city,
        email: formData.email,
        postalCode: formData.zip,
        phoneNumber: formData.phone,
        notes: formData.notes
      });

      toast({
        title: "Success!",
        description: "Your order has been saved successfully.",
        variant: "default",
      });

      // Optionally clear the form
      setFormData({
        name: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        email: "",
        notes: "",
      });
    } catch (error: any) {
      console.error("Error saving order:", error);

      toast({
        title: "Something went wrong!",
        description: error.message || "Failed to save the order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto mt-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Full Name"
              className="w-full border border-gray-500 p-5 text-zinc-900"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Street Address"
              className="w-full border border-gray-500 p-5 text-zinc-900"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              id="city"
              name="city"
              required
              placeholder="City"
              className="w-full border border-gray-500 p-5 text-zinc-900"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              id="zip"
              name="zip"
              required
              placeholder="Postal / Zip Code"
              className="w-full border border-gray-500 p-5 text-zinc-900"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Phone"
              className="w-full border border-gray-500 p-5 text-zinc-900"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
              className="w-full border border-gray-500 p-5 text-zinc-900"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <textarea
            id="notes"
            name="notes"
            placeholder="Add any special instructions for delivery (Optional)..."
            rows={4}
            cols={8}
            className="w-full border border-gray-500 p-5 mt-5 text-zinc-900"
            value={formData.notes}
            onChange={handleChange}
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
function saveConfiguration(): any {
  throw new Error("Function not implemented.");
}

