'use client'

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ArrowBigLeft, ArrowBigRight, ArrowLeft, ArrowLeftIcon, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export interface IProduct {
  title: string
  price: number
  image: string
  category: {
    category: string
  }
}

// Products per page
const PRODUCTS_PER_PAGE = 12;

const getProductsData = async () => {
  const products = await client.fetch(
    `*[_type=="product"] | order(_createdAt desc){
      title,
      price,
      image,
      category -> {
        category
      }
    }`
  );
  return products;
};

const ProductsPage = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const products = await getProductsData();
      setData(products);
      setLoading(false)
    };
    fetchData();
  }, []);

  // Calculate the current products to display
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
          <div className='relative bg-green-500 w-full h-36 rounded-3xl pb-32 grid xl:grid-cols-2'>
            <div className='px-10 py-2'>
              <h1 className='text-2xl font-bold text-white'>Get Premium Quality t-shirts...</h1>
              <p className='text-white text-sm mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident enim recusandae excepturi praesentium.</p>
            </div>

            <div className='relative box-border'>
              <Image className='absolute right-0 -top-[123px]' src="/model.png" width={400} height={500} alt='Model' />
            </div>

          </div>
          <div className='grid grid-cols-2 gap-x-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-x-2 xl:gap-x-8'>
            {loading ? (
              // Show skeletons if loading
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
                <div className='rounded-xl my-3 relative shadow-md hover:shadow-lg ease-in duration-100 backdrop-blur-lg bg-white/15 col-span-1' key={idx}>
                  <div className='relative box-border overflow-hidden'>
                    <Image className='ease-in-out duration-1000 hover:scale-110 object-contain h-[250px]' src={urlFor(item.image).url()} alt={item.title} width={300} height={300} />
                  </div>
                  <div className='px-3 py-3'>
                    <div className='flex justify-between items-center pb-4'>
                      <p className='text-xs text-rose-700'>{item.category.category.toLowerCase()}</p>
                      <Button variant="outline" size="sm">
                        <ShoppingCart className='h-4 w-4 text-green-700' />
                      </Button>
                    </div>
                    <span className='text-zinc-900 text-md'>{item.title}</span>
                    <div className='flex justify-between items-center pt-4'>
                      <p className='text-zinc-900 text-sm'>Rs.{item.price}</p>
                      <p className='text-green-700 text-sm'>25% off</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </MaxWidthWrapper>

        {/* Pagination */}

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
