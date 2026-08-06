import api from "./axios";

export const addToCart = async (productId, quantity,size) => {
    const response = await api.post("/cart", {
        productId,
        quantity,
        size,
    });

    return response.data;
};

export const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
};

export const updateCartItem = async (cartId, quantity) => {

    const response = await api.put(
        `/cart/${cartId}`,
        null,
        {
            params: {
                quantity,
            },
        }
    );

    return response.data;
};

export const removeCartItem = async (cartItemId) => {
    await api.delete(`/cart/${cartItemId}`);
};

export const clearCart = async () => {
    await api.delete("/cart/clear");
};