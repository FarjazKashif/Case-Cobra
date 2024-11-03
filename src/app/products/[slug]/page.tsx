// ProductServerComponent.tsx
import { client } from '@/sanity/lib/client';
// import ProductPage from '@/app/products/[slug]/page';
import ProductPage, { ProductContent } from '../ProductPage';

interface ProductServerComponentProps {
    params: { slug: string };
}

const getProductData = async (slug: string): Promise<ProductContent | null> => {
    const products = await client.fetch(
        `*[_type=="product" && slug.current == '${slug}'] {
            "currentSlug": slug.current,
            title,
            pd_image,
            image,
            price,
            content,
            pd_type -> {
                pd_type
            },
            fit,
            category -> {
                category
            }
      }[0]`
    );
    return products;
};

const ProductServerComponent = async ({ params }: ProductServerComponentProps) => {
    const data = await getProductData(params.slug);

    if (!data) {
        return <h1>Product Not Found</h1>;
    }

    return <ProductPage data={data} key={data.title} />;
};

export default ProductServerComponent;
