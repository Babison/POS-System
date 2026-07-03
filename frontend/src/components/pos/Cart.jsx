export default function Cart({
  cart,
  checkout,
}) {
  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        item.selling_price,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-xl font-bold mb-6">
        Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between mb-4"
        >
          <div>
            {item.name}
          </div>

          <div>
            x{item.quantity}
          </div>

          <div>
            ₹
            {item.quantity *
              item.selling_price}
          </div>
        </div>
      ))}

      <hr className="my-6" />

      <h2 className="text-2xl font-bold">
        Total: ₹{total}
      </h2>

      <button
        onClick={checkout}
        className="mt-6 bg-blue-600 text-white px-4 py-3 rounded-lg w-full"
      >
        Complete Sale
      </button>
    </div>
  );
}