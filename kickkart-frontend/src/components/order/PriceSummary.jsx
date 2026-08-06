import { Receipt, Truck, BadgePercent } from "lucide-react";
import { downloadInvoice } from "../../api/invoiceService";
import {
  ArrowLeft,
  Download,
  XCircle,
} from "lucide-react";

const PriceSummary = ({ order, onCancel, cancelLoading }) => {

    const canCancel =
        order.orderStatus === "PENDING" ||
        order.orderStatus === "PACKED";

    return (

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <h2 className="text-2xl font-bold flex items-center gap-3 mb-8">

                <Receipt className="text-blue-600" />

                Price Details

            </h2>

            <div className="space-y-5">

                {/* Subtotal */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <Receipt size={18} className="text-gray-500" />

                        <span className="text-gray-600">
                            Subtotal
                        </span>

                    </div>

                    <span className="font-semibold text-lg">
                        ₹{order.totalAmount}
                    </span>

                </div>

                {/* Shipping */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <Truck size={18} className="text-green-600" />

                        <span className="text-gray-600">
                            Shipping
                        </span>

                    </div>

                    <span className="font-semibold text-green-600">
                        FREE
                    </span>

                </div>

                {/* Discount */}

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <BadgePercent
                            size={18}
                            className="text-purple-600"
                        />

                        <span className="text-gray-600">
                            Discount
                        </span>

                    </div>

                    <span className="font-semibold">
                        ₹0
                    </span>

                </div>

                <hr className="my-4 border-gray-200" />

                {/* Total */}

                <div className="flex justify-between items-center">

                    <span className="text-xl font-bold">
                        Total Amount
                    </span>

                    <span className="text-3xl font-bold text-green-600">
                        ₹{order.totalAmount}
                    </span>

                </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-6">

  {/* Invoice Card */}
  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h3 className="font-semibold text-gray-900">
        Download Invoice
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Save or print your order invoice as a PDF.
      </p>
    </div>

    <button
      onClick={() => downloadInvoice(order.id)}
      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700 transition"
    >
      <Download size={18} />
      Download PDF
    </button>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-wrap items-center justify-between gap-4">

    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
    >
      <ArrowLeft size={18} />
      Back
    </button>

    {canCancel && (
      <button
        onClick={onCancel}
        disabled={cancelLoading}
        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition"
      >
        <XCircle size={18} />

        {cancelLoading ? "Cancelling..." : "Cancel Order"}
      </button>
    )}

  </div>

</div>

        </div>

    );

};

export default PriceSummary;