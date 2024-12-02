'use client'

import { IProduct } from '@/app/products/page';
import CheckoutForm from '@/components/CheckoutForm'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

const Shipping = () => {

  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '[]');

    const updatedCart = storedCart.map((item: IProduct, index: number) => ({
      ...item,
      quantity: storedQuantities[index] || 1, // Assign default quantity of 1 if not available
    }));

    setCartItems(updatedCart);
  }, []);

  // Calculate total price when cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 100;
    setPrice(total);
  }, [cartItems]);

  return (
    <div className='relative mt-20 grid grid-cols-1 gap-x-4 lg:grid-cols-5 mb-20 pb-20'>
      <div className='relative h-[37.5rem] overflow-hidden col-span-3 w-full max-w-4xl'>
        <h3 className="text-3xl font-bold mb-6 text-zinc-900">Billing Details</h3>
        <CheckoutForm cart={cartItems} price={price} />
      </div>
      <div className='relative h-fit overflow-hidden col-span-2 bg-white border border-zinc-900 p-5'>
        <h3 className="text-2xl font-bold mb-6 text-zinc-900">Order Details</h3>
        {cartItems.length === 0 ? (
          <p className='text-zinc-700'>No items in the cart.</p>
        ) : (
          <div>


            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.title} x {item.quantity}
                      </th>
                      <td className="px-6 py-4">
                        {item.price * item.quantity} PKR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-lg font-bold text-zinc-900">Shipping</p>
              <p className="text-lg font-bold text-zinc-900">100 PKR</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mt-3">
              <p className="text-lg font-bold text-zinc-900">Total</p>
              <p className="text-lg font-bold text-zinc-900">{price} PKR</p>
            </div>
            <hr className="my-4" />
          </div>
        )}

        <div className='relative h-fit overflow-hidden col-span-2 bg-white mt-6'>
          <h3 className="text-2xl font-bold mb-2s text-zinc-900">Cash on Delivery</h3>
          <p className='text-gray-500 text-sm'>You pay for your order when it is delivered to you. Instead of paying online, you hand over the cash to the delivery person when your package arrives. It's a simple and convenient option for those who prefer not to use online payment methods.</p>
        </div>
      </div>
    </div>
  )
}

export default Shipping

function saveConfiguration(): any {
  throw new Error('Function not implemented.');
}
