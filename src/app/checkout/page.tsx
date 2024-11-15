// pages/checkout.tsx
import { useCart } from '@/components/context/CartContext';
import Image from 'next/image';

const CheckoutPage = () => {
    const { cartItems } = useCart();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <div className="mt-4">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border-b">
                            <Image src={item.image} alt={item.title} width={50} height={50} />
                            <span>{item.title}</span>
                            <span>Rs.{item.price}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
