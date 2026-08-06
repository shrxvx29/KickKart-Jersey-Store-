import { Pencil, Trash2 } from "lucide-react";

const ProductTable = ({
    products,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden text-black">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-6 py-4 text-left">Image</th>

                        <th className="px-6 py-4 text-left">Name</th>

                        <th className="px-6 py-4 text-left">Category</th>

                        <th className="px-6 py-4 text-left">Price</th>

                        <th className="px-6 py-4 text-left">Stock</th>

                        <th className="px-6 py-4 text-center">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {products.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="py-10 text-center text-gray-500"
                            >
                                No Products Found
                            </td>

                        </tr>

                    ) : (

                        products.map((product) => (

                            <tr
                                key={product.id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="px-6 py-4">

                                    <img
                                        src={`http://localhost:8080${product.imageUrl}`}
                                        alt={product.name}
                                        className="w-16 h-16 rounded-lg object-cover border"
                                    />

                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {product.name}
                                </td>

                                <td className="px-6 py-4">
                                    {product.category}
                                </td>

                                <td className="px-6 py-4">
                                    ₹{product.price}
                                </td>

                                <td className="px-6 py-4">
                                    {product.stock}
                                </td>

                                <td className="px-6 py-4">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};

export default ProductTable;