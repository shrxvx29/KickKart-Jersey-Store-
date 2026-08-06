const ProductSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      <div className="h-72 bg-gray-200"></div>

      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>

        <div className="h-4 w-full bg-gray-200 rounded"></div>

        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

        <div className="flex justify-between items-center mt-4">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>

          <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;