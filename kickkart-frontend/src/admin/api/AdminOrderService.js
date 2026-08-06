import api from "../../api/axios";

export const getAllOrders = async (page = 0, size = 10) => {

    const response = await api.get("/admin/orders", {
        params: {
            page,
            size,
        },
    });

    return response.data;

};

export const getOrderById = async (id) => {

    const response = await api.get(`/admin/orders/${id}`);

    return response.data;

};

export const updateOrderStatus = async (id, status) => {

    const response = await api.put(
        `/admin/orders/${id}/status`,
        null,
        {
            params: {
                status,
            },
        }
    );

    return response.data;

};