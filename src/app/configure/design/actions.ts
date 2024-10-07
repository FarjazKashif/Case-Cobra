"use server"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { CaseColor, CaseFinish, CaseMaterial, CaseModel } from "@prisma/client"
import { db } from "@/db"

export type SaveConfigArgs = {
    color: CaseColor,
    model: CaseModel,
    material: CaseMaterial,
    finish: CaseFinish,
    configId: string,
}

export async function saveConfig({
    color,
    model,
    material,
    finish,
    configId,
}: SaveConfigArgs) {
    await db.configuration.update({
        where: {
            id: configId
        },
        data: { color, model, material, finish },
    })
}
