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

    return (
        <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/85 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href='/' className='flex z-40 font-semibold text-brown-300 text-2xl'>
                        Custom {' '}<span className='text-brown-600'> Crew</span>
                    </Link>

                    <div className='h-full flex items-center space-x-4'>
                        <Link
                            href='/products'
                            className={buttonVariants({
                                size: 'sm',
                                variant: 'ghost',
                                className: "text-gray-900"
                            })}>
                            Products
                        </Link>
                        {user ? (
                            <>
                                <Link
                                    href='/api/auth/logout'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-gray-900"
                                    })}>
                                    Sign out
                                </Link>
                                {isAdmin ? (
                                    <Link
                                        href='/dashboard'
                                        className={buttonVariants({
                                            size: 'sm',
                                            variant: 'ghost',
                                            className: "text-gray-900"
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
                                        className: "text-gray-900"
                                    })}>
                                    Sign up
                                </Link>

                                <Link
                                    href='/api/auth/login'
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'ghost',
                                        className: "text-gray-900"
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
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default NavBar