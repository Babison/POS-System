export default function ProductGrid({
  products,
  addToCart,
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() =>
            addToCart(product)
          }
          className="bg-white rounded-xl shadow p-4"
        >
          <h2 className="font-semibold">
            {product.name}
          </h2>

          <p>
            ₹{product.selling_price}
          </p>

          <p>
            Stock: {product.stock}
          </p>
        </button>
      ))}
    </div>
  );
}