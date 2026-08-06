import api from "./axios";

export const placeOrder = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
};