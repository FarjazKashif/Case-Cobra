export default function ProductItem({ product }) {
    return (
      <div>
        <h1>{product.title}</h1>
        <p>{product.price}</p>
        <img src={product.image} alt={product.title} />
      </div>
    );
  }
  