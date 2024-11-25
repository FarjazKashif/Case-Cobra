"use server"

import { BASE_PRICE, PRODUCT_PRICES } from "@/app/config/products"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Order } from "@prisma/client"

export const createCheckOutSession = async ({ configId }: { configId: string }) => {
    const configuration = await db.configuration.findUnique({
        where: {
            id: configId
        }
    })

    if (!configuration) {
        throw new Error("No such configuration found")
    }

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        throw new Error('You need to be logged in')
    }

    // Here we have to Calculate the price in Server Side
    const { material, finish } = configuration

    let price = BASE_PRICE
    if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate
    if (finish === "textured") price += PRODUCT_PRICES.finish.textured

    // Now check whether the order of same Config & User Id hai ya nhi
    let order: Order | undefined = undefined

    // Now check the existing order

    let existingOrder = await db.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configuration.id
        }
    })



    if (existingOrder) {
        order = existingOrder
    } else {
        order = await db.order.create({
            data: {
                amount: price / 100,
                userId: user.id,
                configurationId: configuration.id
            },
        })
    }

} 