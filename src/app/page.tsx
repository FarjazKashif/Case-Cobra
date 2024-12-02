'use client'

import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
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

      {/* value proposition section */}
      <section className='bg-slate-100 grainy-dark py-24'>
        <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
              What our{' '}
              <span className='relative px-2'>
                customers{' '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-brown-300' />
              </span>{' '}
              say
            </h2>
            <img src='/snake-2.png' className='w-24 order-0 lg:order-2' />
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
              </div>
              <div className='text-lg leading-8 text-gray-900'>
                <p>
                  "The case feels durable and I even got a compliment on the
                  design. Had the case for two and a half months now and{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    the image is super clear
                  </span>
                  , on the case I had before, the image started fading into
                  yellow-ish color after a couple weeks. Love it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-1.png'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold text-gray-800'>Jonathan</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-brown-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
                <Star className='h-5 w-5 text-brown-300 fill-brown-300' />
              </div>
              <div className='text-lg leading-8 text-gray-900'>
                <p>
                  "I usually keep my phone together with my keys in my pocket
                  and that led to some pretty heavy scratchmarks on all of my
                  last phone cases. This one, besides a barely noticeable
                  scratch on the corner,{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                    looks brand new after about half a year
                  </span>
                  . I dig it."
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-4.jpg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold text-gray-800'>Josh</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-brown-600' />
                    <p className='text-sm'>Verified Purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className='pt-16'>
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
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
                  src='/horse.jpg'
                  className='rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full'
                />
              </div>

              <Phone className='w-60' imgSrc='/horse_phone.jpg' />
            </div>
          </div>

          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 text-gray-900 w-fit'>
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
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}