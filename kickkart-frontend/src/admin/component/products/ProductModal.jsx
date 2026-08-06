import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";

import {
    addProduct,
    updateProduct,
    deleteProduct,
} from "../../api/AdminProductService";

const ProductModal = ({
    open,
    onClose,
    refreshProducts,
    editingProduct = null,
}) => {

    const [loading, setLoading] = useState(false);

    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        name: "",
        category: "CLUB",
        price: "",
        stock: "",
        description: "",
        image: null,
    });

    useEffect(() => {

        if (editingProduct) {

            setForm({
                name: editingProduct.name,
                category: editingProduct.category,
                price: editingProduct.price,
                stock: editingProduct.stock,
                description: editingProduct.description,
                image: null,
            });

            setPreview(
                `http://localhost:8080${editingProduct.imageUrl}`
            );

        } else {

            setForm({
                name: "",
                category: "CLUB",
                price: "",
                stock: "",
                description: "",
                image: null,
            });

            setPreview(null);

        }

    }, [editingProduct, open]);

    if (!open) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setForm((prev) => ({
            ...prev,
            image: file,
        }));

        setPreview(URL.createObjectURL(file));

    };
        const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("category", form.category);
            formData.append("price", form.price);
            formData.append("stock", form.stock);
            formData.append("description", form.description);

            if (form.image) {
                formData.append("image", form.image);
            }

            if (editingProduct) {

                await updateProduct(editingProduct.id, formData);

                toast.success("Product updated successfully");

            } else {

                await addProduct(formData);

                toast.success("Product added successfully");

            }

            refreshProducts();

            onClose();

        } catch (error) {

            console.error(error);

            toast.error("Something went wrong");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-black">

            <div className="bg-white rounded-2xl w-full max-w-5xl p-8">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-2xl font-bold">
                        {editingProduct ? "Edit Product" : "Add Product"}
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-8"
                >
                                    {/* Left */}

                    <div className="space-y-5">

                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="CLUB">Club</option>
                            <option value="NATIONAL">National</option>
                        </select>

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
                            required
                        />

                        <textarea
                            rows="5"
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black resize-none"
                            required
                        />

                    </div>

                    {/* Right */}

                    <div>

                        <label className="border-2 border-dashed rounded-2xl h-80 flex flex-col justify-center items-center cursor-pointer overflow-hidden">

                            {preview ? (

                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />

                            ) : (

                                <div className="text-center">

                                    <Upload
                                        size={50}
                                        className="mx-auto mb-4 text-gray-500"
                                    />

                                    <p className="text-gray-600">
                                        Click to Upload Product Image
                                    </p>

                                </div>

                            )}

                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImage}
                            />

                        </label>

                    </div>

                    {/* Buttons */}

                    <div className="md:col-span-2 flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border rounded-xl hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loading
                                ? "Saving..."
                                : editingProduct
                                ? "Update Product"
                                : "Save Product"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
      );

};

export default ProductModal;