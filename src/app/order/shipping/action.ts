"use server"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ShippingAddress } from "@prisma/client"
import { db } from "@/db"
import { IProduct } from "@/app/products/page"

export type SaveConfigArgs = {
  id?: string,
  name: string,
  street: string,
  city: string,
  email: string,
  postalCode: string,
  phoneNumber: string,
  notes: string,
  orders: any
}

export async function saveConfig({
  name,
  street,
  city,
  email,
  postalCode,
  phoneNumber,
  notes,
  orders
}: SaveConfigArgs) {
  try {
    const savedOrder = await db.shippingAddress.create({
      data: { name, street, city, email, postalCode, phoneNumber, notes, orders},
    });
    console.log("Order saved successfully:", savedOrder); // Debugging log
    return savedOrder;
  } catch (error: any) {
    console.error("Error saving order:", error); // Log the full error
    throw new Error(`Failed to save order: ${error.message || error}`);
  }
}