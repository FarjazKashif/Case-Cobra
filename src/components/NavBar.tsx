import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import MaxWidthWrapper from './MaxWidthWrapper';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const NavBar = async () => {
    // Get the user and Destructure it
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    const isAdmin = user?.email === process.env.ADMIN_EMIAL
    // bg-white/85
    return (
        <nav className='sticky z-[100] h-24 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/30 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex justify-center pt-2'>
                    <Link href='/' className='flex z-40 font-semibold text-gray-800 text-3xl'>
                        Custom {' '}<span className='font-normal'> Crew</span>
                    </Link>
                </div>
                <div className='flex h-14 items-center justify-between border-zinc-200'>
                    <div></div>
                    <div className='h-full flex items-center space-x-4'>
                        <Link
                            href='/collections/polos'
                            className="text-gray-800 hover:font-bold transition-all font-light">
                            Polos
                        </Link>
                        <Link
                            href='/collections/sweatshirts'
                            className="text-gray-800 hover:font-bold transition-all font-light">
                            Sweatshirts
                        </Link>
                        <Link
                            href='/collections/hoodies'
                            className="text-gray-800 hover:font-bold transition-all font-light">
                            Hoodies
                        </Link>
                        <Link
                            href='/collections/tshirts'
                            className="text-gray-800 hover:font-bold transition-all font-light">
                            T-Shirts
                        </Link>
                        {/* {user ? (
                            <>
                                <Link
                                    href='/api/auth/logout'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-white"
                                    })}>
                                    Sign out
                                </Link>
                                {isAdmin ? (
                                    <Link
                                        href='/dashboard'
                                        className={buttonVariants({
                                            size: 'sm',
                                            variant: 'ghost',
                                            className: "text-white"
                                        })}>
                                        Dashboard ✨
                                    </Link>
                                ) : null}
                                <Link
                                    href='/configure/upload'
                                    className={buttonVariants({
                                        size: 'sm',
                                        className: 'hidden sm:flex items-center gap-1',
                                    })}>
                                    Create case
                                    <ArrowRight className='ml-1.5 h-5 w-5' />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href='/api/auth/register'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-white"
                                    })}>
                                    Sign up
                                </Link>

                                <Link
                                    href='/api/auth/login'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-white"
                                    })}>
                                    Login
                                </Link>

                                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                                <Link
                                    href='/configure/upload'
                                    className={buttonVariants({
                                        size: 'sm',
                                        className: 'hidden sm:flex items-center gap-1',
                                    })}>
                                    Create case
                                    <ArrowRight className='ml-1.5 h-5 w-5' />
                                </Link>
                            </>
                        )} */}
                        <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                        <Link
                            href='/configure/upload'
                            className={buttonVariants({
                                size: 'sm',
                                className: 'hidden sm:flex items-center  gap-1 font-light',
                            })}>
                            Create a Design
                            <ArrowRight className='ml-1.5 h-5 w-5' />
                        </Link>
                    </div>
                    <div>
                        {user ? (
                            <>
                                <Link
                                    href='/api/auth/logout'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-gray-800"
                                    })}>
                                    Sign out
                                </Link>
                                {isAdmin ? (
                                    <Link
                                        href='/dashboard'
                                        className={buttonVariants({
                                            size: 'sm',
                                            variant: 'ghost',
                                            className: "text-gray-800"
                                        })}>
                                        Dashboard ✨
                                    </Link>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <Link
                                    href='/api/auth/register'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-gray-800"
                                    })}>
                                    Sign up
                                </Link>

                                <Link
                                    href='/api/auth/login'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-gray-800"
                                    })}>
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default NavBar