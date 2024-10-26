import { type SchemaTypeDefinition } from 'sanity'
import { products } from "@/sanity/schemaTypes/products"
import { category } from "@/sanity/schemaTypes/category"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, category],
}
