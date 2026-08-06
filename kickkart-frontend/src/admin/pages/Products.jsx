import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProductTable from "../component/products/ProductTable";
import ProductModal from "../component/products/ProductModal";
import Pagination from "../component/products/Pagination";

import {
    getProducts,
    deleteProduct,
} from "../api/AdminProductService";

const Products = () => {

    const [products, setProducts] = useState([]);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const fetchProducts = async () => {

        try {

            const data = await getProducts(page);

            setProducts(data.content);

            setTotalPages(data.totalPages);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load products");

        }

    };

    const handleAdd = () => {

        setSelectedProduct(null);

        setShowModal(true);

    };

    const handleEdit = (product) => {

        setSelectedProduct(product);

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProduct(id);

            toast.success("Product deleted successfully");

            fetchProducts();

        } catch (error) {

            console.error(error);

            toast.error("Delete failed");

        }

    };

    return (

        <div className="space-y-6 text-black">

            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <button
                    onClick={handleAdd}
                    className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                    + Add Product
                </button>

            </div>

            <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={() => setPage(page - 1)}
                onNext={() => setPage(page + 1)}
            />

            <ProductModal
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedProduct(null);
                }}
                editingProduct={selectedProduct}
                refreshProducts={fetchProducts}
            />

        </div>

    );

};

export default Products;