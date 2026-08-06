import api from "../../api/axios";

export const getProducts = async (page = 0, size = 12) => {

    const response = await api.get("/admin/products", {
        params: {
            page,
            size,
        },
    });

    return response.data;
};

export const addProduct = async (formData) => {

    const response = await api.post(
        "/admin/products",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const updateProduct = async (id, formData) => {

    const response = await api.put(
        `/admin/products/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteProduct = async (id) => {

    await api.delete(`/admin/products/${id}`);

};