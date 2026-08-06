const Pagination = ({
    page,
    totalPages,
    onPrevious,
    onNext,
}) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-8 text-black">

            <button
                onClick={onPrevious}
                disabled={page === 0}
                className="px-5 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
            >
                Previous
            </button>

            <span className="font-semibold">
                Page {page + 1} of {totalPages}
            </span>

            <button
                onClick={onNext}
                disabled={page + 1 >= totalPages}
                className="px-5 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;