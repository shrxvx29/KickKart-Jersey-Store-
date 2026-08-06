import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

import ShopHeader from "../components/shop/ShopHeader";
import ProductGrid from "../components/shop/ProductGrid";
import ProductSkeleton from "../components/shop/ProductSkeleton";
import { getProducts } from "../api/productService";

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    const [filters, setFilters] = useState({
        category: "",
    });

    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();

    useEffect(() => {

        const category = searchParams.get("category");

        if (category) {
            setFilters((prev) => ({
                ...prev,
                category,
            }));
        }

    }, [searchParams]);

    useEffect(() => {
        setPage(0);
    }, [search, sort, filters.category]);

    useEffect(() => {

        let sortField = "id";
        let direction = "desc";

        switch (sort) {

            case "priceLow":
                sortField = "price";
                direction = "asc";
                break;

            case "priceHigh":
                sortField = "price";
                direction = "desc";
                break;

            case "name":
                sortField = "name";
                direction = "asc";
                break;

            case "latest":
            default:
                sortField = "id";
                direction = "desc";

        }

        fetchProducts(
            page,
            search,
            filters.category,
            sortField,
            direction
        );

    }, [page, search, sort, filters.category]);

    const fetchProducts = async (
        page,
        search,
        category,
        sort,
        direction
    ) => {

        try {

            setLoading(true);

            const data = await getProducts({
                page,
                size: 12,
                search,
                category,
                sort,
                direction,
            });

            setProducts(data.content);
            setTotalPages(data.totalPages);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-7xl mx-auto px-4 py-8">

            <ShopHeader
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                filters={filters}
                setFilters={setFilters}
            />

            {loading ? (

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">

                    {[...Array(8)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}

                </div>

            ) : (

                <ProductGrid products={products} />

            )}

            <div className="flex justify-center items-center gap-3 mt-10">

                <button
                    disabled={page === 0}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="bg-black text-white rounded-full p-2 disabled:opacity-50"
                >
                    <CircleArrowLeft />
                </button>

                <span className="font-semibold">
                    {totalPages === 0 ? 0 : page + 1} / {totalPages}
                </span>

                <button
                    disabled={page + 1 >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-black text-white rounded-full p-2 disabled:opacity-50"
                >
                    <CircleArrowRight />
                </button>

            </div>

        </div>

    );

};

export default Shop;