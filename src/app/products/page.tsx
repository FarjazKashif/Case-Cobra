import { sanityClient } from '@/lib/sanityClient';
import ProductList from '../../components/ProductList';
import React from 'react';
import { client } from '@/sanity/lib/client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export interface IProduct {
  title: string
  price: number
  category: {
    category: string
  }
}

const getProductsData = async () => {
  const product = await client.fetch(`*[_type=="product"]{
  title,
  price,
  category -> {
    category
  }
}`)

  return product
}

const ProductsPage = async () => {
  const data: IProduct[] = await getProductsData()

  return (
    <div className='bg-slate-50 grainy-light'>
      <section>
        <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-4 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            {
              data.map((item) => (
                <div>
                  <h1 className='text-black'>{item.title}</h1>
                  <p className='text-black'>{item.price}</p>
                  <p className='text-black'>{item.category.category.toLowerCase()}</p>
                </div>
              ))
            }
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}

export default ProductsPage;
