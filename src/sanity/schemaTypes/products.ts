import { defineType, defineField } from "sanity"

export const products = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Add a Product Title",
            type: "string"
        }),
        defineField({
            name: "slug",
            title: "Add a Product Slug",
            type: "string"
        }),
        defineField({
            name: "image",
            title: "Add Product Image",
            type: "image"
        }),
        defineField({
            name: "alt",
            title: "Image Alt Text",
            type: "string"
        }),
        defineField({
            name: "price",
            title: "Image Price",
            type: "string"
        }),
        defineField({
            name: "category",
            title: "Choose a Category",
            type: "reference",
            to: {
                type: "category"
            }
        }),
    ]
})