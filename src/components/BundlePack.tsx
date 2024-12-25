import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const BundlePack = () => {
    return (
        <section className='bg-white py-10'>
            <MaxWidthWrapper className='gap-8 sm:gap-12'>
                <div className='gap-4 sm:gap-6'>
                    <h2 className='order-1 mt-2 tracking-tight text-left text-balance !leading-tight font-bold text-3xl md:text-5xl text-gray-900'>
                        Premium
                        <span className='relative px-2'>
                            Collection{'  '}
                            <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-brown-300' />
                        </span>{' '}
                    </h2>
                </div>
                <div className='mx-auto pt-8 grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-4 gap-y-12'>
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
    )
}

export default BundlePack