import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size, color) => {
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          size,
          color,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (productId, size, color) => {
    setCart(
      cart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity < 1) return;

    setCart(
      cart.map((item) =>
        item.id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}