'use client';

import React, { startTransition, useEffect, useState } from 'react';
import { IProduct } from "@/app/products/page";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState<IProduct[]>([]);
    const [quantities, setQuantities] = useState<number[]>([]);
    const router = useRouter()

    // Load cart from localStorage on initial render
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

        if (storedCart.length > 0) {
            setCartItems(storedCart);
            console.log('Stored Cart:', storedCart);
        }

        const storedQuantities = JSON.parse(localStorage.getItem('quantities') || '[]');
        const initialQuantities = storedQuantities.length === storedCart.length
            ? storedQuantities
            : storedCart.map(() => 1);

        setQuantities(initialQuantities);
    }, []);

    // Update quantities when cart items or quantities change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }, [cartItems, quantities]);

    // Remove item from cart
    const handleRemoveItem = (index: number) => {
        const updatedCart = cartItems.filter((_, idx) => idx !== index);
        const updatedQuantities = quantities.filter((_, idx) => idx !== index);
        setCartItems(updatedCart);
        setQuantities(updatedQuantities);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (index: number, value: number) => {
        if (isNaN(value) || value < 1) {
            return; // Prevent invalid values
        }

        setQuantities((prevQuantities) => {
            const updatedQuantities = [...prevQuantities];
            updatedQuantities[index] = value;
            return updatedQuantities;
        });
    };


    const calculateSubtotal = (price: string | number, quantity: number) => {
        return Number(price) * quantity;
    };

    // Calculate total price for all items
    const calculateTotal = () => {
        return cartItems.reduce((total, item, index) => {
            return total + calculateSubtotal(item.price, quantities[index] || 1);
        }, 0);
    };

    return (
        <div className="pt-16">
            <h3 className="text-3xl font-bold mb-6 text-zinc-900">Cart</h3>
            {cartItems.length === 0 ? (
                <>
                    <p className='text-zinc-800 text-lg mb-4'>Shop cart is empty.</p>
                    <Button onClick={() => {
                        startTransition(() => {
                            router.push(`/products`)
                        })
                    }}>Explore Products</Button>
                </>
            ) : (
                <div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-white border-b dark:border-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-lg">Product</th>
                                    <th scope="col" className="px-6 py-3 text-lg">Price</th>
                                    <th scope="col" className="px-6 py-3 text-lg">Quantity</th>
                                    <th scope="col" className="px-6 py-3 text-lg">Subtotal</th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative h-32 w-32">
                                                    <Image
                                                        src={urlFor(item.image).url()}
                                                        className="object-contain bg-gray-100 rounded-md"
                                                        alt="Product Image"
                                                        height={500}
                                                        width={500}
                                                    />
                                                </div>
                                                <span className="text-zinc-800 text-lg">{item.title}</span>
                                                <span className="text-zinc-800 text-lg">{item.size}</span>
                                                <span className="text-zinc-800 text-lg">{item.color}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{item.price} PKR</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center border-2 border-gray-300 w-[100px] overflow-hidden">
                                                <button
                                                    onClick={() => handleQuantityChange(index, quantities[index] - 1)}
                                                    className="w-6 h-10 flex items-center justify-center text-xl text-zinc-800 transition duration-200"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    value={quantities[index] !== undefined ? quantities[index] : 1}
                                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                                                    className="w-16 px-3 py-2 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                                                    min="1"
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(index, quantities[index] + 1)}
                                                    className="w-6 h-10 flex items-center justify-center text-xl text-zinc-800 transition duration-200"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {calculateSubtotal(item.price, quantities[index] || 1)} PKR

                                        </td>
                                        <td className="px-6 py-4">
                                            <XIcon
                                                className="w-5 h-5 cursor-pointer text-zinc-500"
                                                onClick={() => handleRemoveItem(index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-zinc-900">Total: {calculateTotal()} PKR</h3>
                        <Button
                            variant="default"
                            onClick={() => {
                                startTransition(() => {
                                    router.push(`/order/shipping`);
                                });
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
