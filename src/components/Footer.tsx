import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Facebook, FacebookIcon, Instagram } from 'lucide-react'

const Footer = () => {
    return (
        // <footer className='bg-white h-20 relative'>
        //     <MaxWidthWrapper>
        //         <div className='border-t border-gray-200' />

        //         <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
        //             <div className='text-center md:text-left pb-2 md:pb-0'>
        //                 <p className='text-sm text-muted-foreground'>
        //                     &copy; {new Date().getFullYear()} All rights reserved
        //                 </p>
        //             </div>

        //             <div className='flex items-center justify-center'>
        //                 <div className='flex space-x-8'>
        //                     <Link
        //                         href='#'
        //                         className='text-sm text-muted-foreground hover:text-gray-600'>
        //                         Terms
        //                     </Link>
        //                     <Link
        //                         href='#'
        //                         className='text-sm text-muted-foreground hover:text-gray-600'>
        //                         Privacy Policy
        //                     </Link>
        //                     <Link
        //                         href='#'
        //                         className='text-sm text-muted-foreground hover:text-gray-600'>
        //                         Cookie Policy
        //                     </Link>
        //                 </div>
        //             </div>
        //         </div>
        //     </MaxWidthWrapper>
        // </footer>


        <footer className="bg-gray-100">
            <MaxWidthWrapper>
                <div className="w-full max-w-screen-xl">
                    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className=" hover:underline">About Us</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Conatct Us</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Policies</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Shipping & Handling</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Exchange Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Licensing</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Social Media</h2>
                            <div className="flex mt-4 md:mt-0 space-x-5 rtl:space-x-reverse">
                                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <Facebook className='w-5 h-5' />
                                    <span className="sr-only">Facebook page</span>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <Instagram className='w-5 h-5' />
                                    <span className="sr-only">Instagram page</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='border-t border-gray-400' />
                    <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">&copy; {new Date().getFullYear()} All rights reserved
                        </span>
                        <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <Facebook className='w-5 h-5' />
                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                <Instagram className='w-5 h-5' />
                                <span className="sr-only">Instagram page</span>
                            </a>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>

    )
}

export default Footer