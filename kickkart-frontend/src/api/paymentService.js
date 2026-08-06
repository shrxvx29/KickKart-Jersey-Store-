import api from "./axios";

export const createRazorpayOrder = async (amount) => {

    const response = await api.post("/payment/create-order", {
        amount,
        currency: "INR",
    });

    return response.data;
};

export const verifyPayment = async (paymentData) => {

    const response = await api.post("/payment/verify", paymentData);

    return response.data;
};

console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);