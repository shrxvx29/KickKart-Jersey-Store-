const KpiCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all text-black">

            <p className="text-gray-500 text-sm font-medium">
                {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
                {value}
            </h2>

        </div>
    );
};

export default KpiCard;