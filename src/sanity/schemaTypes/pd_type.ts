import { defineType, defineField } from "sanity"

export const pd_type = defineType({
    name: "pd_type",
    title: "Product Type (Cotton/ etc)",
    type: "document",
    fields: [
        defineField({
            name: "pd_type",
            title: "Product Type (Cotton/ etc)",
            type: "string",
        }),
    ]
})