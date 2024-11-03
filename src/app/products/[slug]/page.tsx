import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText, PortableTextBlockComponent, PortableTextComponents } from '@portabletext/react';
import { ReactNode } from 'react'


export interface ProductContent {
    title: string
    price: number
    pd_image: any
    image: string
    currentSlug: string
    category: {
        category: string
    }
    content?: any[]
    pd_type: { pd_type: string }
    fit: string
}

interface BlockType {
    style?: string;
    children: { _key: string; text: string }[];
}

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



const getProductData = async (slug: string) => {
    const products = await client.fetch(
        `*[_type=="product" && slug.current == '${slug}'] {
            "currentSlug": slug.current,
            title,
            pd_image,
            image,
            price,
            content,
            pd_type -> {
                pd_type
            },
            fit,
            category -> {
                category
            }
      }[0]`
    );
    return products;
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {

    const data: ProductContent = await getProductData(params.slug)
    console.log(data.fit)
    return (
        <div className='bg-slate-50 grainy-light'>
            <section>
                <MaxWidthWrapper className='pt-10 pb-32 sm:pb-12 lg:pt-24 xl:pt-32'>
                    {params.slug === "null" ? <h1 className='text-4xl font-bold text-gray-950'>Page Not Found</h1> :
                        <div className='grid grid-cols-2 gap-x-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-x-2 xl:gap-x-8'>

                            {/* Left Content */}
                            <div className='px-10 py-2'>
                                <Image className='object-cover rounded-2xl' src={urlFor(data.image).url()} alt={data.title} width={700} height={700} />
                            </div>

                            {/* Right Content */}
                            <div className='px-10 py-2'>
                                <div className='block'>
                                    <h1 className='text-zinc-950 text-4xl font-extrabold uppercase'>{data.title}</h1>
                                    <p className='text-zinc-700 uppercase mt-5 text-xl'><span className='text-zinc-950 font-bold text-lg'>PKR </span>{data.price}</p>
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
                                                        {data.fit}
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
                            </div>
                        </div>
                    }


                </MaxWidthWrapper>
            </section>
        </div>
    )
}

export default ProductPage