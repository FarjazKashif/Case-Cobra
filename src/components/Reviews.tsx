"use client"

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";
import Image from "next/image";

const PHONES = [
    // '/testimonials/1.jpg',
    // '/testimonials/2.jpg',
    // '/testimonials/3.jpg',
    // '/testimonials/4.jpg',
    // '/testimonials/5.jpg',
    // '/testimonials/6.jpg'
    '/collections/polos/01.jpg',
    '/collections/polos/001.jpg',
    '/collections/polos/02.jpg',
    '/collections/polos/002.jpg',
    '/collections/polos/03.jpg',
    '/collections/polos/003.jpg',
    '/collections/polos/04.jpg',
    '/collections/polos/004.jpg',
    '/collections/polos/05.jpg',
    '/collections/polos/005.jpg',
]

function splitArray<T>(array: Array<T>, numParts: number) {
    const result: Array<Array<T>> = []

    for (let i = 0; i < array.length; i++) {
        const index = i % numParts
        if (!result[index]) {
            result[index] = []
        }
        result[index].push(array[i])
    }

    return result
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string
}

function Review({ imgSrc, className, ...props }: ReviewProps) {
    const POSSIBLE_ANIMATION_DELAYS = [
        "0s",
        "0.1s",
        "0.2s",
        "0.3s",
        "0.4s",
        "0.5s",
    ]

    const animationDelay = POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)]

    return (
        <div
            className={cn(
                // shadow-xl shadow-slate-900/5
                'animate-fade-in rounded-[2.25rem] bg-white opacity-0',
                className
            )}
            style={{ animationDelay }}
            {...props}
        >
            <Image src={imgSrc} alt="designs" width={450} height={450}/>
        </div>
    )
}

function ReviewColumn({
    reviews,
    className,
    reviewsClassName,
    msPerPixel = 0
}: {
    reviews: string[],
    className?: string,
    reviewsClassName?: (reviewIndex: number) => string,
    msPerPixel?: number
}) {

    const columnRef = useRef<HTMLDivElement | null>(null)
    const [columnHeight, setColumnHeight] = useState(0)
    const duration = `${columnHeight * msPerPixel}ms`

    useEffect(() => {
        if (!columnRef.current) return

        const resizeObserver = new window.ResizeObserver(() => {
            // If it's null or undefined
            setColumnHeight(columnRef.current?.offsetHeight ?? 0)
        })

        resizeObserver.observe(columnRef.current)

        return () => {
            resizeObserver.disconnect()
        }

    }, [])

    return (
        <div ref={columnRef}
            className={cn('animate-marquee space-y-8 py-4', className)}
            style={{ '--marquee-duration': duration } as React.CSSProperties}
        >
            {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
                <Review
                    key={reviewIndex}
                    imgSrc={imgSrc}
                    className={reviewsClassName?.(reviewIndex % reviews.length)}
                />
            ))}
        </div>
    )
}

function ReviewGrid() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.4 })
    const columns = splitArray(PHONES, 3)
    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2], 2)

    return (
        <div
            ref={containerRef}
            className='relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-5 overflow-hidden px-4 sm:mt-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
            {isInView ?
                <>
                    <ReviewColumn
                        reviews={[...column1, ...column3.flat(), ...column2]}
                        reviewsClassName={(reviewIndex) =>
                            cn({
                                'md:hidden': reviewIndex >= column1.length + column3[0].length,
                                'lg:hidden': reviewIndex >= column1.length,
                            })
                        }
                        msPerPixel={10}
                    />
                    <ReviewColumn
                        reviews={[...column2, ...column3[1]]}
                        className='hidden md:block'
                        reviewsClassName={(reviewIndex) =>
                            reviewIndex >= column2.length ? 'lg:hidden' : ''
                        }
                        msPerPixel={15}
                    />
                    <ReviewColumn
                        reviews={column3.flat()}
                        className='hidden md:block'
                        msPerPixel={10}
                    />
                </>
                : null}
            <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100/50' />
            <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100/50' />
        </div>
    )
}

export default function Reviews() {
    return (
        <MaxWidthWrapper className='relative'>
            <img
                aria-hidden='true'
                src='/what-people-are-buying.png'
                className='absolute select-none hidden xl:block h-[7rem] w-[7rem] left-[20px] rotate-45 -top-[7rem]'
            />

            <ReviewGrid />
        </MaxWidthWrapper>
    )
}