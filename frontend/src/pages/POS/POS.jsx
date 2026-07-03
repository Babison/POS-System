import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProductGrid from "../../components/pos/ProductGrid";
import Cart from "../../components/pos/Cart";

import salesService from "../../services/sales.service";

export default function POS() {
  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts =
    async () => {
      const res =
        await salesService.getProducts();

      setProducts(res.data);
    };

  const addToCart = (
    product
  ) => {
    const existing =
      cart.find(
        (item) =>
          item.id === product.id
      );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        item.selling_price,
    0
  );

  const checkout =
    async () => {
      if (cart.length === 0)
        return;

      const payload = {
        invoice_number: `INV-${Date.now()}`,
        customer_id: null,
        cashier_id: 1,
        subtotal: total,
        tax: 0,
        discount: 0,
        total,
        payment_method: "CASH",
        items: cart.map(
          (item) => ({
            product_id: item.id,
            quantity:
              item.quantity,
            price:
              item.selling_price,
            total:
              item.quantity *
              item.selling_price,
          })
        ),
      };

      await salesService.createSale(
        payload
      );

      alert(
        "Sale Completed"
      );

      setCart([]);

      loadProducts();
    };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ProductGrid
            products={products}
            addToCart={addToCart}
          />
        </div>

        <div>
          <Cart
            cart={cart}
            checkout={checkout}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}