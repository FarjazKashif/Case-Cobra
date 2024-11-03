// ProductPage.tsx
'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Radio, RadioGroup } from '@headlessui/react';
import { Label } from '@/components/ui/label';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { SIZES } from '@/app/validators/color-validators';
import { Tabs } from '@/components/ui/tabs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Check, Disc } from 'lucide-react';
import Link from 'next/link';

export interface ProductContent {
    title: string;
    price: number;
    pd_image: any;
    image: string;
    currentSlug: string;
    category: { category: string };
    content?: any[];
    pd_type: { pd_type: string };
    fit: string;
}

interface ProductPageProps {
    data: ProductContent;
}

interface BlockType {
    style?: string;
    children: { _key: string; text: string }[];
}


const ProductPage = ({ data }: ProductPageProps) => {

    const components: PortableTextComponents = {
        types: {
            block: ({ value }: { value: BlockType }) => {
                const { style = 'normal', children } = value;

                const renderStyle = (style: string) => {
                    switch (style) {
                        case 'h1':
                            return <h1 className='text-4xl font-bold'>{renderChildren(children)}</h1>;
                        case 'h2':
                            return <h2 className='text-3xl font-semibold'>{renderChildren(children)}</h2>;
                        case 'h3':
                            return <h3 className='text-2xl font-medium'>{renderChildren(children)}</h3>;
                        default:
                            return <p className='text-base'>{renderChildren(children)}</p>;
                    }
                };

                const renderChildren = (children: { _key: string; text: string }[]) =>
                    children.map((child) => <span key={child._key}>{child.text}</span>);

                return renderStyle(style);
            },
        },
        marks: {
            strong: ({ children }: { children?: ReactNode }) => <strong className='font-semibold'>{children}</strong>,
            em: ({ children }: { children?: ReactNode }) => <em className='italic'>{children}</em>,
            underline: ({ children }: { children?: ReactNode }) => <u className='underline'>{children}</u>,
        },
        list: {
            bullet: ({ children }: { children?: ReactNode }) => <ul className='list-disc pl-5'>{children}</ul>,
            number: ({ children }: { children?: ReactNode }) => <ol className='list-decimal pl-5'>{children}</ol>,
        },
        listItem: {
            bullet: ({ children }: { children?: ReactNode }) => <li className='mb-1'>{children}</li>,
            number: ({ children }: { children?: ReactNode }) => <li className='mb-1'>{children}</li>,
        },
    };

    const [size, setSize] = useState<{ sizes: (typeof SIZES)[number] }>({
        sizes: SIZES[0]
    });
    const [activeTab, setActiveTab] = useState(0);

    // Tabs
    const tabs = [
        {
            title: "Product Overview",
            value: "product",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl text-white bg-white shadow-xl">
                    <div className='relative text-zinc-700 text-xl space-y-2'>
                        <span className='text-zinc-950 font-bold text-lg'>Description:</span>

                        {/* npm install @portabletext/react */}
                        {data.content && data.content.length > 0 ? (
                            <PortableText
                                value={data.content}
                                components={components}
                            />
                        ) : (
                            <p>No content available</p>
                        )}
                    </div>

                    <div className='grid lg:grid-cols-2 mt-8'>
                        <div className='block'>
                            <h3 className='text-zinc-950 font-bold text-lg'>Features:</h3>
                            <ul className='mt-3'>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />High in Quality</li>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />Washable</li>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />Bright Color</li>
                            </ul>
                        </div>
                        <div className='block'>
                            <h3 className='text-zinc-950 font-bold text-lg'>Material Care:</h3>
                            <ul className='mt-3'>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />Machine wash max. 30ºC. Short spin.</li>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />Iron maximum 110ºC.</li>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />Do not bleach/bleach.</li>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />Do not dry clean.</li>
                                <li className='text-zinc-800 text-sm flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' />Tumble dry, medium hear</li>
                            </ul>
                        </div>
                    </div>

                    <div className='relative text-zinc-700 mt-5 text-xl space-y-2'>
                        <span className='text-zinc-950 font-bold text-lg'>Note:</span>
                        <p className='text-zinc-800 text-sm'>Is case if the product is damaged or has any issue, our coustomer support is available.</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Return Conditions",
            value: "return",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl text-white bg-white shadow-xl">
                    <div className='relative text-zinc-700 text-xl space-y-2'>
                        <span className='text-zinc-950 font-bold text-lg'>Return Conditions:</span>
                        <p className='text-zinc-800 text-sm'>Some of our items, due to their unique characteristics, must meet the following conditions in order to be returned:</p>
                        <ul className='mt-3'>
                            <li className='text-zinc-800 text-[16px] flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' /><p>Undergarments may be exchanged or returned provided they are in the same condition as when purchased.</p></li>
                            <li className='text-zinc-800 text-[16px] flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' /><p>Items that are part of a pack cannot be returned separately.</p></li>
                            <li className='text-zinc-800 text-[16px] flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' /><p>This must be returned with their original bag or cardboard intact. No altered belt will be exchanged or returned.</p></li>
                            <li className='text-zinc-800 text-[16px] flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' /><p>This must be returned with their original bag or cardboard intact. No altered belt will be exchanged or returned.</p></li>
                            <li className='text-zinc-800 text-[16px] flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' /><p>This must be returned with their original bag or cardboard intact. No altered belt will be exchanged or returned.</p></li>
                            <li className='text-zinc-800 text-[16px] flex items-center'><Check className='w-4 h-4 mr-2 text-green-500' /><p>This must be returned with their original bag or cardboard intact. No altered belt will be exchanged or returned.</p></li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className='bg-slate-50 grainy-light'>
            <section>
                <MaxWidthWrapper className='pt-10 pb-32 sm:pb-12 lg:pt-14 xl:pt-10'>
                    <span className='text-zinc-500 text-sm block mt-5 mb-7'><Link href='/'>Home</Link> / <span className='text-zinc-950'>{data.currentSlug}</span></span>
                    <div className='grid grid-cols-2 gap-x-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-x-2 xl:gap-x-0'>

                        {/* Left Content */}
                        <div className='relative'>
                            <Image className='object-cover h-[37.5rem]' src={urlFor(data.pd_image).url()} alt={data.title} width={700} height={700} />
                        </div>

                        {/* Right Content */}

                        {/* Customize Section */}
                        <div className='h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white'>
                            <ScrollArea className='relative flex-1 overflow-auto'>
                                <div
                                    aria-hidden='true'
                                    className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none'
                                />
                                <div className='px-8 pb-12 pt-8'>
                                    <h2 className='tracking-tight font-bold text-3xl text-zinc-700 uppercase'>
                                        {data.title}
                                    </h2>
                                    <div className='w-full h-px bg-zinc-200 my-6' />

                                    <div className='py-2'>
                                        <div className='block'>
                                            <p className='text-zinc-700 uppercase text-xl'><span className='text-zinc-950 font-bold text-lg'>PKR </span>{data.price}</p>
                                        </div>
                                        <div className='block mt-8 text-zinc-700 text-xl space-y-2'>
                                            <span className='text-zinc-950 font-bold text-lg'>Description:</span>

                                            {/* npm install @portabletext/react */}
                                            {data.content && data.content.length > 0 ? (
                                                <PortableText
                                                    value={data.content}
                                                    components={components}
                                                />
                                            ) : (
                                                <p>No content available</p>
                                            )}
                                        </div>
                                        <div className='block mt-8 text-zinc-700 text-xl space-y-2'>
                                            <span className='text-zinc-950 font-bold text-lg'>Details:</span>
                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                Product
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Fit
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Category
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Quality
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {data.pd_type.pd_type}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {data.fit && data.fit.length > 0 ? (data.fit) : <p>No Fit</p>}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {data.category.category}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Premium
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                        <div className='relative mt-8 h-full flex flex-col justify-between'>
                                            <div className='flex flex-col gap-6'>
                                                <RadioGroup value={size.sizes} onChange={(val) => {
                                                    setSize((prev) => ({
                                                        ...prev, // We're getting the previous value over here when we're setOptions. Then we are passing all the prev values..
                                                        sizes: val
                                                    }))
                                                }}>
                                                    <Label className="text-zinc-700 text-lg"><span className='text-zinc-950 font-bold'>Size: </span>{size.sizes.label}</Label>
                                                    <div className='mt-3 flex items-center space-x-3'>
                                                        {SIZES.map((size) => (
                                                            <Radio
                                                                value={size}
                                                                key={size.label}
                                                                className={({ checked, focus }) => cn(
                                                                    checked ? 'text-green-500 relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:text-green-500 active:text-green-500 font-bold' : 'relative -m-0.5 flex cursor-pointer items-center justify-center text-zinc-950',
                                                                )}
                                                            >
                                                                <span className="text-sm uppercase">{size.value}</span>
                                                            </Radio>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    <div className='w-full h-px bg-zinc-200 my-6' />

                    <div className="h-[15rem] md:h-[28rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-8">
                        <Tabs tabs={tabs} />
                    </div>

                    {/* <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        <SwiperSlide className='h-20 w-20 bg-black'>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        ...
                    </Swiper> */}
                </MaxWidthWrapper>
            </section>
        </div>
    )
};

export default ProductPage;
