'use client'

import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ArrowRightToLine, Check, Star } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperCore from 'swiper'; // Import SwiperCore type
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRef } from "react";
import Image from "next/image";
import HoodiesHome from "@/components/HoodiesHome";
import BundlePack from "@/components/BundlePack";
import ParallaxImage from "@/components/ParallaxImage";
import ParallaxSection from "@/components/ParallaxImage";

export default function Home() {
  const swiperRef = useRef<SwiperCore | null>(null);
  return (
    <div className='bg-white'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
        // spaceBetween={30}
        slidesPerView={1}
        direction="vertical"
        style={{ height: '100vh' }}
        mousewheel={{
          enabled: true,
          forceToAxis: true, // Ensures vertical scrolling only
          releaseOnEdges: true, // Allows scrolling outside Swiper
        }}
        pagination={{ clickable: true, type: "bullets" }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={() => console.log('slide change')}
        onReachBeginning={() => {
          if (swiperRef.current) {
            swiperRef.current.mousewheel.enable(); // Disable mousewheel on first slide
          }
        }}
        onReachEnd={() => {
          if (swiperRef.current) {
            swiperRef.current.mousewheel.enable(); // Disable mousewheel on last slide
          }
        }}
        onFromEdge={() => {
          if (swiperRef.current) {
            swiperRef.current.mousewheel.enable(); // Re-enable mousewheel when moving away from edges
          }
        }}

      >
        <SwiperSlide><NextImage src="/banner/01.jpg" alt="Banner" fill /></SwiperSlide>
        <SwiperSlide><NextImage src="/banner/01.jpg" alt="Banner" fill /></SwiperSlide>
        <SwiperSlide><NextImage src="/banner/01.jpg" alt="Banner" fill /></SwiperSlide>
        <SwiperSlide><NextImage src="/banner/01.jpg" alt="Banner" fill /></SwiperSlide>
        ...
      </Swiper>

      {/* Category Section */}
      {/* bg-slate-100 grainy-dark */}
      <section className='bg-white py-10'>
        <MaxWidthWrapper className='flex flex-col items-center gap-8 sm:gap-12'>
          <div className='gap-4 sm:gap-6'>
            <p className="flex-row text-gray-800 text-center text-sm">VOL-III</p>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-3xl md:text-5xl text-gray-900'>
              THE
              <span className='relative px-2'>
                MONARCH'S{'  '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-brown-300' />
              </span>{' '}
              MUSE
            </h2>
            <p className="flex-row text-gray-800 text-center text-sm mt-5">Preserving the legacy of sophistication, rooted in old money tradition.</p>
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-4 gap-y-12'>
            <div className="flex flex-auto relative flex-col lg:pr-2 gap-2 overflow-hidden group">
              <Image
                alt="Polos"
                src="/collections/polos.jpg"
                width={450}
                height={450}
                className="transition-transform duration-1000 ease-in-out group-hover:scale-110 object-cover"
              />
              <p className="absolute bottom-3 left-4 font-light">Polos</p>
              <p className="absolute bottom-3 right-5 font-light"><ArrowRight className="h-5 w-5 transition-transform duration-500 ease-in-out font-light group-hover:translate-x-3" /></p>
            </div>

            <div className="flex flex-auto relative flex-col lg:pr-2 gap-2 overflow-hidden group">
              <Image
                alt="Shirts"
                src="/collections/shirts.jpg"
                width={450}
                height={450}
                className="transition-transform duration-1000 ease-in-out group-hover:scale-110 object-cover"
              />
              <p className="absolute bottom-3 left-4 font-light">Shirts</p>
              <p className="absolute bottom-3 right-5 font-light"><ArrowRight className="h-5 w-5 transition-transform duration-500 ease-in-out font-light group-hover:translate-x-3" /></p>
            </div>

            <div className="flex flex-auto relative flex-col lg:pr-2 gap-2 overflow-hidden group">
              <Image
                alt="Sweaters"
                src="/collections/sweatshirts.jpg"
                width={450}
                height={450}
                className="transition-transform duration-1000 ease-in-out group-hover:scale-110 object-cover"
              />
              <p className="absolute bottom-3 left-4 font-light">Sweaters</p>
              <p className="absolute bottom-3 right-5 font-light"><ArrowRight className="h-5 w-5 transition-transform duration-500 ease-in-out font-light group-hover:translate-x-3" /></p>
            </div>

            <div className="flex flex-auto relative flex-col lg:pr-2 gap-2 overflow-hidden group">
              <Image
                alt="Hoodies"
                src="/collections/hoodies.jpg"
                width={450}
                height={450}
                className="transition-transform duration-1000 ease-in-out group-hover:scale-110 object-cover"
              />
              <p className="absolute bottom-3 left-4 font-light">Hoodies</p>
              <p className="absolute bottom-3 right-5 font-light"><ArrowRight className="h-5 w-5 transition-transform duration-500 ease-in-out font-light group-hover:translate-x-3" /></p>
            </div>

          </div>
        </MaxWidthWrapper>
      </section>

      {/* Items */}
      <section className='bg-white py-10'>
        <MaxWidthWrapper className='flex flex-col gap-8 sm:gap-4'>
          <div className='gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-left text-balance !leading-tight font-bold text-3xl md:text-5xl text-gray-900'>
              The
              <span className='relative px-2'>
                POLOS{'  '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-brown-300' />
              </span>{' '}
            </h2>
            <p className="flex-row text-gray-800 text-left text-sm mt-5">Classic Polos for Modern Elegance.</p>
          </div>

          <HoodiesHome />
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className='bg-white'>
        {/* <div className='pt-16'> */}
        <Reviews />
        {/* </div> */}
      </section>

      <section className='bg-white py-10'>
        {/* <div className='pt-16'> */}
        <BundlePack />
        {/* </div> */}
      </section>

      <ParallaxSection src="/DOC22.jpg" />
      <section className="bg-white">
      </section>



      <section>
        <MaxWidthWrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-3xl md:text-5xl text-gray-900'>
                Upload your photo and get{' '}
                <span className='relative px-2 bg-brown-600 text-white'>
                  your own T-Shirt
                </span>{' '}
                now
              </h2>
            </div>
          </div>

          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative flex flex-col items-center md:grid grid-cols-2 gap-40'>
              <img
                src='/arrow.png'
                className='absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0'
              />

              <div className='relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl'>
                <img
                  src='/Typography.jpeg'
                  className='rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full'
                />
              </div>

              <Image className='rounded-md select-none pointer-events-none z-50 h-full object-cover' alt="" height={600} width={400} src='/Hanging.png' />
            </div>
          </div>

          {/* <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 text-gray-900 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-brown-600 inline mr-1.5' />
              High-quality silicone material
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-brown-600 inline mr-1.5' />
              Scratch- and fingerprint resistant coating
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-brown-600 inline mr-1.5' />
              Wireless charging compatible
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-brown-600 inline mr-1.5' />5 year
              print warranty
            </li>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href='/configure/upload'>
                Create your case now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </ul> */}
        </MaxWidthWrapper>
      </section>
    </div>
  );
}