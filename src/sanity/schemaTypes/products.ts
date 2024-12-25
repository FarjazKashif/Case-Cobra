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
            type: "slug",
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: "image",
            title: "Add Product Image",
            type: "image",
            options: { hotspot: true }
        }),
        defineField({
            name: "pd_image",
            title: "Add Product Page Image",
            type: "image",
            options: { hotspot: true }
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
            name: "discount",
            title: "Discount",
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
        defineField({
            name: "pd_type",
            title: "Choose a Product type",
            type: "reference",
            to: {
                type: "pd_type"
            }
        }),
        defineField({
            name: "fit",
            title: "Fit (Regular/ Relax)",
            type: "string"
        }),
        defineField({
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [{
                type: 'block',
                title: 'Block',
                styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Heading 1', value: 'h1' },
                    { title: 'Heading 2', value: 'h2' },
                    { title: 'Heading 3', value: 'h3' },
                ],
                lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
                marks: {
                    decorators: [
                        { title: 'Bold', value: 'strong' },
                        { title: 'Italic', value: 'em' },
                        { title: 'Underline', value: 'underline' },
                    ],
                },
            }],
        }
        ),
    ]
})