import api from "./axios";

export const getProducts = async ({
    page = 0,
    size = 12,
    search = "",
    category = "",
    sort = "id",
    direction = "desc",
}) => {

    const response = await api.get("/products", {
        params: {
            page,
            size,
            search,
            category,
            sort,
            direction,
        },
    });

    return response.data;
};

export const getProductById = async (id) => {

    const response = await api.get(`/products/${id}`);

    return response.data;

};