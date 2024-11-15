'use client';

import { useCart } from '@/components/context/CartContext'; // Import the cart context
import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Sheet, SheetContent, SheetClose, SheetTrigger } from '@/components/ui/sheet';
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/ShadcnTabs/tabs';

export interface IProduct {
  title: string;
  price: number;
  image: string;
  currentSlug: string;
  category: {
    category: string;
  };
}

// Products per page
const PRODUCTS_PER_PAGE = 12;

const getProductsData = async (category: string | null = null) => {
  const filter = category ? `&& category->category == "${category}"` : '';
  const products = await client.fetch(
    `*[_type=="product" ${filter}] | order(_createdAt desc){
      title,
      price,
      image,
      category -> {
        category
      },
      "currentSlug": slug.current
    }`
  );
  return products;
};

const ProductsPage = () => {
  // const { cartItems, addToCart, removeFromCart } = useCart();
  const [data, setData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await getProductsData(selectedCategory);
      setData(products);
      setLoading(false);
    };
    fetchData();
  }, [selectedCategory]);

  // Pagination logic
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (indexOfLastProduct < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className='bg-slate-50 grainy-light'>
      <section>
        <MaxWidthWrapper className='pt-10 pb-32 sm:pb-12 lg:pt-24 xl:pt-32'>
          <div className='relative bg-brown-300 w-full h-36 rounded-3xl pb-32 grid xl:grid-cols-2 shadow-lg'>
            <div className='px-10 py-2'>
              <h2 className='text-2xl font-bold text-white'>Get Premium Quality T-Shirts...</h2>
              <p className='text-white text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident enim recusandae excepturi praesentium.</p>
            </div>
            <div className='relative box-border'>
              <Image className='absolute right-0 -top-[123px] shadow-lg' src="/model.png" width={400} height={500} alt='Model' />
            </div>
          </div>

          <div className='flex justify-between mt-10 mb-6'>
            <Tabs defaultValue="All" className="w-[600px]">
              <TabsList className="grid w-fit gap-x-1 grid-cols-5 bg-gray-200/35 rounded-lg p-1">
                {['All', 'T-Shirt', 'Polos', 'Hoodies', 'Sweat Shirts'].map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat.toLowerCase()}
                    onClick={() => setSelectedCategory(cat == 'All' ? null : cat)}
                    className={`py-1 px-4 text-center font-semibold rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200 
                      ${selectedCategory === (cat === 'All' ? null : cat) ? 'bg-gray-200 text-brown-300' : ''} 
                      data-[state=active]:bg-gray-200 data-[state=active]:text-green-500`}
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <ShoppingCart className='text-brown-300 w-2 h-2' />
                </Button>
              </SheetTrigger>
              <SheetContent className='bg-white flex flex-col'>
                <h2 className='text-lg font-semibold text-zinc-900'>Your Cart</h2>
                <ScrollArea className='flex-1 mt-4 overflow-y-auto'>
                  {cartItems.length === 0 ? (
                    <p className='text-lg font-semibold text-zinc-900'>Your cart is empty.</p>
                  ) : (
                    cartItems.map((product, index) => (
                      <div key={index} className='flex items-center justify-between py-2'>
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Product
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Price
                              </th>
                              <th scope="col" className="px-6 py-3">
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border-b">
                              <td className="px-6 py-4">
                                <Image src={urlFor(product.image).url()} alt={product.title} width={50} height={50} />
                              </td>
                              <td className="px-6 py-4">Rs.{product.price}</td>
                              <td className="px-6 py-4">
                                <Button variant="destructive" onClick={() => setCartItems((prevItems) => prevItems.filter((_, i) => i !== index))}>
                                  Undo
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))
                  )}
                </ScrollArea>
                <Link href="/checkout">
                  <Button className="text-lg font-semibold text-zinc-900 mt-4">
                    Proceed to Checkout
                  </Button>
                </Link>

                <SheetClose asChild>
                  <Button variant="outline" className='text-lg font-semibold text-zinc-900'>Close</Button>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>

          <div className='w-full h-px bg-zinc-200 my-4' />

          <div className='grid grid-cols-2 gap-x-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-x-2 xl:gap-x-8'>
            {loading ? (
              Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
                <div key={index} className='rounded-xl my-3 relative shadow-md hover:shadow-lg ease-in duration-100 backdrop-blur-lg bg-white/15 col-span-1'>
                  <Skeleton className='w-full h-72' />
                  <div className='px-3 py-3'>
                    <Skeleton className='w-3/4 h-5' />
                    <Skeleton className='w-1/2 h-5 mt-2' />
                  </div>
                </div>
              ))
            ) : (
              currentProducts.map((item, idx) => (
                <div key={idx} className='rounded-xl my-3 relative shadow-md hover:shadow-lg ease-in duration-100 backdrop-blur-lg bg-white/15 col-span-1'>
                  <Link href={`products/${item.currentSlug}`}>
                    <div className='relative box-border overflow-hidden border-b-2'>
                      <Image className='ease-in-out duration-1000 hover:scale-110 object-contain h-[250px]' src={urlFor(item.image).url()} alt={item.title} width={300} height={300} />
                    </div>
                  </Link>
                  <div className='px-3 py-3'>
                    <div className='flex justify-between items-center pb-4'>
                      <p className='text-xs text-brown-300'>{item.category.category.toLowerCase()}</p>
                      <Button variant="outline" size="sm" onClick={() => {
                        setCartItems((prevItems) => [...prevItems, item]);
                        toast(`${item.title} ${item.category.category} has been added!`, {
                          description: "Successfully Added!!",
                          style: { backgroundColor: 'white', color: "black" }
                        });
                      }}>
                        <ShoppingCart className='h-4 w-4 text-brown-300' />
                      </Button>
                    </div>
                    <span className='text-zinc-900 text-md'>{item.title}</span>
                    <div className='flex justify-between items-center pt-4'>
                      <p className='text-zinc-900 text-sm'>Rs.{item.price}</p>
                      <p className='text-brown-300 text-sm'>25% off</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </MaxWidthWrapper>

        <div className="flex justify-center space-x-4 my-2">
          <Button className='text-zinc-950 text-xs' variant="ghost" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
            <ArrowLeft className='w-5 h-5' />
          </Button>
          <Button className='text-zinc-950 text-xs' variant="ghost" size="sm" onClick={handleNextPage} disabled={indexOfLastProduct >= data.length}>
            <ArrowRight className='w-5 h-5' />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
