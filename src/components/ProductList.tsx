import { Product } from '@/app/products/page';
import Link from 'next/link';

export default function ProductList({ products }: {products: Product[]}) {
    return (
        <div>
            {products.map((product) => (
                <div key={product.slug}>
                    <Link href={`/products/${product.slug}`}>
                        <a>{product.title}</a>
                    </Link>
                </div>
            ))}
        </div>
    );
}
