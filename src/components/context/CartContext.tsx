"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { IProduct } from '@/app/products/page';

interface CartContextType {
    cartItems: IProduct[];
    addToCart: (item: IProduct) => void;
    removeFromCart: (index: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<IProduct[]>([]);

    const addToCart = (item: IProduct) => setCartItems((prevItems) => [...prevItems, item]);

    const removeFromCart = (index: number) =>
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};