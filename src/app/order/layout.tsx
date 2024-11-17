import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import OrderSteps from '@/components/OrderSteps'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <MaxWidthWrapper className='flex-1 flex flex-col'>
            <OrderSteps />
            {children}
        </MaxWidthWrapper>
    )
}

export default Layout