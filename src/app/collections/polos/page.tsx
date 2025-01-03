'use client';

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowLeft, ArrowRight, ShoppingCart, Star } from 'lucide-react';
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
    pd_image: string;
    quantity: number;
    discount: number;
    currentSlug: string;
    category: {
        category: string;
    };
    color?: string;
    size?: string
}

// Products per page
const PRODUCTS_PER_PAGE = 12;

const getProductsData = async (category: string | null = null) => {
    const filter = category ? `&& category->category == "${category}"` : '';
    const products = await client.fetch(
        `*[_type=="product" && category->category == "Polo"] | order(_createdAt desc){
      title,
      price,
      image,
      pd_image,
      discount,
      category -> {
        category
      },
      "currentSlug": slug.current
    }`
    );
    return products;
};

const Polos = () => {
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

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

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
        <>
            <section style={{ backgroundImage: "url('/DOC22.jpg')" }} className='mx-auto w-full h-full overflow-y-hidden bg-cover bg-fixed bg-center bg-no-repeat'>
                <div className="relative z-10 h-screen flex items-center justify-center flex-col">
                    <h3 className="text-white text-4xl font-bold">Polos</h3>
                </div>
            </section>
            <MaxWidthWrapper>
                <section className='pt-4 pb-32 sm:pb-12'>
                    <div className="flex justify-end space-x-1 my-2">
                        <Button className='text-zinc-950 text-xs' variant="ghost" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <ArrowLeft className='w-5 h-5' />
                        </Button>
                        <Button className='text-zinc-950 text-xs' variant="ghost" size="sm" onClick={handleNextPage} disabled={indexOfLastProduct >= data.length}>
                            <ArrowRight className='w-5 h-5' />
                        </Button>
                    </div>
                    <div className='grid grid-cols-2 gap-x-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
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
                                <div key={idx} className='my-3 relative col-span-1'>
                                    <Link href={`/collections/polos/${item.currentSlug}`}>
                                        <div className="relative box-border overflow-hidden group w-[287px] h-[400px]">
                                            {/* First Image */}
                                            <Image
                                                className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
                                                src={urlFor(item.pd_image).url()}
                                                alt={item.title}
                                                width={300}
                                                height={300}
                                            />
                                            {/* Second Image */}
                                            <Image
                                                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                                                src={urlFor(item.image).url()}
                                                alt={`${item.title} alternate`}
                                                width={300}
                                                height={300}
                                            />
                                            {item.discount ? (
                                                <div className='absolute top-5 bg-zinc-900 w-10 text-white text-sm px-2'>{item.discount}%</div>
                                            ) : ""}
                                        </div>

                                    </Link>
                                    <div className='py-3'>
                                        <span className='text-zinc-900'>{item.title}</span>
                                        <div className='flex gap-0.5 mb-2 mt-1'>
                                            <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                                            <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                                            <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                                            <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                                            <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                                        </div>
                                        <div className='flex items-center'>
                                            {item.discount ? (
                                                <p className='text-zinc-900'>Rs.{Number(item.price - (item.price * item.discount / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                            ) : <p className='text-zinc-900'>Rs.{Number(item.price).toLocaleString()}.00</p>}

                                            {/* <p className='text-brown-300 text-sm'>25% off</p> */}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </MaxWidthWrapper>
        </>
    )
}

export default Polos