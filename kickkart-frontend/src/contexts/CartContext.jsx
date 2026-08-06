import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // ===============================
  // Load Cart
  // ===============================
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/cart");

      if (Array.isArray(response.data)) {
        setCart(response.data);
      } else {
        setCart([]);
      }
    } catch (err) {
      console.error("Load Cart Error :", err);

      setCart([]);
      setError(
        err.response?.data?.message ||
          "Unable to load cart."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // ===============================
  // Add To Cart
  // ===============================
  const addToCart = async (
    product,
    quantity = 1,
    size = "M"
  ) => {
    try {
      await api.post("/cart", {
        productId: product.id ?? product.productId,
        quantity,
        size,
      });

      toast.success("Added to cart");

      await loadCart();
    } catch (err) {
      console.error("Add Cart Error :", err);

      toast.error(
        err.response?.data?.message ||
          "Failed to add product."
      );
    }
  };
    // ===============================
  // Update Quantity
  // ===============================
  const updateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/${cartId}?quantity=${quantity}`);

      setCart((prev) =>
        prev.map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity,
                subtotal: item.price * quantity,
              }
            : item
        )
      );

      toast.success("Quantity updated");
    } catch (err) {
      console.error("Update Quantity Error :", err);

      toast.error(
        err.response?.data?.message ||
          "Failed to update quantity."
      );
    }
  };

  // ===============================
  // Remove Item
  // ===============================
  const removeItem = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`);

      setCart((prev) =>
        prev.filter((item) => item.cartId !== cartId)
      );

      toast.success("Item removed");
    } catch (err) {
      console.error("Remove Item Error :", err);

      toast.error(
        err.response?.data?.message ||
          "Failed to remove item."
      );
    }
  };

  // ===============================
  // Clear Cart
  // ===============================
  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");

      setCart([]);
      setAppliedCoupon(null);

      toast.success("Cart cleared");
    } catch (err) {
      console.error("Clear Cart Error :", err);

      toast.error(
        err.response?.data?.message ||
          "Failed to clear cart."
      );
    }
  };

  // ===============================
  // Coupon
  // ===============================
  const applyCoupon = (code) => {
    const coupon = code.trim().toUpperCase();

    if (!coupon) {
      toast.error("Enter coupon code");
      return false;
    }

    if (coupon === "KICK20") {
      setAppliedCoupon({
        code: "KICK20",
        discountPercent: 20,
      });

      toast.success("Coupon Applied");
      return true;
    }

    if (coupon === "GOLD10") {
      setAppliedCoupon({
        code: "GOLD10",
        discountPercent: 10,
      });

      toast.success("Coupon Applied");
      return true;
    }

    toast.error("Invalid Coupon");
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success("Coupon Removed");
  };
    // ===============================
  // Calculations
  // ===============================
  const calculateSubtotal = useCallback(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const calculateDiscount = useCallback(() => {
    if (!appliedCoupon) return 0;

    return (
      calculateSubtotal() *
      (appliedCoupon.discountPercent / 100)
    );
  }, [calculateSubtotal, appliedCoupon]);

  const calculateShipping = useCallback(() => {
    const subtotal = calculateSubtotal();

    if (subtotal === 0) return 0;

    return subtotal >= 3000 ? 0 : 150;
  }, [calculateSubtotal]);

  const calculateTax = useCallback(() => {
    const subtotal = calculateSubtotal() - calculateDiscount();

    return subtotal * 0.05;
  }, [calculateSubtotal, calculateDiscount]);

  const calculateGrandTotal = useCallback(() => {
    return (
      calculateSubtotal() -
      calculateDiscount() +
      calculateShipping() +
      calculateTax()
    );
  }, [
    calculateSubtotal,
    calculateDiscount,
    calculateShipping,
    calculateTax,
  ]);

  // ===============================
  // Cart Count
  // ===============================
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ===============================
  // Context Value
  // ===============================
  const value = {
    cart,
    loading,
    error,
    appliedCoupon,
    cartCount,

    loadCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,

    applyCoupon,
    removeCoupon,

    calculateSubtotal,
    calculateDiscount,
    calculateShipping,
    calculateTax,
    calculateGrandTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// ===============================
// Custom Hook
// ===============================
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider."
    );
  }

  return context;
};

export default CartContext;