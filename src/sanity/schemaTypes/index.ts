import { type SchemaTypeDefinition } from 'sanity'
import { products } from "@/sanity/schemaTypes/products"
import { category } from "@/sanity/schemaTypes/category"
import { pd_type } from "@/sanity/schemaTypes/pd_type"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products, category, pd_type],
}
